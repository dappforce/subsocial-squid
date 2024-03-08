import {
  ensurePositiveOrZeroValue,
  getBodySummary,
  getDateWithoutTime,
  getExperimentalFieldsFromIPFSContent,
  getJoinedList
} from '../../common/utils';
import { SpaceCountersAction, SpaceCreatedData } from '../../common/types';
import { SpacePermissionsScope } from '@subsocial/data-hub-sdk';
import { Post, Space, SpacePermissions } from '../../model';
import { getOrCreateAccount } from '../account';
import { Ctx } from '../../processor';
import { StorageDataManager } from '../../storage';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';

/**
 * Provides Space data. Merges data from Squid DB and Subsocial API. If Space entity is not existing in Squid DB, new
 * Space instance will be created.
 * @param space
 * @param ctx
 */

export const ensureSpace = async ({
  spaceId,
  ctx,
  eventCallData
}: {
  spaceId: string;
  ctx: Ctx;
  eventCallData: SpaceCreatedData;
}): Promise<Space> => {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);

  const spaceIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'space',
    callArgs.ipfsSrc ?? null
  );

  const spaceInst = new Space();

  const signerAccountInst = await getOrCreateAccount(
    eventParams.accountId,
    ctx
  );

  if (callArgs.forced && callArgs.forcedData) {
    spaceInst.hidden = callArgs.forcedData.hidden;
    spaceInst.ownedByAccount = await getOrCreateAccount(
      callArgs.forcedData.owner,
      ctx
    );
    spaceInst.createdByAccount = await getOrCreateAccount(
      callArgs.forcedData.account,
      ctx
    );
    spaceInst.createdAtBlock = BigInt(callArgs.forcedData.block.toString());
    spaceInst.createdAtTime = new Date(+callArgs.forcedData.time);
    spaceInst.createdOnDay = getDateWithoutTime(
      new Date(+callArgs.forcedData.time)
    );
  } else {
    spaceInst.hidden = false;
    spaceInst.ownedByAccount = signerAccountInst;
    spaceInst.createdByAccount = signerAccountInst;
    spaceInst.createdAtBlock = BigInt(eventMetadata.blockNumber.toString());
    spaceInst.createdAtTime = eventMetadata.timestamp;
    spaceInst.createdOnDay = getDateWithoutTime(eventMetadata.timestamp);
  }

  spaceInst.id = spaceId;
  spaceInst.content = callArgs.ipfsSrc;
  spaceInst.handle = null;

  spaceInst.postsCount = 0; // Initial value for counter
  spaceInst.hiddenPostsCount = 0; // Initial value for counter
  spaceInst.publicPostsCount = 0; // Initial value for counter
  spaceInst.followersCount = 0; // Initial value for counter

  spaceInst.canFollowerCreatePosts = callArgs.permissions.follower.CreatePosts;
  spaceInst.canEveryoneCreatePosts = callArgs.permissions.everyone.CreatePosts;

  spaceInst.nonePermissions = getSpacePermissions(callArgs.permissions);
  spaceInst.everyonePermissions = getSpacePermissions(callArgs.permissions);
  spaceInst.followerPermissions = getSpacePermissions(callArgs.permissions);
  spaceInst.spaceOwnerPermissions = getSpacePermissions(callArgs.permissions);

  if (spaceIpfsContent) {
    const aboutSummary = getBodySummary(spaceIpfsContent.about);
    spaceInst.name = spaceIpfsContent.name ?? null;
    spaceInst.email = spaceIpfsContent.email ?? null;
    spaceInst.about = spaceIpfsContent.about ?? null;
    spaceInst.summary = aboutSummary.summary;
    spaceInst.isShowMore = aboutSummary.isShowMore;
    spaceInst.image = spaceIpfsContent.image ?? null;
    spaceInst.tagsOriginal = null;
    spaceInst.linksOriginal = null;
    spaceInst.profileSource = spaceIpfsContent.profileSource ?? null;
    // spaceInst.appId = spaceIpfsContent.appId ?? null;

    spaceInst.experimental =
      getExperimentalFieldsFromIPFSContent(spaceIpfsContent, 'space', ctx) ??
      null;

    if (spaceIpfsContent.tags) {
      spaceInst.tagsOriginal = getJoinedList(spaceIpfsContent.tags);
    }
    if (spaceIpfsContent.links) {
      spaceInst.linksOriginal = getJoinedList(spaceIpfsContent.links);
    }
    if (spaceIpfsContent.interests) {
      spaceInst.interestsOriginal = getJoinedList(spaceIpfsContent.interests);
    }
  }

  return spaceInst;
};

function getSpacePermissions(
  spacePermissions: SpacePermissionsScope
): SpacePermissions | null {
  const newPermissionsScope = new SpacePermissions();

  for (const permKey in spacePermissions) {
    const permKeyDecorated = (permKey.charAt(0).toLowerCase() +
      permKey.slice(1)) as keyof SpacePermissions;

    if (permKeyDecorated in newPermissionsScope)
      //@ts-ignore
      newPermissionsScope[permKeyDecorated] =
        spacePermissions[permKey as keyof SpacePermissionsScope];
  }

  return newPermissionsScope;
}

export async function updatePostsCountersInSpace({
  space,
  post,
  isPrevVisStateHidden = false,
  action,
  ctx
}: {
  space: Space | null;
  post: Post;
  isPrevVisStateHidden?: boolean;
  action: SpaceCountersAction;
  ctx: Ctx;
}): Promise<void> {
  if (!space) return;

  const spaceChanged: Space = space;
  if (!space) return;
  if (post.isComment) return;

  let { publicPostsCount = 0, postsCount = 0, hiddenPostsCount = 0 } = space;

  switch (action) {
    case SpaceCountersAction.PostAdded:
      postsCount += 1;
      if (post.hidden) {
        hiddenPostsCount += 1;
      } else {
        publicPostsCount += 1;
      }
      spaceChanged.postsCount = postsCount;
      spaceChanged.hiddenPostsCount = hiddenPostsCount;
      spaceChanged.publicPostsCount = publicPostsCount;
      break;
    case SpaceCountersAction.PostUpdated:
      if (post.hidden && post.hidden !== isPrevVisStateHidden) {
        hiddenPostsCount += 1;
        publicPostsCount = ensurePositiveOrZeroValue(publicPostsCount - 1);
      } else if (!post.hidden && post.hidden !== isPrevVisStateHidden) {
        publicPostsCount += 1;
        hiddenPostsCount = ensurePositiveOrZeroValue(hiddenPostsCount - 1);
      }
      spaceChanged.hiddenPostsCount = hiddenPostsCount;
      spaceChanged.publicPostsCount = publicPostsCount;
      break;
    case SpaceCountersAction.PostDeleted:
      postsCount = ensurePositiveOrZeroValue(postsCount - 1);
      if (post.hidden) {
        hiddenPostsCount = ensurePositiveOrZeroValue(hiddenPostsCount - 1);
      } else {
        publicPostsCount = ensurePositiveOrZeroValue(publicPostsCount - 1);
      }
      spaceChanged.postsCount = postsCount;
      spaceChanged.hiddenPostsCount = hiddenPostsCount;
      spaceChanged.publicPostsCount = publicPostsCount;
      break;
  }

  await ctx.store.save(spaceChanged);
}
