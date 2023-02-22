import { FeedHandlersManager } from './feedPublicationsManager';
import {
  Account,
  Activity,
  Space,
  Post,
  EventName,
  Reaction
} from '../../model';
import { Ctx } from '../../processor';
import { NotificationFeedTarget } from '../../common/types';

export type FeedPublicationsAction = keyof FeedHandlersManager;

export type FeedPublicationsBehaviour = Partial<
  Record<FeedPublicationsAction, Array<NotificationFeedTarget>>
>;

export type FeedHandlerInputParams = {
  account: Account | string;
  post?: Post;
  space?: Space;
  spacePrev?: Space;
  followerAccount?: Account | string;
  followingAccount?: Account | string;
  followingSpace?: Space;
  activity: Activity;
  ctx: Ctx;
};

export type FeedHandlerParamsWithTarget = FeedHandlerInputParams & {
  target: NotificationFeedTarget;
};

type FeedPublicationParamsBase = {
  account: Account | string; // this account is a followerAccount in following events
  activity: Activity;
  ctx: Ctx;
};

type FeedPublicationParamsOnPostCreated = FeedPublicationParamsBase & {
  post: Post;
};

type FeedPublicationParamsOnPostUpdated = FeedPublicationParamsBase & {
  post: Post;
};

type FeedPublicationParamsOnPostDeleted = FeedPublicationParamsBase & {
  post: Post;
};

type FeedPublicationParamsOnPostShared = FeedPublicationParamsBase & {
  post: Post;
};

type FeedPublicationParamsOnPostMoved = FeedPublicationParamsBase & {
  post: Post;
  space: Space | null;
};
type FeedPublicationParamsOnPostFollowed = FeedPublicationParamsBase & {
  post: Post;
};
type FeedPublicationParamsOnPostReactionCreated = FeedPublicationParamsBase & {
  reaction: Reaction;
};
type FeedPublicationParamsOnSpaceCreated = FeedPublicationParamsBase & {
  space: Space;
};
type FeedPublicationParamsOnSpaceFollowed = FeedPublicationParamsBase & {
  space: Space;
};
type FeedPublicationParamsOnSpaceOwnership = FeedPublicationParamsBase & {
  space: Space;
};
type FeedPublicationParamsOnAccountFollowed = FeedPublicationParamsBase & {
  followingAccount: Account;
};
type FeedPublicationParamsOnProfileUpdated = FeedPublicationParamsBase & {
  space: Space;
};
type FeedPublicationParamsOnUsernameRegistered = FeedPublicationParamsBase & {
  space: Space;
  spacePrev: Space;
};

export type FeedHandlerBinderParams<E extends EventName> =
  E extends EventName.PostCreated
    ? FeedPublicationParamsOnPostCreated
    : E extends EventName.CommentCreated
    ? FeedPublicationParamsOnPostCreated
    : E extends EventName.CommentReplyCreated
    ? FeedPublicationParamsOnPostCreated
    : E extends EventName.PostShared
    ? FeedPublicationParamsOnPostShared
    : E extends EventName.CommentShared
    ? FeedPublicationParamsOnPostShared
    : E extends EventName.CommentReplyShared
    ? FeedPublicationParamsOnPostShared
    : E extends EventName.PostDeleted
    ? FeedPublicationParamsOnPostDeleted
    : E extends EventName.PostUpdated
    ? FeedPublicationParamsOnPostUpdated
    : E extends EventName.CommentUpdated
    ? FeedPublicationParamsOnPostUpdated
    : E extends EventName.CommentReplyUpdated
    ? FeedPublicationParamsOnPostUpdated
    : E extends EventName.PostMoved
    ? FeedPublicationParamsOnPostMoved
    : E extends EventName.PostFollowed
    ? FeedPublicationParamsOnPostFollowed
    : E extends EventName.PostUnfollowed
    ? FeedPublicationParamsOnPostFollowed
    : E extends EventName.PostReactionCreated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.PostReactionUpdated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.PostReactionDeleted
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReactionCreated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReactionUpdated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReactionDeleted
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionCreated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionUpdated
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.CommentReplyReactionDeleted
    ? FeedPublicationParamsOnPostReactionCreated
    : E extends EventName.SpaceCreated
    ? FeedPublicationParamsOnSpaceCreated
    : E extends EventName.SpaceUpdated
    ? FeedPublicationParamsOnSpaceCreated
    : E extends EventName.SpaceFollowed
    ? FeedPublicationParamsOnSpaceFollowed
    : E extends EventName.SpaceUnfollowed
    ? FeedPublicationParamsOnSpaceFollowed
    : E extends EventName.SpaceOwnershipTransferAccepted
    ? FeedPublicationParamsOnSpaceOwnership
    : E extends EventName.AccountFollowed
    ? FeedPublicationParamsOnAccountFollowed
    : E extends EventName.AccountUnfollowed
    ? FeedPublicationParamsOnAccountFollowed
    : E extends EventName.ProfileUpdated
    ? FeedPublicationParamsOnProfileUpdated
    : E extends EventName.UserNameRegistered
    ? FeedPublicationParamsOnUsernameRegistered
    : E extends EventName.UserNameUpdated
    ? FeedPublicationParamsOnUsernameRegistered
    : never;
