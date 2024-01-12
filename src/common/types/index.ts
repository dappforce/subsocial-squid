import {
  Space,
  Account,
  Post,
  AccountFollowers,
  Activity,
  NewsFeed,
  Notification,
  PostFollowers,
  CommentFollowers,
  SpaceFollowers,
  Reaction,
  ReactionKind,
  EventName,
  PostKind
} from '../../model';
import { PostWithAllDetails, PostData, PostStruct } from '@subsocial/types/dto';
import { Store } from '@subsquid/typeorm-store';
import { SpacePermissionMap } from '@subsocial/api/types/dto';

import {
  AccountFollowedEventParsedParams,
  AccountUnfollowedEventParsedParams,
  SpaceCreatedEventParsedParams,
  CreatePostCallParsedArgs,
  PostCreatedEventParsedParams,
  CreateSpaceCallParsedArgs,
  DomainMetaUpdatedEventParsedParams,
  DomainRegisteredEventParsedParams,
  EvmAddressLinkedToAccountEventParsedParams,
  EvmAddressUnlinkedFromAccountEventParsedParams,
  PostMovedEventParsedParams,
  MovePostCallParsedArgs,
  PostReactionCreateCallParsedArgs,
  PostReactionCreatedEventParsedParams,
  PostReactionDeleteCallParsedArgs,
  PostReactionDeletedEventParsedParams,
  PostReactionUpdateCallParsedArgs,
  PostReactionUpdatedEventParsedParams,
  ProfileUpdatedEventParsedParams,
  SpaceFollowedEventParsedParams,
  SpaceOwnershipTransferAcceptedEventParsedParams,
  SpaceOwnershipTransferCreatedEventParsedParams,
  SpaceUnfollowedEventParsedParams,
  SpaceUpdatedEventParsedParams,
  UpdatePostCallParsedArgs,
  PostUpdatedEventParsedParams,
  UpdateSpaceCallParsedArgs,
  PostFollowedEventParsedParams,
  PostUnfollowedEventParsedParams,
  SpacePermissionsScope
} from '@subsocial/data-hub-sdk';

export {
  IpfsSpaceContentSummarized,
  IpfsPostContentSummarized,
  PostTweetDetailsIPFS
} from './post';

export { NotificationFeedTarget } from './notificationsFeed';

import { IpfsPostContentSummarized } from './post';
import { Event } from '../../processor';
import { QualifiedName, Runtime } from '@subsquid/substrate-runtime';
import { RuntimeCtx } from '../../chains/subsocial/types/support';

export type DbEntity =
  | typeof Account
  | typeof Space
  | typeof Post
  | typeof AccountFollowers
  | typeof Activity
  | typeof NewsFeed
  | typeof Notification
  | typeof PostFollowers
  | typeof CommentFollowers
  | typeof Reaction
  | typeof SpaceFollowers;

export enum SpaceCountersAction {
  PostAdded = 'PostAdded',
  PostUpdated = 'PostUpdated',
  PostDeleted = 'PostDeleted'
}

export type CallParsedData<T = undefined> = {
  name: string;
  signer: string;
  uuid?: string;
  timestamp?: number;
  args?: T;
};

export type EventParsedData<T> = {
  name: string;
  metadata: EventMetadata;
  params: T;
};

export type ParsedEventCallData<
  E extends { metadata: EventMetadata },
  C extends { signer: string }
> = {
  id: string;
  callData: C;
  eventData: E;
};

export interface EventMetadata {
  id: string; // Event ID
  blockNumber: number;
  blockHash: string;
  timestamp: Date;
  indexInBlock: number;
  name: string;
  runtime: Runtime
}

export type ContentSrcDecorated = {
  ipfsSrc: string | null;
  otherSrc: string | null;
  none: boolean;
};

export type SpaceStorageData = {
  handle: string | null;
};
export type PostStorageData = {
  ipfsContent: IpfsPostContentSummarized | null;
};
export type DomainStorageData = {
  owner: string;
  innerValue: bigint | null;
  outerValue: string | null;
};

/**
 * :::::: CREATE POST ::::::
 */

export type CreatePostCallParsedData = CallParsedData<CreatePostCallParsedArgs>;

export type PostCreatedEventParsedData =
  EventParsedData<PostCreatedEventParsedParams>;

export type PostCreatedData = ParsedEventCallData<
  PostCreatedEventParsedData,
  CreatePostCallParsedData
>;

/**
 * :::::: UPDATE POST ::::::
 */

export type UpdatePostCallParsedData = CallParsedData<UpdatePostCallParsedArgs>;

export type PostUpdatedEventParsedData =
  EventParsedData<PostUpdatedEventParsedParams>;

export type PostUpdatedData = ParsedEventCallData<
  PostUpdatedEventParsedData,
  UpdatePostCallParsedData
>;

/**
 * :::::: MOVE POST ::::::
 */

export type MovePostCallParsedData = CallParsedData<MovePostCallParsedArgs>;

export type PostMovedEventParsedData =
  EventParsedData<PostMovedEventParsedParams>;

export type PostMovedData = ParsedEventCallData<
  PostMovedEventParsedData,
  MovePostCallParsedData
>;

/**
 * :::::: POST FOLLOW ::::::
 */

export type FollowPostCallParsedData = CallParsedData;

export type PostFollowedEventParsedData =
  EventParsedData<PostFollowedEventParsedParams>;

export type PostFollowedData = ParsedEventCallData<
  PostFollowedEventParsedData,
  FollowPostCallParsedData
>;

/**
 * :::::: POST UNFOLLOW ::::::
 */

export type UnfollowPostCallParsedData = CallParsedData;

export type PostUnfollowedEventParsedData =
  EventParsedData<PostUnfollowedEventParsedParams>;

export type PostUnfollowedData = ParsedEventCallData<
  PostUnfollowedEventParsedData,
  UnfollowPostCallParsedData
>;

/**
 * :::::: CREATE SPACE ::::::
 */
export type CreateSpaceCallParsedData =
  CallParsedData<CreateSpaceCallParsedArgs>;

export type SpaceCreatedEventParsedData =
  EventParsedData<SpaceCreatedEventParsedParams>;

export type SpaceCreatedData = ParsedEventCallData<
  SpaceCreatedEventParsedData,
  CreateSpaceCallParsedData
>;

/**
 * :::::: UPDATE SPACE ::::::
 */
export type UpdateSpaceCallParsedData =
  CallParsedData<UpdateSpaceCallParsedArgs>;

export type SpaceUpdatedEventParsedData =
  EventParsedData<SpaceUpdatedEventParsedParams>;

export type SpaceUpdatedData = ParsedEventCallData<
  SpaceUpdatedEventParsedData,
  UpdateSpaceCallParsedData
>;

/**
 * :::::: POST REACTION CREAT ::::::
 */

export type CreatePostReactionCallParsedData =
  CallParsedData<PostReactionCreateCallParsedArgs>;

export type PostReactionCreatedEventParsedData =
  EventParsedData<PostReactionCreatedEventParsedParams>;

export type PostReactionCreatedData = ParsedEventCallData<
  PostReactionCreatedEventParsedData,
  CreatePostReactionCallParsedData
>;

/**
 * :::::: POST REACTION UPDATE ::::::
 */

export type UpdatePostReactionCallParsedData =
  CallParsedData<PostReactionUpdateCallParsedArgs>;

export type PostReactionUpdatedEventParsedData =
  EventParsedData<PostReactionUpdatedEventParsedParams>;

export type PostReactionUpdatedData = ParsedEventCallData<
  PostReactionUpdatedEventParsedData,
  UpdatePostReactionCallParsedData
>;

/**
 * :::::: POST REACTION DELETE ::::::
 */

export type DeletePostReactionCallParsedData =
  CallParsedData<PostReactionDeleteCallParsedArgs>;

export type PostReactionDeletedEventParsedData =
  EventParsedData<PostReactionDeletedEventParsedParams>;

export type PostReactionDeletedData = ParsedEventCallData<
  PostReactionDeletedEventParsedData,
  DeletePostReactionCallParsedData
>;

/**
 * :::::: PROFILE UPDATE ::::::
 */

export type UpdateProfileCallParsedData = CallParsedData;

export type ProfileDeletedEventParsedData =
  EventParsedData<ProfileUpdatedEventParsedParams>;

export type ProfileUpdatedData = ParsedEventCallData<
  ProfileDeletedEventParsedData,
  UpdateProfileCallParsedData
>;

/**
 * :::::: SPACE FOLLOWED ::::::
 */

export type FollowSpaceCallParsedData = CallParsedData;

export type SpaceFollowedEventParsedData =
  EventParsedData<SpaceFollowedEventParsedParams>;

export type SpaceFollowedData = ParsedEventCallData<
  SpaceFollowedEventParsedData,
  FollowSpaceCallParsedData
>;

/**
 * :::::: SPACE UNFOLLOWED ::::::
 */

export type UnfollowSpaceCallParsedData = CallParsedData;

export type SpaceUnfollowedEventParsedData =
  EventParsedData<SpaceUnfollowedEventParsedParams>;

export type SpaceUnfollowedData = ParsedEventCallData<
  SpaceUnfollowedEventParsedData,
  UnfollowSpaceCallParsedData
>;

/**
 * :::::: SPACE OWNERSHIP CREATED ::::::
 */

export type CreateSpaceOwnershipTransferCallParsedData = CallParsedData;

export type SpaceOwnershipTransferCreatedEventParsedData =
  EventParsedData<SpaceOwnershipTransferCreatedEventParsedParams>;

export type SpaceOwnershipTransferCreatedData = ParsedEventCallData<
  SpaceOwnershipTransferCreatedEventParsedData,
  CreateSpaceOwnershipTransferCallParsedData
>;

/**
 * :::::: SPACE OWNERSHIP ACCEPTED ::::::
 */

export type AcceptSpaceOwnershipTransferCallParsedData = CallParsedData;

export type SpaceOwnershipTransferAcceptedEventParsedData =
  EventParsedData<SpaceOwnershipTransferAcceptedEventParsedParams>;

export type SpaceOwnershipTransferAcceptedData = ParsedEventCallData<
  SpaceOwnershipTransferAcceptedEventParsedData,
  AcceptSpaceOwnershipTransferCallParsedData
>;

/**
 * :::::: ACCOUNT FOLLOWED ::::::
 */

export type FollowAccountCallParsedData = CallParsedData;

export type AccountFollowedEventParsedData =
  EventParsedData<AccountFollowedEventParsedParams>;

export type AccountFollowedData = ParsedEventCallData<
  AccountFollowedEventParsedData,
  FollowAccountCallParsedData
>;

/**
 * :::::: ACCOUNT UNFOLLOWED ::::::
 */

export type UnfollowAccountCallParsedData = CallParsedData;

export type AccountUnfollowedEventParsedData =
  EventParsedData<AccountUnfollowedEventParsedParams>;

export type AccountUnfollowedData = ParsedEventCallData<
  AccountUnfollowedEventParsedData,
  UnfollowAccountCallParsedData
>;
/**
 * :::::: DOMAIN REGISTERED ::::::
 */

export type RegisterDomainCallParsedData = CallParsedData;

export type DomainRegisteredEventParsedData =
  EventParsedData<DomainRegisteredEventParsedParams>;

export type DomainRegisteredData = ParsedEventCallData<
  DomainRegisteredEventParsedData,
  RegisterDomainCallParsedData
>;

/**
 * :::::: DOMAIN META UPDATED ::::::
 */

export type UpdateDomainMetaCallParsedData = CallParsedData;

export type DomainMetaUpdatedEventParsedData =
  EventParsedData<DomainMetaUpdatedEventParsedParams>;

export type DomainMetaUpdatedData = ParsedEventCallData<
  DomainMetaUpdatedEventParsedData,
  UpdateDomainMetaCallParsedData
>;

/**
 * :::::: ETH ACCOUNT LINKED TO ACCOUNT ::::::
 */

export type LinkEvmAddressToAccountCallParsedData = CallParsedData;

export type EvmAddressLinkedToAccountEventParsedData =
  EventParsedData<EvmAddressLinkedToAccountEventParsedParams>;

export type EvmAddressLinkedToAccountData = ParsedEventCallData<
  EvmAddressLinkedToAccountEventParsedData,
  LinkEvmAddressToAccountCallParsedData
>;

/**
 * :::::: ETH ACCOUNT UNLINKED FROM ACCOUNT ::::::
 */

export type UnlinkEvmAddressFromAccountCallParsedData = CallParsedData;

export type EvmAddressUnlinkedFromAccountEventParsedData =
  EventParsedData<EvmAddressUnlinkedFromAccountEventParsedParams>;

export type EvmAddressUnlinkedFromAccountData = ParsedEventCallData<
  EvmAddressUnlinkedFromAccountEventParsedData,
  UnlinkEvmAddressFromAccountCallParsedData
>;

/**
 * MISC
 */

export type EventId = string;

export type ParsedEventsData =
  | PostCreatedData
  | PostUpdatedData
  | PostMovedData
  | PostFollowedData
  | PostUnfollowedData
  | SpaceCreatedData
  | SpaceUpdatedData
  | SpaceOwnershipTransferAcceptedData
  | SpaceOwnershipTransferCreatedData
  | PostReactionCreatedData
  | PostReactionUpdatedData
  | PostReactionDeletedData
  | ProfileUpdatedData
  | SpaceFollowedData
  | SpaceUnfollowedData
  | AccountFollowedData
  | AccountUnfollowedData
  | DomainRegisteredData
  | DomainMetaUpdatedData
  | EvmAddressLinkedToAccountData
  | EvmAddressUnlinkedFromAccountData;

export type ParsedEventsDataMap = Map<
  EventName,
  Map<EventId, ParsedEventsData>
>;

export type PostWithDetails = Omit<PostWithAllDetails, 'post'> & {
  post: Omit<PostData, 'struct'> & {
    struct: PostStruct & {
      rootPostId: string;
      parentId: string;
    };
  };
};

export type EventContext = Event;

export interface EventForDecode {
  block: RuntimeCtx;
  name: QualifiedName;
  args: unknown;
}

export interface CallForDecode {
  block: RuntimeCtx;
  name: QualifiedName;
  args: unknown;
}

export interface StorageForDecode {
  _runtime: Runtime;
}

export type HasTitleOrBody = {
  title?: string;
  body: string;
};

// import {
//   Space,
//   Account,
//   Post,
//   AccountFollowers,
//   Activity,
//   NewsFeed,
//   Notification,
//   PostFollowers,
//   CommentFollowers,
//   SpaceFollowers,
//   Reaction,
//   ReactionKind,
//   EventName,
//   PostKind
// } from '../../model';
// import { PostWithAllDetails, PostData, PostStruct } from '@subsocial/types/dto';
// import { Store } from '@subsquid/typeorm-store';
// import { EventHandlerContext } from '@subsquid/substrate-processor';
// import { SpacePermissionMap } from '@subsocial/api/types/dto';
//
// export {
//   IpfsSpaceContentSummarized,
//   IpfsPostContentSummarized,
//   PostTweetDetailsIPFS
// } from './post';
//
// export { NotificationFeedTarget } from './notificationsFeed';
//
// import { IpfsPostContentSummarized } from './post';
//
// export type DbEntity =
//   | typeof Account
//   | typeof Space
//   | typeof Post
//   | typeof AccountFollowers
//   | typeof Activity
//   | typeof NewsFeed
//   | typeof Notification
//   | typeof PostFollowers
//   | typeof CommentFollowers
//   | typeof Reaction
//   | typeof SpaceFollowers;
//
// export enum SpaceCountersAction {
//   PostAdded = 'PostAdded',
//   PostUpdated = 'PostUpdated',
//   PostDeleted = 'PostDeleted'
// }
//
// export interface EventData {
//   id: string; // Event ID
//   blockNumber: number;
//   blockHash: string;
//   timestamp: Date;
//   indexInBlock: number;
//   name: string;
// }
//
// export type ContentSrcDecorated = {
//   ipfsSrc: string | null;
//   otherSrc: string | null;
//   none: boolean;
// };
//
// export type SpaceStorageData = {
//   handle: string | null;
// };
// export type PostStorageData = {
//   ipfsContent: IpfsPostContentSummarized | null;
// };
// export type DomainStorageData = {
//   owner: Uint8Array;
//   innerValue: bigint | null;
//   outerValue: Uint8Array | null;
// };
//
// /**
//  * :::::: CREATE POST ::::::
//  */
// export interface CreatePostCallParsedData extends ContentSrcDecorated {
//   forced: boolean;
//   forcedData: {
//     account: string;
//     block: number;
//     time: Date;
//     owner: string;
//     hidden: boolean;
//   } | null;
//   postKind: PostKind;
//   originalPost: string | null;
//   parentPostId: string | null;
//   rootPostId: string | null;
//   spaceId: string | null | undefined;
// }
// export interface CreatePostEventParsedData {
//   accountId: string;
//   postId: string;
// }
//
// export type PostCreatedData = EventData &
//   CreatePostCallParsedData &
//   CreatePostEventParsedData;
//
// /**
//  * :::::: UPDATE POST ::::::
//  */
//
// export interface UpdatePostCallParsedData extends ContentSrcDecorated {
//   spaceId: string | null | undefined;
//   hidden: boolean | null | undefined;
// }
//
// export interface UpdatePostEventParsedData {
//   accountId: string;
//   postId: string;
// }
//
// export type PostUpdatedData = EventData &
//   UpdatePostCallParsedData &
//   UpdatePostEventParsedData;
//
// /**
//  * :::::: MOVE POST ::::::
//  */
//
// export interface MovePostCallParsedData {
//   postId: string;
//   toSpace: string | null | undefined;
// }
//
// export interface MovedPostEventParsedData {
//   accountId: string;
//   postId: string;
//   fromSpace: string | null | undefined;
//   toSpace: string | null | undefined;
// }
//
// export type PostMovedData = EventData &
//   MovePostCallParsedData &
//   MovedPostEventParsedData;
//
// /**
//  * :::::: POST FOLLOW ::::::
//  */
// export interface FollowPostEventParsedData {
//   followerId: string;
//   postId: string;
// }
// export type PostFollowedData = EventData & FollowPostEventParsedData;
//
// /**
//  * :::::: POST UNFOLLOW ::::::
//  */
// export interface UnfollowPostEventParsedData {
//   followerId: string;
//   postId: string;
// }
// export type PostUnfollowedData = EventData & UnfollowPostEventParsedData;
//
// /**
//  * :::::: CREATE SPACE ::::::
//  */
// export interface SpacePermissionsScope {
//   none: Required<SpacePermissionMap>;
//   everyone: Required<SpacePermissionMap>;
//   follower: Required<SpacePermissionMap>;
//   spaceOwner: Required<SpacePermissionMap>;
// }
//
// export interface CreateSpaceCallParsedData extends ContentSrcDecorated {
//   permissions: SpacePermissionsScope;
//   forced: boolean;
//   forcedData: {
//     account: string;
//     block: number;
//     time: Date;
//     owner: string;
//     hidden: boolean;
//   } | null;
// }
// export interface CreatedSpaceEventParsedData {
//   accountId: string;
//   spaceId: string;
// }
//
// export type SpaceCreatedData = EventData &
//   CreateSpaceCallParsedData &
//   CreatedSpaceEventParsedData;
//
// /**
//  * :::::: UPDATE SPACE ::::::
//  */
//
// export interface UpdateSpaceCallParsedData extends ContentSrcDecorated {
//   permissions: SpacePermissionsScope;
//   hidden: boolean;
// }
// export interface UpdatedSpaceEventParsedData {
//   accountId: string;
//   spaceId: string;
// }
//
// export type SpaceUpdatedData = EventData &
//   UpdateSpaceCallParsedData &
//   UpdatedSpaceEventParsedData;
//
// /**
//  * :::::: POST REACTION CREAT ::::::
//  */
//
// export interface PostReactionCreateCallParsedData {
//   postId: string;
//   reactionKind: ReactionKind;
//   forced: boolean;
//   forcedData: {
//     account: string;
//     block: number;
//     time: Date;
//   } | null;
// }
//
// export interface PostReactionCreatedEventParsedData {
//   accountId: string;
//   postId: string;
//   reactionId: string;
//   reactionKind: ReactionKind;
// }
//
// export type PostReactionCreatedData = EventData &
//   PostReactionCreateCallParsedData &
//   PostReactionCreatedEventParsedData;
//
// /**
//  * :::::: POST REACTION UPDATE ::::::
//  */
//
// export interface PostReactionUpdateCallParsedData {
//   postId: string;
//   reactionId: string;
//   newReactionKind: ReactionKind;
// }
//
// export interface PostReactionUpdatedEventParsedData {
//   accountId: string;
//   postId: string;
//   reactionId: string;
//   newReactionKind: ReactionKind;
// }
//
// export type PostReactionUpdatedData = EventData &
//   PostReactionUpdateCallParsedData &
//   PostReactionUpdatedEventParsedData;
//
// /**
//  * :::::: POST REACTION DELETE ::::::
//  */
//
// export interface PostReactionDeleteCallParsedData {
//   postId: string;
//   reactionId: string;
//   forced: boolean;
//   forcedData: {
//     account: string;
//   } | null;
// }
//
// export interface PostReactionDeletedEventParsedData {
//   accountId: string;
//   postId: string;
//   reactionId: string;
//   reactionKind: ReactionKind;
// }
//
// export type PostReactionDeletedData = EventData &
//   PostReactionDeleteCallParsedData &
//   PostReactionDeletedEventParsedData;
//
// /**
//  * :::::: PROFILE UPDATE ::::::
//  */
//
// export interface ProfileUpdatedEventParsedData {
//   accountId: string;
//   spaceId: string | null | undefined;
// }
//
// export type ProfileUpdatedData = EventData & ProfileUpdatedEventParsedData;
//
// /**
//  * :::::: SPACE FOLLOWED ::::::
//  */
//
// export interface SpaceFollowedEventParsedData {
//   followerId: string;
//   spaceId: string;
// }
//
// export type SpaceFollowedData = EventData & SpaceFollowedEventParsedData;
//
// /**
//  * :::::: SPACE UNFOLLOWED ::::::
//  */
//
// export type SpaceUnfollowedEventParsedData = SpaceFollowedEventParsedData;
//
// export type SpaceUnfollowedData = SpaceFollowedData;
//
// /**
//  * :::::: SPACE OWNERSHIP CREATED ::::::
//  */
//
// export interface SpaceOwnershipTransferCreatedEventParsedData {
//   currentOwnerId: string;
//   newOwnerId: string;
//   spaceId: string;
// }
//
// export type SpaceOwnershipTransferCreatedData = EventData &
//   SpaceOwnershipTransferCreatedEventParsedData;
//
// /**
//  * :::::: SPACE OWNERSHIP ACCEPTED ::::::
//  */
//
// export interface SpaceOwnershipTransferAcceptedEventParsedData {
//   accountId: string;
//   spaceId: string;
// }
//
// export type SpaceOwnershipTransferAcceptedData = EventData &
//   SpaceOwnershipTransferAcceptedEventParsedData;
//
// /**
//  * :::::: ACCOUNT FOLLOWED ::::::
//  */
//
// export interface AccountFollowedEventParsedData {
//   followerId: string;
//   accountId: string;
// }
//
// export type AccountFollowedData = EventData & AccountFollowedEventParsedData;
//
// /**
//  * :::::: ACCOUNT UNFOLLOWED ::::::
//  */
//
// export type AccountUnfollowedEventParsedData = AccountFollowedEventParsedData;
//
// export type AccountUnfollowedData = AccountFollowedData;
//
// /**
//  * :::::: DOMAIN REGISTERED ::::::
//  */
//
// export interface DomainRegisteredEventParsedData {
//   accountId: string;
//   domain: Uint8Array;
//   recipientId?: string;
// }
//
// export type DomainRegisteredData = EventData & DomainRegisteredEventParsedData;
//
// /**
//  * :::::: DOMAIN META UPDATED ::::::
//  */
//
// export interface DomainMetaUpdatedEventParsedData {
//   accountId: string;
//   domain: Uint8Array;
// }
//
// export type DomainMetaUpdatedData = EventData &
//   DomainMetaUpdatedEventParsedData;
//
// /**
//  * :::::: ETH ACCOUNT LINKED TO ACCOUNT ::::::
//  */
//
// export interface EvmAddressLinkedToAccountEventParsedData {
//   substrateAccountId: string;
//   ethereumAccountId: string;
// }
//
// export type EvmAddressLinkedToAccountData = EventData &
//   EvmAddressLinkedToAccountEventParsedData;
//
// /**
//  * :::::: ETH ACCOUNT UNLINKED FROM ACCOUNT ::::::
//  */
//
// export interface EvmAddressUnlinkedFromAccountEventParsedData {
//   substrateAccountId: string;
//   ethereumAccountId: string;
// }
//
// export type EvmAddressUnlinkedFromAccountData = EventData &
//   EvmAddressUnlinkedFromAccountEventParsedData;
//
// /**
//  * MISC
//  */
//
// export type EventId = string;
//
// export type ParsedEventsData =
//   | PostCreatedData
//   | PostUpdatedData
//   | PostMovedData
//   | PostFollowedData
//   | PostUnfollowedData
//   | SpaceCreatedData
//   | SpaceUpdatedData
//   | SpaceOwnershipTransferAcceptedData
//   | SpaceOwnershipTransferCreatedData
//   | PostReactionCreatedData
//   | PostReactionUpdatedData
//   | PostReactionDeletedData
//   | ProfileUpdatedData
//   | SpaceFollowedData
//   | SpaceUnfollowedData
//   | AccountFollowedData
//   | AccountUnfollowedData
//   | DomainRegisteredData
//   | DomainMetaUpdatedData
//   | EvmAddressLinkedToAccountData
//   | EvmAddressUnlinkedFromAccountData;
//
// export type ParsedEventsDataMap = Map<
//   EventName,
//   Map<EventId, ParsedEventsData>
// >;
//
// export type PostWithDetails = Omit<PostWithAllDetails, 'post'> & {
//   post: Omit<PostData, 'struct'> & {
//     struct: PostStruct & {
//       rootPostId: string;
//       parentId: string;
//     };
//   };
// };
//
// export type EventContext = EventHandlerContext<
//   Store,
//   { event: { args: true; call: true; indexInBlock: true } }
// >;
//
