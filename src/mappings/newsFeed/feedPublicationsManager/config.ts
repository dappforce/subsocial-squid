import { FeedPublicationsBehaviour } from '../types';
import { EventName } from '../../../model';

/**
 * IMPORTANT
 *
 * Feed Publications Behaviour Relations (action <-> target) meaning depends on
 * action type:
 *
 * - "add___" - if it's ADD action, it means that Feed Manager will
 *    ADD feed publication TO defined target entity(eis);
 *
 * - "delete___" - if it's DELETE action, it means that Feed Manager
 *    will DELETE all feed publications FROM target entity(eis);
 *
 */

/**
 * POST CREATED
 */
const onPostCreated: FeedPublicationsBehaviour = {
  addFeedPublicationForAccount: [
    'OriginPostOwnerFollowers',
    'OriginPostSpaceFollowers'
  ]
};

const onPostDeleted: FeedPublicationsBehaviour = {
  deleteFeedPublicationFromAccount: [
    'OriginPostOwnerFollowers',
    'OriginPostSpaceFollowers'
  ]
};

const onPostShared: FeedPublicationsBehaviour = {
  addFeedPublicationForAccount: [
    'OriginPostOwnerFollowers',
    'OriginPostSpaceFollowers'
  ]
};
const onPostMoved: FeedPublicationsBehaviour = {
  addFeedPublicationForAccount: ['OriginPostSpaceFollowers'],
  deleteFeedPublicationFromAccount: ['PreviousSpaceOriginPostSpaceFollowers']
};

/**
 * SPACE
 */

const onSpaceUnfollowed: FeedPublicationsBehaviour = {
  deleteFeedPublicationFromAccount: ['SpaceFollowerAccount']
};

/**
 * ACCOUNT
 */

const onAccountUnfollowed: FeedPublicationsBehaviour = {
  deleteFeedPublicationFromAccount: ['FollowerAccount']
};

export const EVENT_FEED_PUBLICATION_RELATIONS: Partial<
  Record<EventName, FeedPublicationsBehaviour>
> = {
  PostCreated: onPostCreated,
  PostDeleted: onPostDeleted,
  PostShared: onPostShared,
  SpaceUnfollowed: onSpaceUnfollowed,
  AccountUnfollowed: onAccountUnfollowed,
  PostMoved: onPostMoved,

  SpaceUpdated: {},
  UserNameRegistered: {},
  UserNameUpdated: {},
  PostUpdated: {},
  ProfileUpdated: {},
  CommentCreated: {},
  CommentReplyCreated: {},
  CommentShared: {},
  CommentReplyShared: {},
  PostReactionCreated: {},
  PostReactionUpdated: {},
  PostReactionDeleted: {},
  CommentReactionCreated: {},
  CommentReactionUpdated: {},
  CommentReactionDeleted: {},
  CommentReplyReactionCreated: {},
  CommentReplyReactionUpdated: {},
  CommentReplyReactionDeleted: {},
  SpaceCreated: {},
  SpaceFollowed: {},
  SpaceOwnershipTransferAccepted: {},
  SpaceOwnershipTransferCreated: {},
  AccountFollowed: {}
};
