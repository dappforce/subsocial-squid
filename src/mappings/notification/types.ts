import { NotificationsHandlersManager } from './notifiactionsManager';
import {
  Account,
  Activity,
  Space,
  Post,
  EventName,
  Reaction
} from '../../model';
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

export type NotificationAction = keyof NotificationsHandlersManager;

export type NotificationsBehaviour = Partial<
  Record<NotificationAction, Array<NotificationTarget>>
>;

export type NotificationHandlerInputParams = {
  account: Account | string;
  post?: Post;
  reaction?: Reaction;
  space?: Space;
  spacePrev?: Space;
  followingAccount?: Account | string;
  followingSpace?: Space;
  activity: Activity;
  ctx: Ctx;
};

export type NotificationHandlerParamsWithTarget =
  NotificationHandlerInputParams & {
    target: NotificationTarget;
  };

export interface NotificationsHandlersManagerInterface {
  [kay: string]: (params: NotificationHandlerParamsWithTarget) => Promise<void>;
}

type NotificationsParamsBase = {
  account: Account | string; // this account is a followerAccount in following events
  activity: Activity;
  ctx: Ctx;
};

type NotificationsParamsOnPostCreated = NotificationsParamsBase & {
  post: Post;
};

type NotificationsParamsOnPostUpdated = NotificationsParamsBase & {
  post: Post;
};

type NotificationsParamsOnPostDeleted = NotificationsParamsBase & {
  post: Post;
};

type NotificationsParamsOnPostShared = NotificationsParamsBase & {
  post: Post;
};

type NotificationsParamsOnPostMoved = NotificationsParamsBase & {
  post: Post;
  space: Space | null;
};
type NotificationsParamsOnPostFollowed = NotificationsParamsBase & {
  post: Post;
};
type NotificationsParamsOnPostReactionCreated = NotificationsParamsBase & {
  reaction: Reaction;
};
type NotificationsParamsOnSpaceCreated = NotificationsParamsBase & {
  space: Space;
};
type NotificationsParamsOnSpaceFollowed = NotificationsParamsBase & {
  space: Space;
};
type NotificationsParamsOnSpaceOwnership = NotificationsParamsBase & {
  space: Space;
};
type NotificationsParamsOnAccountFollowed = NotificationsParamsBase & {
  followingAccount: Account;
};
type NotificationsParamsOnProfileUpdated = NotificationsParamsBase & {
  space: Space;
};
type NotificationsParamsOnUsernameRegistered = NotificationsParamsBase & {
  space: Space;
  spacePrev: Space;
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
    : E extends EventName.PostDeleted
    ? NotificationsParamsOnPostDeleted
    : E extends EventName.PostUpdated
    ? NotificationsParamsOnPostUpdated
    : E extends EventName.CommentUpdated
    ? NotificationsParamsOnPostUpdated
    : E extends EventName.CommentReplyUpdated
    ? NotificationsParamsOnPostUpdated
    : E extends EventName.PostMoved
    ? NotificationsParamsOnPostMoved
    : E extends EventName.PostFollowed
    ? NotificationsParamsOnPostFollowed
    : E extends EventName.PostUnfollowed
    ? NotificationsParamsOnPostFollowed
    : E extends EventName.PostReactionCreated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.PostReactionUpdated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.PostReactionDeleted
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReactionCreated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReactionUpdated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReactionDeleted
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionCreated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionUpdated
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionDeleted
    ? NotificationsParamsOnPostReactionCreated
    : E extends EventName.SpaceCreated
    ? NotificationsParamsOnSpaceCreated
    : E extends EventName.SpaceUpdated
    ? NotificationsParamsOnSpaceCreated
    : E extends EventName.SpaceFollowed
    ? NotificationsParamsOnSpaceFollowed
    : E extends EventName.SpaceUnfollowed
    ? NotificationsParamsOnSpaceFollowed
    : E extends EventName.SpaceOwnershipTransferAccepted
    ? NotificationsParamsOnSpaceOwnership
    : E extends EventName.AccountFollowed
    ? NotificationsParamsOnAccountFollowed
    : E extends EventName.AccountUnfollowed
    ? NotificationsParamsOnAccountFollowed
    : E extends EventName.ProfileUpdated
    ? NotificationsParamsOnProfileUpdated
    : E extends EventName.UserNameRegistered
    ? NotificationsParamsOnUsernameRegistered
    : E extends EventName.UserNameUpdated
    ? NotificationsParamsOnUsernameRegistered
    : never;
