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
  { eventData }: SpaceUnfollowedData
): Promise<void> {
  const followerAccount = await getOrCreateAccount(
    eventData.params.followerId,
    ctx
  );
  let { followingSpacesCount } = followerAccount;
  const space = await getEntityWithRelations.space(
    eventData.params.spaceId,
    ctx
  );
  if (!space) {
    new EntityProvideFailWarning(
      Space,
      eventData.params.spaceId,
      ctx,
      eventData.metadata
    );
    return;
  }

  await processSpaceFollowingUnfollowingRelations(
    followerAccount,
    space,
    ctx,
    eventData.metadata
  );

  const activity = await setActivity({
    account: followerAccount,
    ctx,
    space,
    eventMetadata: eventData.metadata
  });
  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
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
