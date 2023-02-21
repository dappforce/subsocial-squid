import {
  Account,
  Activity,
  NewsFeed,
  Notification,
  Space,
  AccountFollowers,
  EventName,
  Reaction
} from '../../../model';
import { getOrCreateAccount } from '../../account';
import { getNotificationEntityId } from '../../../common/utils';
import { Ctx } from '../../../processor';
import { FindManyOptions, Entity } from '@subsquid/typeorm-store/src/store';

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
  accountId: string,
  activity: Activity,
  ctx: Ctx
): Promise<void> => {
  const accountFollowersRelations = await ctx.store.find(AccountFollowers, {
    where: { followingAccount: { id: accountId } },
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
  followingSpaceId: string,
  ctx: Ctx
): Promise<void> => {
  const relatedNotifications = await ctx.store.find(Notification, {
    where: [
      {
        account: { id: accountId },
        activity: {
          space: { id: followingSpaceId }
        }
      }
    ]
  });

  await ctx.store.remove(relatedNotifications);
};

export const deleteAllNotificationsAboutAccount = async (
  accountId: string,
  followingAccountId: string,
  ctx: Ctx,
  customQuery?: FindManyOptions<Notification>
): Promise<void> => {
  const findQuery: FindManyOptions<Notification> = customQuery || {
    where: {
      account: { id: accountId },
      activity: {
        account: { id: followingAccountId }
      }
    }
  };
  const relatedNotifications = await ctx.store.find(Notification, findQuery);

  await ctx.store.remove(relatedNotifications);
};

export const deleteAllNotificationsAboutReaction = async (
  account: Account | string,
  reaction: Reaction,
  ctx: Ctx
): Promise<void> => {
  const accountInst =
    account instanceof Account
      ? account
      : await getOrCreateAccount(account, ctx);

  const relatedNotifications = await ctx.store.find(Notification, {
    where: [
      {
        account: { id: accountInst.id },
        activity: {
          reaction: { id: reaction.id }
        }
      }
    ]
  });

  await ctx.store.remove(relatedNotifications);
};

export const notificationsHelpers = {
  add: {
    one: {
      forAccount: addNotificationForAccount,
      forAccountFollowers: addNotificationForAccountFollowers
    }
  },
  remove: {
    all: {
      aboutSpace: deleteAllNotificationsAboutSpace,
      aboutAccount: deleteAllNotificationsAboutAccount,
      aboutReaction: deleteAllNotificationsAboutReaction
    }
  }
};
