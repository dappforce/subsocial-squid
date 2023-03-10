import {
  Account,
  Activity,
  NewsFeed,
  Notification,
  Space,
  AccountFollowers
} from '../../model';
import { getOrCreateAccount } from '../account';
import { getNotificationEntityId } from '../../common/utils';
import { Ctx } from '../../processor';

export const addNotificationForAccount = async (
  account: Account | string,
  activity: Activity,
  ctx: Ctx
): Promise<Notification | null> => {
  const accountInst =
    account instanceof Account
      ? account
      : await getOrCreateAccount(account, ctx);

  const notification = new Notification({
    id: getNotificationEntityId(accountInst.id, activity.id),
    account: accountInst,
    activity: activity
  });

  await ctx.store.save(notification);
  return notification;
};

export const addNotificationForAccountFollowers = async (
  account: Account | string,
  activity: Activity,
  ctx: Ctx
): Promise<void> => {
  const accountInst =
    account instanceof Account
      ? account
      : await getOrCreateAccount(account, ctx);

  const accountFollowersRelations = await ctx.store.find(AccountFollowers, {
    where: { followingAccount: { id: accountInst.id } },
    relations: { followerAccount: true }
  });

  const notificationsDraftList = accountFollowersRelations.map(
    (relation: AccountFollowers) => {
      const notification = new Notification();

      notification.id = getNotificationEntityId(
        relation.followerAccount.id,
        activity.id
      );
      notification.account = relation.followerAccount;
      notification.activity = activity;

      return notification;
    }
  );

  if (!notificationsDraftList || notificationsDraftList.length === 0) return;

  await ctx.store.save(notificationsDraftList);
};

/**
 * Delete all notifications about Space activities and Space's posts activities
 * @param accountId
 * @param followingSpace
 * @param ctx
 */
export const deleteAllNotificationsAboutSpace = async (
  accountId: string,
  followingSpace: Space,
  ctx: Ctx
): Promise<void> => {
  const relatedNotifications = await ctx.store.find(Notification, {
    where: [
      {
        account: { id: accountId },
        activity: {
          space: { id: followingSpace.id }
        }
      }
    ]
  });

  await ctx.store.remove(relatedNotifications);
};

export const deleteAllNotificationsAboutAccount = async (
  account: Account | string,
  followingAccount: Account | string,
  ctx: Ctx
): Promise<void> => {
  const accountInst =
    account instanceof Account
      ? account
      : await getOrCreateAccount(account, ctx);
  const followingAccountInst =
    followingAccount instanceof Account
      ? followingAccount
      : await getOrCreateAccount(followingAccount, ctx);

  const relatedNotifications = await ctx.store.find(Notification, {
    where: [
      {
        account: { id: accountInst.id },
        activity: {
          account: { id: followingAccountInst.id }
        }
      }
    ]
  });

  await ctx.store.remove(relatedNotifications);
};
