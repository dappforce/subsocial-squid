import { Ctx } from '../../processor';
import { SpaceUnfollowedData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { EntityProvideFailWarning } from '../../common/errors';
import { Activity, EventName, Space } from '../../model';
import { ensurePositiveOrZeroValue } from '../../common/utils';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { setActivity } from '../activity';
import { processSpaceFollowingUnfollowingRelations } from './common';

export async function spaceUnfollowed(
  ctx: Ctx,
  eventData: SpaceUnfollowedData
): Promise<void> {
  const followerAccount = await getOrCreateAccount(eventData.followerId, ctx);
  let { followingSpacesCount } = followerAccount;
  const space = await getEntityWithRelations.space(eventData.spaceId, ctx);
  if (!space) {
    new EntityProvideFailWarning(Space, eventData.spaceId, ctx, eventData);
    return;
  }

  await processSpaceFollowingUnfollowingRelations(
    followerAccount,
    space,
    ctx,
    eventData
  );

  const activity = await setActivity({
    account: followerAccount,
    ctx,
    space,
    eventData
  });
  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    return;
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceUnfollowed,
    {
      account: followerAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceUnfollowed,
    {
      account: followerAccount,
      space,
      activity,
      ctx
    }
  );

  followingSpacesCount = ensurePositiveOrZeroValue(followingSpacesCount - 1);
  followerAccount.followingSpacesCount = followingSpacesCount;
  await ctx.store.save(followerAccount);
}
