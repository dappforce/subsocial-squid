import { Activity, Post, Space } from '../../../model';
import { Ctx } from '../../../processor';
import { updateAggregatedStatus } from './aggregationUtils';
import { ensurePositiveOrZeroValue } from '../../../common/utils';

type InsertActivityForPostFollowedUnfollowedParams = {
  post: Post;
  activity: Activity;
  ctx: Ctx;
};

export async function insertActivityForPostFollowedUnfollowed(
  params: InsertActivityForPostFollowedUnfollowedParams
): Promise<Activity> {
  const { activity, post, ctx } = params;

  activity.post = post;
  activity.aggregated = true;
  activity.aggCount = BigInt(
    ensurePositiveOrZeroValue(post.followersCount)
  );
  await updateAggregatedStatus({
    eventName: activity.event,
    post,
    ctx
  });
  return activity;
}
