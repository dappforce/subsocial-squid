import {
  getDateWithoutTime,
  getBodySummary,
  getJoinedList,
  getTweetDetailsEntity,
  isTweetDetailsIPFSValid,
  getExperimentalFieldsFromIPFSContent,
  createPostSlug
} from '../../common/utils';
import {
  Post,
  PostKind,
  Space,
  IpfsFetchLog,
  InReplyToKind,
  Activity
} from '../../model';
import { getOrCreateAccount } from '../account';
import {
  IpfsPostContentSummarized,
  PostCreatedData,
  PostTweetDetailsIPFS
} from '../../common/types';
import { Ctx } from '../../processor';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';

const updatePostReplyCount = async (
  targetPost: Post,
  reply: Post,
  ctx: Ctx
): Promise<void> => {
  const targetPostUpdated = targetPost;
  targetPostUpdated.repliesCount += 1;
  if (reply.hidden) {
    targetPostUpdated.hiddenRepliesCount += 1;
  } else {
    targetPostUpdated.publicRepliesCount += 1;
  }
  await ctx.store.save(targetPostUpdated);
};

/**
 * @deprecated in Batch processor config
 */
export const updateSpaceForPostChildren = async (
  rootPost: Post,
  newSpace: Space | null,
  ctx: Ctx
) => {
  // if (!rootPost.isComment) return;
  //
  // const children = await ctx.store.find(Post, {
  //   where: [
  //     {
  //       rootPost: { id: rootPost.id }
  //     },
  //     {
  //       parentPost: { id: rootPost.id }
  //     }
  //   ],
  //   relations: {
  //     space: true
  //   }
  // });
  //
  // for (let i = 0; i <= children.length - 1; i++) {
  //   children[i].space = newSpace;
  // }
  // await ctx.store.save<Post>(children);
};

export const ensurePost = async ({
  postId,
  postContent,
  ctx,
  eventCallData
}: {
  postId: string;
  postContent?: IpfsPostContentSummarized;
  ctx: Ctx;
  eventCallData: PostCreatedData;
}): Promise<Post> => {
  const {
    eventData,
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);

  const postIpfsContent =
    postContent ??
    (await storageDataManagerInst.fetchIpfsContentByCid(
      'post',
      callArgs.ipfsSrc ?? null,
      async (errorMsg: string | null) => {
        await ctx.store.save(
          new IpfsFetchLog({
            id: postId,
            cid: callArgs!.ipfsSrc,
            blockHeight: eventData.metadata.blockNumber,
            errorMsg: errorMsg
          })
        );
      }
    ));

  let space = null;

  if (
    callArgs.postKind === PostKind.RegularPost ||
    (callArgs.postKind === PostKind.SharedPost && !callArgs.rootPostId)
  ) {
    space = await getEntityWithRelations.space(callArgs.spaceId, ctx);
  }
  /**
   * TODO We won't add space to child posts (comment/replies) to avoid redundant processing in root PostMoved event
   */
  // else if (eventData.postKind === PostKind.Comment) {
  //   const rootSpacePost = eventData.rootPostId
  //     ? await ctx.store.get(Post, eventData.rootPostId, false)
  //     : null;
  //
  //   if (!rootSpacePost) {
  //     new EntityProvideFailWarning(
  //       Post,
  //       eventData.rootPostId || 'n/a',
  //       ctx,
  //       eventData
  //     );
  //     throw new CommonCriticalError();
  //   }
  //   if (rootSpacePost.space && rootSpacePost.space.id)
  //     space = await ctx.store.get(Space, rootSpacePost.space.id, false);
  // }

  const signerAccountInst = await getOrCreateAccount(
    eventData.params.accountId,
    ctx
  );

  const post = new Post();

  if (callArgs.forced && callArgs.forcedData) {
    post.hidden = callArgs.forcedData.hidden;
    post.ownedByAccount = await getOrCreateAccount(
      callArgs.forcedData.owner,
      ctx
    );
    post.createdByAccount = await getOrCreateAccount(
      callArgs.forcedData.account,
      ctx
    );
    post.createdAtBlock = BigInt(callArgs.forcedData.block.toString());
    post.createdAtTime = new Date(+callArgs.forcedData.time);
    post.createdOnDay = getDateWithoutTime(new Date(+callArgs.forcedData.time));
  } else {
    post.hidden = false;
    post.ownedByAccount = signerAccountInst;
    post.createdByAccount = signerAccountInst;
    post.createdAtBlock = BigInt(eventData.metadata.blockNumber.toString());
    post.createdAtTime = eventData.metadata.timestamp;
    post.createdOnDay = getDateWithoutTime(eventData.metadata.timestamp);
  }

  post.hiddenRepliesCount = 0;
  post.publicRepliesCount = 0;
  post.repliesCount = 0;
  post.sharesCount = 0;
  post.upvotesCount = 0;
  post.downvotesCount = 0;
  post.reactionsCount = 0;
  post.followersCount = 0;

  post.id = postId;
  post.isComment = callArgs.postKind === PostKind.Comment;
  post.content = callArgs.ipfsSrc;
  post.updatedAtTime = null;
  post.space = space;
  post.kind = callArgs.postKind;

  switch (post.kind) {
    case PostKind.Comment:
      post.rootPost = await getEntityWithRelations.post({
        postId: callArgs.rootPostId,
        ctx,
        rootOrParentPost: true
      });
      post.parentPost = await getEntityWithRelations.post({
        postId: callArgs.parentPostId,
        ctx,
        rootOrParentPost: true
      });

      if (post.rootPost) await updatePostReplyCount(post.rootPost, post, ctx);
      if (post.parentPost)
        await updatePostReplyCount(post.parentPost, post, ctx);
      break;

    case PostKind.SharedPost:
      post.sharedPost = await getEntityWithRelations.post({
        postId: callArgs.originalPost,
        ctx
      });

      break;
  }

  if (postIpfsContent) {
    const bodySummary = getBodySummary(postIpfsContent.body);
    post.title = postIpfsContent.title ?? null;
    post.image = postIpfsContent.image ?? null;
    post.link = null;
    if (postIpfsContent.link) {
      post.link = postIpfsContent.link;
    } else if (!postIpfsContent.link && postIpfsContent.body) {
      post.link = getUrlFromText(postIpfsContent.body);
    }

    // post.format = postIpfsContent.format ?? null; // TODO check is it actual property
    post.format = null;
    post.canonical = postIpfsContent.canonical ?? null;
    post.body = postIpfsContent.body;
    post.summary = bodySummary.summary;
    post.isShowMore = bodySummary.isShowMore;
    post.slug =
      !postIpfsContent.title && !postIpfsContent.body
        ? postId
        : createPostSlug(postId, {
            title: postIpfsContent.title,
            body: postIpfsContent.body
          }) ?? null;
    // post.appId = postIpfsContent.appId ?? null;

    post.experimental =
      getExperimentalFieldsFromIPFSContent(postIpfsContent, 'post', ctx) ??
      null;

    if (postIpfsContent.tags) {
      post.tagsOriginal = getJoinedList(postIpfsContent.tags);
    }
    if (postIpfsContent.tweet) {
      post.tweetDetails = getTweetDetailsEntity(postIpfsContent.tweet);
      post.tweetId = isTweetDetailsIPFSValid(postIpfsContent.tweet)
        ? postIpfsContent.tweet.id
        : null;
    }
    if (postIpfsContent.inReplyTo) {
      post.inReplyToKind = postIpfsContent.inReplyTo.kind;

      switch (postIpfsContent.inReplyTo.kind) {
        case InReplyToKind.Post:
          post.inReplyToPost = await getEntityWithRelations.post({
            postId: postIpfsContent.inReplyTo.id,
            ctx,
            rootOrParentPost: true
          });
          break;
        default:
      }
    }
  } else {
    post.slug = postId;
  }

  return post;
};

export function getUrlFromText(str: string) {
  const urlRegex =
    /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/;
  return urlRegex.exec(str)?.[0];
}
