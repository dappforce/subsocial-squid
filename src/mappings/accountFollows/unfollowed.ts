// import { handleEvent } from './common';
import { Ctx } from '../../processor';
import { AccountUnfollowedData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { setActivity } from '../activity';
import { getAccountFollowersEntityId } from '../../common/utils';
import { AccountFollowers, EventName } from '../../model';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { NotificationsManager } from '../notification/notifiactionsManager';

export async function accountUnfollowed(
  ctx: Ctx,
  eventData: AccountUnfollowedData
): Promise<void> {
  // await handleEvent(eventData.followerId, eventData.accountId, ctx, eventData);

  const followerAccount = await getOrCreateAccount(eventData.followerId, ctx);
  const followingAccount = await getOrCreateAccount(eventData.accountId, ctx);

  const activity = await setActivity({
    account: followerAccount,
    followingAccount,
    ctx,
    eventData
  });

  if (!activity) return;

  const accountFollowersEntityId = getAccountFollowersEntityId(
    followerAccount.id,
    followingAccount.id
  );
  const accountFollowersEntity = await ctx.store.get(
    AccountFollowers,
    accountFollowersEntityId
  );

  let currentFollowersCountOfFollowingAcc =
    followingAccount.followersCount || 0;
  let currentFollowingCountOfFollowerAcc =
    followerAccount.followingAccountsCount || 0;

  if (!accountFollowersEntity) return;
  currentFollowersCountOfFollowingAcc -= 1;
  currentFollowingCountOfFollowerAcc -= 1;
  await ctx.store.remove(accountFollowersEntity);

  await NotificationsManager.getInstance().handleNotifications(
    EventName.AccountUnfollowed,
    {
      account: followerAccount,
      followingAccount,
      activity,
      ctx
    }
  );
  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.AccountUnfollowed,
    {
      account: followerAccount,
      followingAccount: followingAccount,
      activity,
      ctx
    }
  );

  /**
   * Update accounts counters
   */
  followerAccount.followingAccountsCount = currentFollowingCountOfFollowerAcc;
  followingAccount.followersCount = currentFollowersCountOfFollowingAcc;

  await ctx.store.save([followerAccount, followingAccount]);
}
