import { ReactionKind, Post, Reaction, Activity, EventName } from '../../model';
import { setActivity } from '../activity';
import { getOrCreateAccount } from '../account';
import { getSyntheticEventName } from '../../common/utils';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { ensureReaction } from './common';
import { Ctx } from '../../processor';
import { PostReactionCreatedData } from '../../common/types';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postReactionCreated(
  ctx: Ctx,
  eventCallData: PostReactionCreatedData
): Promise<void> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const reaction = await ensureReaction({
    ctx,
    eventCallData
  });

  if (!reaction) {
    new EntityProvideFailWarning(
      Reaction,
      eventParams.reactionId,
      ctx,
      eventMetadata
    );
    throw new CommonCriticalError();
  }

  await ctx.store.save(reaction);

  const postInst = reaction.post;

  if (!postInst) {
    new EntityProvideFailWarning(Post, eventParams.postId, ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  if (reaction.kind === ReactionKind.Upvote) {
    postInst.upvotesCount = !postInst.upvotesCount
      ? 1
      : postInst.upvotesCount + 1;
  } else if (reaction.kind === ReactionKind.Downvote) {
    postInst.downvotesCount = !postInst.downvotesCount
      ? 1
      : postInst.downvotesCount + 1;
  }
  postInst.reactionsCount = !postInst.reactionsCount
    ? 1
    : postInst.reactionsCount + 1;

  await ctx.store.save(postInst);

  const accountInst = await getOrCreateAccount(
    callArgs.forced && callArgs.forcedData
      ? callArgs.forcedData.account
      : eventParams.accountId,
    ctx
  );

  const syntheticEventName = getSyntheticEventName(
    EventName.PostReactionCreated,
    postInst
  );
  const activity = await setActivity({
    syntheticEventName,
    account: accountInst,
    post: postInst,
    reaction,
    ctx,
    eventMetadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: reaction.account,
      post: postInst,
      reaction,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post: postInst, account: reaction.account, reaction, activity, ctx }
  );
}
