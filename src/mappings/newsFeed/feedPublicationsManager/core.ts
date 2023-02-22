import { Ctx } from '../../../processor';
import { EventName } from '../../../model';
import { EVENT_FEED_PUBLICATION_RELATIONS } from './config';
import {
  FeedPublicationsAction,
  FeedHandlerInputParams,
  FeedHandlerParamsWithTarget,
  FeedHandlerBinderParams
} from '../types';
import { InvalidFeedHandlerParamsForTargetWarn } from '../common';
import { feedPublicationHelpers } from './helpers';
import { getEntityIdFromEntityOrString } from '../../../common/utils';

export abstract class FeedHandlersManager {
  abstract addFeedPublicationForAccount(
    paramsWithTarget: FeedHandlerParamsWithTarget
  ): Promise<void>;
  abstract deleteFeedPublicationFromAccount(
    paramsWithTarget: FeedHandlerParamsWithTarget
  ): Promise<void>;
}

export class FeedPublicationsManager extends FeedHandlersManager {
  private static instance: FeedPublicationsManager;

  private processorContext: Ctx | null = null;

  private handlersMatrix: Map<
    EventName,
    Array<(params: FeedHandlerInputParams) => Promise<void>>
  > = new Map();

  static getInstance(): FeedPublicationsManager {
    if (!FeedPublicationsManager.instance) {
      FeedPublicationsManager.instance = new FeedPublicationsManager();
    }
    return FeedPublicationsManager.instance;
  }

  constructor() {
    super();
    this.initHandlersMatrix();
  }

  public initHandlersMatrix() {
    for (const eventName in EVENT_FEED_PUBLICATION_RELATIONS) {
      const handlersList = [];

      const handlerTargetsRel =
        EVENT_FEED_PUBLICATION_RELATIONS[eventName as EventName];

      if (!handlerTargetsRel) continue;

      loopTargets: for (const handlerFuncName in handlerTargetsRel) {
        const targets =
          handlerTargetsRel![handlerFuncName as FeedPublicationsAction];
        if (!targets) continue loopTargets;

        for (const target of targets) {
          handlersList.push(
            (params: FeedHandlerInputParams): Promise<void> =>
              this[handlerFuncName as FeedPublicationsAction]({
                target,
                ...params
              })
          );
        }
      }

      this.handlersMatrix.set(eventName as EventName, handlersList);
    }
  }

  async handleNotifications<E extends EventName>(
    eventName: E,
    params: FeedHandlerBinderParams<E>
  ) {
    if (!this.handlersMatrix.has(eventName)) return;
    for (const handler of this.handlersMatrix.get(eventName)!) {
      // TODO remove type casting
      await handler(params as unknown as FeedHandlerInputParams);
    }
  }

  async addFeedPublicationForAccount(
    params: FeedHandlerParamsWithTarget
  ): Promise<void> {
    console.log(
      `addFeedPublicationForAccount >>> ${params.target} | ${params.activity.event}`
    );

    const {
      target,
      account,
      post,
      space,
      activity,
      followingAccount,
      followingSpace,
      ctx
    } = params;

    const paramsWarning = () => {
      InvalidFeedHandlerParamsForTargetWarn(activity.event, target, ctx);
    };

    switch (target) {
      case 'OriginPostOwnerFollowers': {
        if (!post || !post.ownedByAccount) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.add.one.forAccountFollowers(
          post.ownedByAccount.id,
          activity,
          ctx
        );
        break;
      }
      case 'OriginPostSpaceFollowers': {
        if (!post || !post.space) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.add.one.forSpaceFollowers(
          post,
          activity,
          ctx
        );
        break;
      }

      default:
    }
  }

  async deleteFeedPublicationFromAccount(
    params: FeedHandlerParamsWithTarget
  ): Promise<void> {
    console.log(
      `deleteFeedPublicationFromAccount >>> ${params.target} | ${params.activity.event}`
    );

    const { target, post, activity, followerAccount, followingAccount, ctx } =
      params;

    const paramsWarning = () => {
      InvalidFeedHandlerParamsForTargetWarn(activity.event, target, ctx);
    };

    switch (target) {
      case 'OriginPostOwnerFollowers': {
        if (!post || !post.ownedByAccount) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.accountPosts.fromAllAccountFollowers(
          post.ownedByAccount.id,
          ctx
        );
        break;
      }
      case 'OriginPostSpaceFollowers': {
        if (!post || !post.space) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.spacePosts.fromAllSpaceFollowers(
          post.space.id,
          ctx
        );
        break;
      }
      case 'FollowerAccount': {
        if (!followerAccount || !followingAccount) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.accountPosts.fromAccountFollower(
          getEntityIdFromEntityOrString(followerAccount),
          getEntityIdFromEntityOrString(followingAccount),
          ctx
        );
        break;
      }
      case 'SpaceFollowerAccount': {
        if (!post || !post.space || !followerAccount) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.spacePosts.fromSpaceFollower(
          getEntityIdFromEntityOrString(post.space),
          getEntityIdFromEntityOrString(followerAccount),
          ctx
        );
        break;
      }
      default:
    }
  }
}
