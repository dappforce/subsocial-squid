import { Post, Activity, Space } from '../../../model';
import { Ctx } from '../../../processor';
import {
  getAggregationCount,
  updateAggregatedStatus
} from './aggregationUtils';

type InsertActivityForPostCreatedParams = {
  post: Post;
  activity: Activity;
  ctx: Ctx;
};

export async function insertActivityForPostCreated(
  params: InsertActivityForPostCreatedParams
): Promise<Activity> {
  const { activity, post, ctx } = params;

  activity.post = post;
  activity.aggregated = true;

  if (!post.isComment) {
    /**
     * Regular Post
     */

    activity.space = post.space;
    activity.aggCount = BigInt(0);
  } else if (post.isComment && post.rootPost) {
    /**
     * Post Comment / Comment Reply
     */
    // const ownerId = post.parentPost
    //   ? post.parentPost.ownedByAccount.id
    //   : post.rootPost
    //   ? post.rootPost.ownedByAccount.id
    //   : null; // Owner of either root post or parent comment

    // activity.aggregated = activity.account.id !== ownerId;

    activity.space = post.rootPost.space;

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
      eventName: activity.event,
      post,
      ctx
    });
  }

  return activity;
}
