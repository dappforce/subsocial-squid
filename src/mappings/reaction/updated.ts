import { ReactionKind, Post, Reaction, Activity, EventName } from '../../model';
import { setActivity } from '../activity';
import { getOrCreateAccount } from '../account';
import {
  ensurePositiveOrZeroValue,
  getSyntheticEventName
} from '../../common/utils';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import { PostReactionUpdatedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postReactionUpdated(
  ctx: Ctx,
  eventCallData: PostReactionUpdatedData
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

  reaction.kind = callArgs.newReactionKind;
  reaction.updatedAtTime = eventMetadata.timestamp;
  reaction.updatedAtBlock = BigInt(eventMetadata.blockNumber.toString());

  await ctx.store.save(reaction);

  const post = await getEntityWithRelations.post({
    postId: eventParams.postId,
    ctx
  });

  if (!post) {
    new EntityProvideFailWarning(Post, eventParams.postId, ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  if (reaction.kind === ReactionKind.Upvote) {
    post.upvotesCount += 1;
    post.downvotesCount = ensurePositiveOrZeroValue(post.downvotesCount - 1);
  } else if (reaction.kind === ReactionKind.Downvote) {
    post.downvotesCount += 1;
    post.upvotesCount = ensurePositiveOrZeroValue(post.upvotesCount - 1);
  }

  await ctx.store.save(post);

  const syntheticEventName = getSyntheticEventName(
    EventName.PostReactionUpdated,
    post
  );
  const activity = await setActivity({
    syntheticEventName,
    account,
    reaction,
    post,
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
