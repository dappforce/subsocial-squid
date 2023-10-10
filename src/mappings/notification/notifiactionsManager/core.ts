import { Ctx } from '../../../processor';
import {
  Account,
  EventName,
  Notification,
  InBatchNotifications
} from '../../../model';
import { EVENT_NOTIFICATION_RELATIONS } from './config';
import {
  NotificationAction,
  NotificationHandlerInputParams,
  NotificationHandlerParamsWithTarget,
  NotificationsHandlerBinderParams
} from '../types';

import { InvalidNotificationHandlerParamsForTargetWarn } from '../common';

import { notificationsHelpers } from './helpers';
import { In, Not } from 'typeorm';
import { FindManyOptions } from '@subsquid/typeorm-store/src/store';
import { getEntityIdFromEntityOrString } from '../../../common/utils';
import { getTargetAccForNotificationForAcc } from './utils';

export abstract class NotificationsHandlersManager {
  abstract addNotificationForAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<string[]>;
  abstract addNotificationForAccountFollowers(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<string[]>;

  abstract deleteAllNotificationsAboutReaction(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<null>;

  abstract deleteAllNotificationsAboutSpace(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<null>;
  abstract deleteAllNotificationsAboutAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<null>;
}

export class NotificationsManager extends NotificationsHandlersManager {
  private static instance: NotificationsManager;

  private processorContext: Ctx | null = null;

  private activeInBatchNotificationsEntity: InBatchNotifications | null = null;

  private handlersMatrix: Map<
    EventName,
    Array<(params: NotificationHandlerInputParams) => Promise<string[] | null>>
  > = new Map();

  static getInstance(): NotificationsManager {
    if (!NotificationsManager.instance) {
      NotificationsManager.instance = new NotificationsManager();
    }
    return NotificationsManager.instance;
  }

  constructor() {
    super();
    this.initHandlersMatrix();
  }

  public initHandlersMatrix() {
    for (const eventName in EVENT_NOTIFICATION_RELATIONS) {
      const handlersList = [];

      const handlerTargetsRel =
        EVENT_NOTIFICATION_RELATIONS[eventName as EventName];

      if (!handlerTargetsRel) continue;

      loopTargets: for (const handlerFuncName in handlerTargetsRel) {
        const targets =
          handlerTargetsRel![handlerFuncName as NotificationAction];
        if (!targets) continue loopTargets;

        for (const target of targets) {
          handlersList.push(
            (
              params: NotificationHandlerInputParams
            ): Promise<string[] | null> =>
              this[handlerFuncName as NotificationAction]({ target, ...params })
          );
        }
      }

      this.handlersMatrix.set(eventName as EventName, handlersList);
    }
  }

  async handleNotifications<E extends EventName>(
    eventName: E,
    params: NotificationsHandlerBinderParams<E>
  ) {
    if (!this.handlersMatrix.has(eventName)) return;
    for (const handler of this.handlersMatrix.get(eventName)!) {
      // TODO remove type casting
      const ids = await handler(
        params as unknown as NotificationHandlerInputParams
      );
      if (ids) this.addNotificationIdToInBatchList(ids, params.ctx);
    }
  }

  async addNotificationForAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<string[]> {
    let targetAccount: Account | string | null =
      getTargetAccForNotificationForAcc(params);

    if (!targetAccount) return [];

    return notificationsHelpers.add.one.forAccount(
      targetAccount,
      params.activity,
      params.ctx
    );
  }

  async addNotificationForAccountFollowers(
    params: NotificationHandlerParamsWithTarget
  ): Promise<string[]> {
    const { target, space, activity, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'SpaceOwnerAccountFollowers': {
        if (!space || !space.ownedByAccount) {
          paramsWarning();
          break;
        }
        targetAccount = space.ownedByAccount;
        break;
      }
      default:
    }

    if (!targetAccount) return [];

    return notificationsHelpers.add.one.forAccountFollowers(
      getEntityIdFromEntityOrString(targetAccount),
      activity,
      ctx
    );
  }

  async deleteAllNotificationsAboutReaction(
    params: NotificationHandlerParamsWithTarget
  ): Promise<null> {
    const { target, post, activity, reaction, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'OriginPostOwner': {
        if (!post || !post.ownedByAccount) {
          paramsWarning();
          break;
        }
        targetAccount = post.ownedByAccount;
        break;
      }
      default:
    }

    if (!targetAccount || !reaction) return null;

    return notificationsHelpers.remove.all.aboutReaction(
      targetAccount,
      reaction,
      ctx
    );
  }

  async deleteAllNotificationsAboutSpace(
    params: NotificationHandlerParamsWithTarget
  ): Promise<null> {
    const { target, activity, account, space, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'SpaceFollowerAccount': {
        if (!account) {
          paramsWarning();
          break;
        }
        targetAccount = account;
        break;
      }
      default:
    }

    if (!targetAccount || !space) return null;

    return notificationsHelpers.remove.all.aboutSpace(
      getEntityIdFromEntityOrString(targetAccount),
      space.id,
      ctx
    );
  }

  async deleteAllNotificationsAboutAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<null> {
    const { target, activity, account, followingAccount, ctx } = params;

    let targetAccount: Account | string | null = null;
    let customQueryParams: FindManyOptions<Notification> = {};

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'FollowerAccount': {
        if (!followingAccount) {
          paramsWarning();
          break;
        }
        targetAccount = followingAccount;
        if (activity.event === EventName.AccountUnfollowed) {
          const accId = getEntityIdFromEntityOrString(account);
          const followingAccId =
            getEntityIdFromEntityOrString(followingAccount);

          customQueryParams = {
            where: [
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.AccountUnfollowed,
                    EventName.AccountFollowed,
                    EventName.SpaceFollowed,
                    EventName.SpaceUnfollowed,
                    EventName.SpaceUpdated,
                    EventName.SpaceCreated,
                    EventName.SpaceOwnershipTransferAccepted,
                    EventName.ProfileUpdated,
                    EventName.UserNameRegistered,
                    EventName.UserNameUpdated,
                    EventName.PostReactionCreated,
                    EventName.PostReactionUpdated,
                    EventName.PostReactionDeleted,
                    EventName.CommentReactionCreated,
                    EventName.CommentReactionUpdated,
                    EventName.CommentReactionDeleted,
                    EventName.CommentReplyReactionCreated,
                    EventName.CommentReplyReactionUpdated,
                    EventName.CommentReplyReactionDeleted,
                    EventName.PostFollowed,
                    EventName.PostUnfollowed
                  ])
                }
              },
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.PostShared,
                    EventName.CommentShared,
                    EventName.CommentReplyShared
                  ]),
                  post: {
                    ownedByAccount: { id: Not(accId) }
                  }
                }
              },
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.PostCreated,
                    EventName.CommentCreated,
                    EventName.CommentReplyCreated
                  ]),
                  post: {
                    space: {
                      ownedByAccount: { id: Not(accId) }
                    }
                  }
                }
              }
            ]
          };
        }
        break;
      }
      default:
    }

    if (!targetAccount) return null;

    return notificationsHelpers.remove.all.aboutAccount(
      getEntityIdFromEntityOrString(account),
      getEntityIdFromEntityOrString(targetAccount),
      ctx,
      customQueryParams
    );
  }

  private addNotificationIdToInBatchList(notificationIds: string[], ctx: Ctx) {
    const batchBlocks = ctx.blocks;
    const inBatchNotificationsEntityId = `${batchBlocks[0].header.id}-${
      batchBlocks[batchBlocks.length - 1].header.id
    }`;

    if (!this.activeInBatchNotificationsEntity) {
      this.activeInBatchNotificationsEntity = new InBatchNotifications({
        id: inBatchNotificationsEntityId,
        batchStartBlockNumber: BigInt(batchBlocks[0].header.height),
        batchEndBlockNumber: BigInt(
          batchBlocks[batchBlocks.length - 1].header.height
        ),
        activityIds: []
      });
    }

    this.activeInBatchNotificationsEntity.activityIds.push(...notificationIds);
  }

  async commitInBatchNotifications(ctx: Ctx) {
    if (!this.activeInBatchNotificationsEntity) return;

    await ctx.store.save(this.activeInBatchNotificationsEntity);
    this.activeInBatchNotificationsEntity = null;
  }
}
