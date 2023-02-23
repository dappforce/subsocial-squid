import {
  ReactionKind,
  Status,
  Post,
  Reaction,
  Activity,
  EventName
} from '../../model';
import { Ctx } from '../../processor';

import { setActivity } from '../activity';
import { getOrCreateAccount } from '../account';
import { getSyntheticEventName } from '../../common/utils';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostReactionDeletedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { NotificationsFeedManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postReactionDeleted(
  ctx: Ctx,
  eventData: PostReactionDeletedData
): Promise<void> {
  const { forced, forcedData, postId, reactionId, reactionKind } = eventData;

  const reaction = await ctx.store.get(Reaction, reactionId);

  if (!reaction) {
    new EntityProvideFailWarning(Reaction, reactionId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const post = await getEntityWithRelations.post({ postId, ctx });

  if (!post) {
    new EntityProvideFailWarning(Reaction, postId, ctx, eventData);
    throw new CommonCriticalError();
  }

  reaction.status = Status.Deleted;

  await ctx.store.save(reaction);

  if (reactionKind === ReactionKind.Upvote) {
    post.upvotesCount! -= 1;
  } else if (reactionKind === ReactionKind.Downvote) {
    post.downvotesCount! -= 1;
  }
  post.reactionsCount! -= 1;

  await ctx.store.save(post);

  const accountInst = await getOrCreateAccount(
    forced && forcedData ? forcedData.account : eventData.accountId,
    ctx
  );

  const syntheticEventName = getSyntheticEventName(
    EventName.PostReactionDeleted,
    post
  );

  const activity = await setActivity({
    syntheticEventName,
    account: accountInst,
    post,
    reaction,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    throw new CommonCriticalError();
  }

  await NotificationsFeedManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: reaction.account,
      post,
      reaction,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account: reaction.account, reaction, activity, ctx }
  );
}
