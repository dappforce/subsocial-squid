import { getSyntheticEventName } from '../../common/utils';
import {
  Account,
  Activity,
  EventName,
  InReplyToKind,
  IpfsFetchLog,
  Post,
  PostKind
} from '../../model';
import { getOrCreateAccount } from '../account';
import { updatePostsCountersInSpace } from '../space';
import { setActivity } from '../activity';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostCreatedData, SpaceCountersAction } from '../../common/types';
import { ensurePost } from './common';
import { Ctx } from '../../processor';
import { ElasticSearchManager } from '../../elasticsearch';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { processContentExtensions } from '../extension';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { PostContentWithInReplyTo } from '../../common/types/post';

export async function postCreated(
  ctx: Ctx,
  eventCallData: PostCreatedData
): Promise<void> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const account = await getOrCreateAccount(eventParams.accountId, ctx);

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const postIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'post',
    callArgs.ipfsSrc ?? null,
    async (errorMsg: string | null) => {
      await ctx.store.save(
        new IpfsFetchLog({
          id: eventParams.postId,
          cid: callArgs.ipfsSrc,
          blockHeight: eventMetadata.blockNumber,
          errorMsg: errorMsg
        })
      );
    }
  );

  if (
    postIpfsContent &&
    postIpfsContent.inReplyTo &&
    postIpfsContent.inReplyTo.kind === InReplyToKind.Post &&
    postIpfsContent.inReplyTo.id
  )
    await mutateEventDataForSoftReply(
      postIpfsContent.inReplyTo,
      eventCallData,
      ctx
    );

  const post = await ensurePost({
    postId: eventParams.postId,
    postContent: postIpfsContent ?? undefined,
    ctx,
    eventCallData
  });

  await ctx.store.save(post);

  if (postIpfsContent && postIpfsContent.extensions)
    await processContentExtensions(
      postIpfsContent.extensions,
      post,
      eventCallData,
      ctx
    );

  // if (postIpfsContent && postIpfsContent.inReplyTo)
  //   await handlePostSoftReply(post, eventData, ctx);

  const syntheticEventName = getSyntheticEventName(EventName.PostCreated, post);

  ElasticSearchManager.index(ctx).addToQueue(post);

  post.ownedByAccount.ownedPostsCount += 1;

  await ctx.store.save(post.ownedByAccount);

  if (post.sharedPost) await handlePostShare(post, account, ctx, eventCallData);

  await updatePostsCountersInSpace({
    space: post.space ?? null,
    post,
    action: SpaceCountersAction.PostAdded,
    ctx
  });

  /**
   * Currently each post/comment/comment reply has initial follower as its creator.
   */
  // await postFollowed(post, ctx);

  const activity = await setActivity({
    syntheticEventName,
    account,
    post,
    ctx,
    eventMetadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventMetadata);
    return;
  }

  if (post.sharedPost) return;

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account, activity, ctx }
  );

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      post,
      activity,
      ctx
    }
  );
}

async function handlePostShare(
  newPost: Post,
  callerAccount: Account,
  ctx: Ctx,
  eventCallData: PostCreatedData
): Promise<void> {
  if (!newPost.sharedPost) return;

  const sharedPost = newPost.sharedPost;
  const syntheticEventName = getSyntheticEventName(
    EventName.PostShared,
    sharedPost
  );

  sharedPost.sharesCount += 1;

  await ctx.store.save(sharedPost);

  const activity = await setActivity({
    account: callerAccount,
    post: newPost,
    syntheticEventName,
    ctx,
    eventMetadata: eventCallData.eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(
      Activity,
      'new',
      ctx,
      eventCallData.eventData.metadata
    );
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: sharedPost.ownedByAccount,
      post: newPost,
      sharedPost,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post: newPost, account: newPost.ownedByAccount, activity, ctx }
  );
}

async function mutateEventDataForSoftReply(
  inReplyToPost: PostContentWithInReplyTo['inReplyTo'],
  eventData: PostCreatedData,
  ctx: Ctx
) {
  if (!inReplyToPost) return;
  const repliedPostEntity = await getEntityWithRelations.post({
    postId: inReplyToPost.id,
    ctx,
    rootOrParentPost: true
  });
  if (!repliedPostEntity) return;

  if (eventData.callData.args!.postKind === PostKind.RegularPost) {
    // Regular Post -> Comment
    eventData.callData.args!.postKind = PostKind.Comment;
    eventData.callData.args!.rootPostId = inReplyToPost.id;
    return;
  } else if (
    eventData.callData.args!.postKind === PostKind.Comment &&
    !eventData.callData.args!.parentPostId
  ) {
    // Comment -> Comment Reply
    eventData.callData.args!.parentPostId = inReplyToPost.id;
    return;
  }
}
