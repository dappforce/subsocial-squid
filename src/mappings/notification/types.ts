import { NotificationsFeedHandlersManager } from './notificationsManager';
import { Account, Activity, Space, Post, EventName } from '../../model';
import { Ctx } from '../../processor';

export type NotificationTarget =
  | 'OriginPostOwner'
  | 'OriginPostOwnerFollowers'
  | 'OriginPostSpaceOwner'
  | 'OriginPostSpaceFollowers'
  | 'SharedPostOwner'
  | 'SharedPostOwnerFollowers'
  | 'SharedPostSpaceOwner'
  | 'SharedPostSpaceFollowers'
  | 'RootPostOwner'
  | 'RootPostOwnerFollowers'
  | 'RootPostSpaceOwner'
  | 'RootPostSpaceFollowers'
  | 'ParentPostOwner'
  | 'ParentPostOwnerFollowers'
  | 'ParentPostSpaceOwner'
  | 'ParentPostSpaceFollowers'
  | 'FollowingAccount'
  | 'FollowerAccount'
  | 'SpaceOwnerAccount'
  | 'SpaceOwnerAccountFollowers'
  | 'SpaceFollowerAccount'
  | 'SpaceNewOwnerAccount'
  | 'PreviousSpaceOriginPostSpaceFollowers';

export type NotificationAction = keyof NotificationsFeedHandlersManager;

export type NotificationsBehaviour = Partial<
  Record<NotificationAction, Array<NotificationTarget>>
>;

export type NotificationHandlerInputParams = {
  account: Account | string;
  post?: Post;
  followingAccount?: Account | string;
  followingSpace?: Space;
  activity: Activity;
  ctx: Ctx;
};

export type NotificationHandlerParamsWithTarget =
  NotificationHandlerInputParams & {
    target: NotificationTarget;
  };

export interface NotificationsFeedHandlersManagerInterface {
  [kay: string]: (params: NotificationHandlerParamsWithTarget) => Promise<void>;
}

type NotificationsParamsBase = {
  activity: Activity;
  ctx: Ctx;
};

type NotificationsParamsOnPostCreated = NotificationsParamsBase & {
  account: Account | string;
  post: Post;
};

type NotificationsParamsOnPostShared = NotificationsParamsBase & {
  account: Account | string;
  post: Post;
};

export type NotificationsHandlerBinderParams<E extends EventName> =
  E extends EventName.PostCreated
    ? NotificationsParamsOnPostCreated
    : E extends EventName.CommentCreated
    ? NotificationsParamsOnPostCreated
    : E extends EventName.CommentReplyCreated
    ? NotificationsParamsOnPostCreated
    : E extends EventName.PostShared
    ? NotificationsParamsOnPostShared
    : E extends EventName.CommentShared
    ? NotificationsParamsOnPostShared
    : E extends EventName.CommentReplyShared
    ? NotificationsParamsOnPostShared
    : never;
