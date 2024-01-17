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
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postReactionDeleted(
  ctx: Ctx,
  eventCallData: PostReactionDeletedData
): Promise<void> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const reaction = await ctx.store.get(Reaction, eventParams.reactionId);

  if (!reaction) {
    new EntityProvideFailWarning(
      Reaction,
      eventParams.reactionId,
      ctx,
      eventMetadata
    );
    throw new CommonCriticalError();
  }

  const post = await getEntityWithRelations.post({
    postId: eventParams.postId,
    ctx
  });

  if (!post) {
    new EntityProvideFailWarning(
      Reaction,
      eventParams.postId,
      ctx,
      eventMetadata
    );
    throw new CommonCriticalError();
  }

  reaction.status = Status.Deleted;

  await ctx.store.save(reaction);

  if (eventParams.reactionKind === ReactionKind.Upvote) {
    post.upvotesCount! -= 1;
  } else if (eventParams.reactionKind === ReactionKind.Downvote) {
    post.downvotesCount! -= 1;
  }
  post.reactionsCount! -= 1;

  await ctx.store.save(post);

  const accountInst = await getOrCreateAccount(
    callArgs.forced && callArgs.forcedData
      ? callArgs.forcedData.account
      : eventParams.accountId,
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
