import {
  NotificationAction,
  NotificationsBehaviour,
  NotificationTarget
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
const relationsOnPostCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner']
};

const relationsOnCommentCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'RootPostSpaceOwner']
};

const relationsOnCommentReplyCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['RootPostOwner', 'ParentPostOwner']
};

/**
 * POST SHARED
 */

const relationsOnPostShared: NotificationsBehaviour = {
  addNotificationForAccount: [
    'OriginPostSpaceOwner',
    'SharedPostOwner',
    'SharedPostSpaceOwner'
  ]
};
const relationsOnCommentShared: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostSpaceOwner', 'SharedPostOwner']
};

const relationsOnCommentReplyShared: NotificationsBehaviour = {
  addNotificationForAccount: [
    'SharedPostSpaceOwner',
    'RootPostOwner',
    'ParentPostOwner'
  ]
};

/**
 * REACTION
 */
const relationsOnPostReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnPostReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnPostReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

const relationsOnCommentReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnCommentReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnCommentReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

const relationsOnCommentReplyReactionCreated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnCommentReplyReactionUpdated: NotificationsBehaviour = {
  addNotificationForAccount: ['OriginPostOwner']
};
const relationsOnCommentReplyReactionDeleted: NotificationsBehaviour = {
  deleteAllNotificationsAboutReaction: ['OriginPostOwner']
};

/**
 * SPACE
 */
const relationsOnSpaceCreated: NotificationsBehaviour = {
  addNotificationForAccountFollowers: ['SpaceOwnerAccountFollowers']
};

const relationsOnSpaceFollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['SpaceOwnerAccount']
};

const relationsOnSpaceUnfollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['SpaceOwnerAccount'],
  deleteAllNotificationsAboutSpace: ['SpaceFollowerAccount']
};
const relationsOnSpaceOwnershipTransferAccepted: NotificationsBehaviour = {
  addNotificationForAccountFollowers: ['SpaceOwnerAccountFollowers']
};

/**
 * ACCOUNT
 */
const relationsOnAccountFollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['FollowingAccount']
};

const relationsOnAccountUnfollowed: NotificationsBehaviour = {
  addNotificationForAccount: ['FollowingAccount'],
  deleteAllNotificationsAboutAccount: ['FollowerAccount']
};

export const EVENT_NOTIFICATION_RELATIONS: Partial<
  Record<EventName, NotificationsBehaviour>
> = {
  PostCreated: relationsOnPostCreated,
  CommentCreated: relationsOnCommentCreated,
  CommentReplyCreated: relationsOnCommentReplyCreated,

  PostShared: relationsOnPostShared,
  CommentShared: relationsOnCommentShared,
  CommentReplyShared: relationsOnCommentReplyShared,

  PostReactionCreated: relationsOnPostReactionCreated,
  PostReactionUpdated: relationsOnPostReactionUpdated,
  PostReactionDeleted: relationsOnPostReactionDeleted,
  CommentReactionCreated: relationsOnCommentReactionCreated,
  CommentReactionUpdated: relationsOnCommentReactionUpdated,
  CommentReactionDeleted: relationsOnCommentReactionDeleted,
  CommentReplyReactionCreated: relationsOnCommentReplyReactionCreated,
  CommentReplyReactionUpdated: relationsOnCommentReplyReactionUpdated,
  CommentReplyReactionDeleted: relationsOnCommentReplyReactionDeleted,

  SpaceCreated: relationsOnSpaceCreated,
  SpaceFollowed: relationsOnSpaceFollowed,
  SpaceUnfollowed: relationsOnSpaceUnfollowed,
  SpaceOwnershipTransferAccepted: relationsOnSpaceOwnershipTransferAccepted,

  AccountFollowed: relationsOnAccountFollowed,
  AccountUnfollowed: relationsOnAccountUnfollowed,

  SpaceUpdated: {},
  UserNameRegistered: {},
  UserNameUpdated: {},
  PostDeleted: {},
  PostUpdated: {},
  PostMoved: {},
  ProfileUpdated: {}
};
