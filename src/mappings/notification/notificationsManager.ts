import { Ctx } from '../../processor';
import { EventName } from '../../model';
import { EVENT_NOTIFICATION_RELATIONS } from './variables';
import {
  NotificationAction,
  NotificationHandlerParamsWithTarget,
  NotificationHandlerInputParams,
  NotificationsHandlerBinderParams
} from './types';

export abstract class NotificationsFeedHandlersManager {
  abstract addNotificationForAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
  abstract addNotificationForAccountFollowers(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
  abstract deleteAllNotificationsAboutSpace(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
  abstract deleteAllNotificationsAboutAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
}

export class NotificationsFeedManager extends NotificationsFeedHandlersManager {
  private static instance: NotificationsFeedManager;

  private processorContext: Ctx | null = null;

  private handlersMatrix: Map<
    EventName,
    Array<(params: NotificationHandlerInputParams) => Promise<void>>
  > = new Map();

  static getInstance(): NotificationsFeedManager {
    if (!NotificationsFeedManager.instance) {
      NotificationsFeedManager.instance = new NotificationsFeedManager();
    }
    return NotificationsFeedManager.instance;
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
            (params: NotificationHandlerInputParams): Promise<void> =>
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
      await handler(params as unknown as NotificationHandlerInputParams);
    }
  }

  async addNotificationForAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    console.log('addNotificationForAccount >>> ');
    console.dir(params.target, { depth: null });
  }

  async addNotificationForAccountFollowers(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    console.log('addNotificationForAccountFollowers >>> ');
    console.dir(params.target, { depth: null });
  }

  async deleteAllNotificationsAboutSpace(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    console.log('deleteAllNotificationsAboutSpace >>> ');
    console.dir(params.target, { depth: null });
  }

  async deleteAllNotificationsAboutAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    console.log('deleteAllNotificationsAboutAccount >>> ');
    console.dir(params.target, { depth: null });
  }
}
