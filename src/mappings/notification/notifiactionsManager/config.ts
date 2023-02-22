import {
  NotificationsBehaviour,
} from '../types';
import { EventName } from '../../../model';

/**
 * IMPORTANT
 *
 * Notifications Behaviour Relations (action <-> target) meaning depends on
 * action type:
 *
 * - "add___" - if it's ADD action, it means that Notifications Manager will
 *    ADD notification TO defined target entity(eis);
 *
 * - "delete___" - if it's DELETE action, it means that Notifications Manager
 *    will DELETE all notifications about entity, which is mentioned in the
 *    action name (Space | Account | Reaction) FROM target entity(eis);
 *
 */

/**
 * POST CREATED
 */
const onPostCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner']
};

const onCommentCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'RootPostSpaceOwner']
};

const onCommentReplyCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'ParentPostOwner']
};

/**
 * POST SHARED
 */

const onPostShared: NotificationsBehaviour = {
  addNotificationForAccount: [
    'OriginPostSpaceOwner',
    'SharedPostOwner',
    'SharedPostSpaceOwner'
  ]
};
const onCommentShared: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner', 'SharedPostOwner']
};

const onCommentReplyShared: NotificationsBehaviour = {
  addNotificationForAccount: [
    'SharedPostSpaceOwner',
    'RootPostOwner',
    'ParentPostOwner'
  ]
};

/**
 * REACTION
 */
const onPostReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onPostReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onPostReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

const onCommentReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onCommentReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onCommentReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

const onCommentReplyReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onCommentReplyReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const onCommentReplyReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

/**
 * SPACE
 */
const onSpaceCreated: NotificationsBehaviour = {
  addNotificationForAccountFollowers: ['SpaceOwnerAccountFollowers']
};

const onSpaceFollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['SpaceOwnerAccount']
};

const onSpaceUnfollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['SpaceOwnerAccount'],
  deleteAllNotificationsAboutSpace: ['SpaceFollowerAccount']
};
const onSpaceOwnershipTransferAccepted: NotificationsBehaviour = {
  addNotificationForAccountFollowers: ['SpaceOwnerAccountFollowers']
};

/**
 * ACCOUNT
 */
const onAccountFollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['FollowingAccount']
};

const onAccountUnfollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['FollowingAccount'],
  deleteAllNotificationsAboutAccount: ['FollowerAccount']
};

export const EVENT_NOTIFICATION_RELATIONS: Partial<
  Record<EventName, NotificationsBehaviour>
> = {
  PostCreated: onPostCreated,
  CommentCreated: onCommentCreated,
  CommentReplyCreated: onCommentReplyCreated,

  PostShared: onPostShared,
  CommentShared: onCommentShared,
  CommentReplyShared: onCommentReplyShared,

  PostReactionCreated: onPostReactionCreated,
  PostReactionUpdated: onPostReactionUpdated,
  PostReactionDeleted: onPostReactionDeleted,
  CommentReactionCreated: onCommentReactionCreated,
  CommentReactionUpdated: onCommentReactionUpdated,
  CommentReactionDeleted: onCommentReactionDeleted,
  CommentReplyReactionCreated: onCommentReplyReactionCreated,
  CommentReplyReactionUpdated: onCommentReplyReactionUpdated,
  CommentReplyReactionDeleted: onCommentReplyReactionDeleted,

  SpaceCreated: onSpaceCreated,
  SpaceFollowed: onSpaceFollowed,
  SpaceUnfollowed: onSpaceUnfollowed,
  SpaceOwnershipTransferAccepted: onSpaceOwnershipTransferAccepted,

  AccountFollowed: onAccountFollowed,
  AccountUnfollowed: onAccountUnfollowed,

  SpaceUpdated: {},
  UserNameRegistered: {},
  UserNameUpdated: {},
  PostDeleted: {},
  PostUpdated: {},
  PostMoved: {},
  ProfileUpdated: {}
};
