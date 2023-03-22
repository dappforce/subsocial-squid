import { Post, Activity, Reaction, EventName } from '../../../model';
import { Ctx } from '../../../processor';
import {
  getAggregationCount,
  updateAggregatedStatus
} from './aggregationUtils';
import { ensurePositiveOrZeroValue } from '../../../common/utils';

type InsertActivityForPostReactionParams = {
  post: Post;
  reaction: Reaction;
  activity: Activity;
  ctx: Ctx;
};

export async function insertActivityForPostReaction(
  params: InsertActivityForPostReactionParams
): Promise<Activity> {
  const { activity, reaction, post, ctx } = params;
  const { event: eventName } = activity;

  if (
    eventName !== EventName.PostReactionDeleted &&
    eventName !== EventName.CommentReactionDeleted &&
    eventName !== EventName.CommentReplyReactionDeleted
  )
    activity.reaction = reaction;

  activity.post = post;
  activity.space = post.space;

  // const aggCountNum = post.upvotesCount + post.downvotesCount - 1;
  // const aggCountNum = post.upvotesCount + post.downvotesCount;

  // const ownerId = post.parentPost
  //   ? post.parentPost.ownedByAccount.id
  //   : post.rootPost
  //   ? post.rootPost.ownedByAccount.id
  //   : null; // Owner of either root post or parent comment

  activity.aggregated = true;
  // activity.aggregated = activity.account.id !== ownerId;

  activity.aggCount =
    BigInt(
      await getAggregationCount({
        eventName: activity.event,
        accountId: activity.account.id,
        postId: post.id,
        ctx
      })
    ) + 1n;

  await updateAggregatedStatus({
    eventName,
    post,
    ctx
  });

  return activity;
}
