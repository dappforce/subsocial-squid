import { getSyntheticEventName } from '../../common/utils';
import { Post, Space, Activity, EventName } from '../../model';
import { getOrCreateAccount } from '../account';
import { updatePostsCountersInSpace } from '../space';
import { setActivity } from '../activity';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostMovedData, SpaceCountersAction } from '../../common/types';
// import { postFollowed, postUnfollowed } from '../postCommentFollows';
import { Ctx } from '../../processor';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { ElasticSearchManager } from '../../elasticsearch';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { NotificationsManager } from '../notification/notifiactionsManager';

export async function postMoved(
  ctx: Ctx,
  { eventData, callData }: PostMovedData
): Promise<void> {
  const account = await getOrCreateAccount(eventData.params.accountId, ctx);

  const post = await getEntityWithRelations.post({
    postId: eventData.params.postId,
    ctx
  });

  if (!post) {
    new EntityProvideFailWarning(
      Post,
      eventData.params.postId,
      ctx,
      eventData.metadata
    );
    throw new CommonCriticalError();
  }

  const prevSpaceInst = await getEntityWithRelations.space(
    eventData.params.fromSpace,
    ctx
  );

  /**
   * Update counters for previous space. Will be skipped if post is restored
   * ("space" was null)
   */
  if (eventData.params.fromSpace)
    await updatePostsCountersInSpace({
      space: prevSpaceInst,
      post,
      action: SpaceCountersAction.PostDeleted,
      ctx
    });

  let newSpaceInst = null;

  if (eventData.params.toSpace && eventData.params.toSpace !== '0') {
    newSpaceInst = await getEntityWithRelations.space(
      eventData.params.toSpace,
      ctx
    );

    if (!newSpaceInst) {
      new EntityProvideFailWarning(
        Space,
        eventData.params.toSpace || 'null',
        ctx,
        eventData.metadata
      );
      throw new CommonCriticalError();
    }
  }

  post.space = newSpaceInst;

  /**
   * Update counters for new space. Ignore if move to null space.
   */
  if (newSpaceInst)
    await updatePostsCountersInSpace({
      space: newSpaceInst,
      post,
      action: SpaceCountersAction.PostAdded,
      ctx
    });

  await ctx.store.save(post);

  ElasticSearchManager.index(ctx).addToQueue(post);

  // if (!newSpaceInst) {
  //   await postUnfollowed(post, ctx);
  // } else if (newSpaceInst && !eventData.fromSpace) {
  //   await postFollowed(post, ctx);
  // }

  // await updateSpaceForPostChildren(post, newSpaceInst, ctx);

  const syntheticEventName = getSyntheticEventName(EventName.PostMoved, post);

  const activity = await setActivity({
    syntheticEventName,
    spacePrev: prevSpaceInst ?? undefined,
    account,
    post,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      space: newSpaceInst,
      spacePrev: prevSpaceInst,
      post,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      space: newSpaceInst ?? null,
      spacePrev: prevSpaceInst ?? null,
      post,
      activity,
      ctx
    }
  );
}
