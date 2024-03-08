import { Ctx } from '../../processor';
import { SpaceFollowedData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Activity, EventName, Post, Space } from '../../model';
import { setActivity } from '../activity';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { processSpaceFollowingUnfollowingRelations } from './common';

export async function spaceFollowed(
  ctx: Ctx,
  eventCallData: SpaceFollowedData
): Promise<void> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata }
  } = eventCallData;

  const followerAccount = await getOrCreateAccount(eventParams.followerId, ctx);
  let { followingSpacesCount } = followerAccount;
  const space = await getEntityWithRelations.space(eventParams.spaceId, ctx);
  if (!space) {
    new EntityProvideFailWarning(
      Space,
      eventParams.spaceId,
      ctx,
      eventMetadata
    );
    return;
  }

  await processSpaceFollowingUnfollowingRelations(
    followerAccount,
    space,
    ctx,
    eventMetadata
  );

  const activity = await setActivity({
    account: followerAccount,
    ctx,
    space,
    eventMetadata
  });
  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventMetadata);
    return;
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceFollowed,
    {
      account: followerAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceFollowed,
    {
      account: followerAccount,
      space,
      activity,
      ctx
    }
  );

  followingSpacesCount = !followingSpacesCount ? 1 : followingSpacesCount + 1;
  followerAccount.followingSpacesCount = followingSpacesCount;
  await ctx.store.save(followerAccount);
}
