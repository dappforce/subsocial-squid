import { Activity, EventName, Post, Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning,
  MissingSubsocialApiEntity
} from '../../common/errors';
import { Ctx } from '../../processor';
import { SpaceUpdatedData } from '../../common/types';
import { StorageDataManager } from '../../storage';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { ElasticSearchManager } from '../../elasticsearch';
import {
  getBodySummary,
  getExperimentalFieldsFromIPFSContent,
  getJoinedList
} from '../../common/utils';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function spaceUpdated(
  ctx: Ctx,
  eventCallData: SpaceUpdatedData
): Promise<void> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const space = await getEntityWithRelations.space(eventParams.spaceId, ctx);

  if (!space) {
    new EntityProvideFailWarning(
      Space,
      eventParams.spaceId,
      ctx,
      eventMetadata
    );
    throw new CommonCriticalError();
  }

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);

  const spaceIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'space',
    callArgs.ipfsSrc || null
  );

  space.updatedAtTime = eventMetadata.timestamp;

  space.updatedAtBlock = BigInt(eventMetadata.blockNumber);

  if (callArgs.ipfsSrc) space.content = callArgs.ipfsSrc;

  if (spaceIpfsContent) {
    const aboutSummary = getBodySummary(spaceIpfsContent.about);
    space.name = spaceIpfsContent.name ?? null;
    space.email = spaceIpfsContent.email ?? null;
    space.about = spaceIpfsContent.about ?? null;
    space.summary = aboutSummary.summary;
    space.isShowMore = aboutSummary.isShowMore;
    space.image = spaceIpfsContent.image ?? null;
    space.profileSource = spaceIpfsContent.profileSource ?? null;
    // space.appId = spaceIpfsContent.appId ?? null;

    space.experimental =
      getExperimentalFieldsFromIPFSContent(spaceIpfsContent, 'space', ctx) ??
      null;

    if (spaceIpfsContent.tags) {
      space.tagsOriginal = getJoinedList(spaceIpfsContent.tags);
    }
    if (spaceIpfsContent.links) {
      space.linksOriginal = getJoinedList(spaceIpfsContent.links);
    }
    if (spaceIpfsContent.interests) {
      space.interestsOriginal = getJoinedList(spaceIpfsContent.interests);
    }
  }

  await ctx.store.save(space);

  ElasticSearchManager.index(ctx).addToQueue(space);

  const activity = await setActivity({
    account: eventParams.accountId,
    space,
    ctx,
    eventMetadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceUpdated,
    {
      account: space.ownedByAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceUpdated,
    { account: space.ownedByAccount, space, activity, ctx }
  );
}
