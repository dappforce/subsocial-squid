import { Ctx } from '../../../processor';
import { EventName, Post } from '../../../model';
import { EVENT_FEED_PUBLICATION_RELATIONS } from './config';
import {
  FeedHandlerBinderParams,
  FeedHandlerInputParams,
  FeedHandlerParamsWithTarget,
  FeedPublicationsAction
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

  async handleFeedPublications<E extends EventName>(
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
    const { target, post, activity, ctx } = params;

    const paramsWarning = () => {
      InvalidFeedHandlerParamsForTargetWarn(activity.event, target, ctx);
    };

    let originPostForProcessing: Post | undefined = post;
    // if (activity.event === EventName.PostShared && post && post.sharedPost) {
    //   originPostForProcessing = post.sharedPost;
    //   console.log('OriginPostOwnerFollowers - originPostForProcessing');
    //   console.dir(originPostForProcessing, { depth: null });
    // }

    switch (target) {
      case 'OriginPostOwnerFollowers': {
        if (
          !originPostForProcessing ||
          !originPostForProcessing.ownedByAccount
        ) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.add.one.forAccountFollowers(
          originPostForProcessing.ownedByAccount.id,
          activity,
          ctx
        );
        break;
      }
      case 'OriginPostSpaceFollowers': {
        if (!originPostForProcessing || !originPostForProcessing.space) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.add.one.forSpaceFollowers(
          originPostForProcessing,
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
    const {
      target,
      post,
      activity,
      account,
      followerAccount,
      followingAccount,
      space,
      spacePrev,
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
      case 'PreviousSpaceOriginPostSpaceFollowers': {
        if (!spacePrev) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.spacePosts.fromAllSpaceFollowers(
          spacePrev.id,
          ctx
        );
        break;
      }
      case 'FollowerAccount': {
        if (!account || !followingAccount) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.accountPosts.fromAccountFollower(
          getEntityIdFromEntityOrString(account),
          getEntityIdFromEntityOrString(followingAccount),
          ctx
        );
        break;
      }
      case 'SpaceFollowerAccount': {
        if (!space || !account) {
          paramsWarning();
          break;
        }
        await feedPublicationHelpers.delete.all.spacePosts.fromSpaceFollower(
          getEntityIdFromEntityOrString(space),
          getEntityIdFromEntityOrString(account),
          ctx
        );
        break;
      }
      default:
    }
  }
}
