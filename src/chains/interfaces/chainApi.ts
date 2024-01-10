import { DomainStorageData, EventContext, StorageForDecode } from '../../common/types';
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
  PostUnfollowedEventParsedParams
} from '@subsocial/data-hub-sdk';
import { Block, Ctx } from '../../processor';

export type ChainApi = {
  events: {
    parsePostCreatedEventParams?: EventGetter<PostCreatedEventParsedParams>;
    parsePostUpdatedEventParams?: EventGetter<PostUpdatedEventParsedParams>;
    parsePostMovedEventParams?: EventGetter<PostMovedEventParsedParams>;
    parseSpaceCreatedEventParams?: EventGetter<SpaceCreatedEventParsedParams>;
    parseSpaceUpdatedEventParams?: EventGetter<SpaceUpdatedEventParsedParams>;
    parsePostReactionCreatedEventParams?: EventGetter<PostReactionCreatedEventParsedParams>;
    parsePostReactionUpdatedEventParams?: EventGetter<PostReactionUpdatedEventParsedParams>;
    parsePostReactionDeletedEventParams?: EventGetter<PostReactionDeletedEventParsedParams>;
    parseProfileUpdatedEventParams?: EventGetter<ProfileUpdatedEventParsedParams>;
    parseSpaceFollowedEventParams?: EventGetter<SpaceFollowedEventParsedParams>;
    parseSpaceUnfollowedEventParams?: EventGetter<SpaceUnfollowedEventParsedParams>;
    parseSpaceOwnershipTransferAcceptedEventParams?: EventGetter<SpaceOwnershipTransferAcceptedEventParsedParams>;
    parseSpaceOwnershipTransferCreatedEventParams?: EventGetter<SpaceOwnershipTransferCreatedEventParsedParams>;
    parseAccountFollowedEventParams?: EventGetter<AccountFollowedEventParsedParams>;
    parseAccountUnfollowedEventParams?: EventGetter<AccountUnfollowedEventParsedParams>;
    parseDomainRegisteredEventParams?: EventGetter<DomainRegisteredEventParsedParams>;
    parseDomainMetaUpdatedEventParams?: EventGetter<DomainMetaUpdatedEventParsedParams>;
    parseEvmAddressLinkedToAccountEventParams?: EventGetter<EvmAddressLinkedToAccountEventParsedParams>;
    parseEvmAddressUnlinkedFromAccountEventParams?: EventGetter<EvmAddressUnlinkedFromAccountEventParsedParams>;
    parsePostFollowedEventParams?: EventGetter<PostFollowedEventParsedParams>;
    parsePostUnfollowedEventParams?: EventGetter<PostUnfollowedEventParsedParams>;
  };
  calls: {
    parseCreatPostCallArgs?: CallGetter<CreatePostCallParsedArgs>;
    parsePostUpdatedCallArgs?: CallGetter<UpdatePostCallParsedArgs>;
    parsePostMoveCallArgs?: CallGetter<MovePostCallParsedArgs>;
    parseSpaceCreateCallArgs?: CallGetter<CreateSpaceCallParsedArgs>;
    parseSpaceUpdateCallArgs?: CallGetter<UpdateSpaceCallParsedArgs>;
    parsePostReactionCreateCallArgs?: CallGetter<PostReactionCreateCallParsedArgs>;
    parsePostReactionUpdateCallArgs?: CallGetter<PostReactionUpdateCallParsedArgs>;
    parsePostReactionDeleteCallArgs?: CallGetter<PostReactionDeleteCallParsedArgs>;
  };
  storage: {
    getRegisteredDomainMeta?: StorageGetter<
      [string | string[]],
      (DomainStorageData | undefined)[] | DomainStorageData | undefined
    >;
  };
};

type EventGetter<R> = (ctx: EventContext) => R;
type CallGetter<R> = (ctx: EventContext) => R;
type StorageGetter<T extends Array<any>, R> = (
  ctx: StorageForDecode,
  block: Block,
  ...args: T
) => Promise<R>;

export type ChainName = 'subsocial' | 'soonsocial' | 'xsocial';

type SubsocialChainEvents =
  | 'parsePostCreatedEventParams'
  | 'parsePostUpdatedEventParams'
  | 'parsePostMovedEventParams'
  | 'parseSpaceCreatedEventParams'
  | 'parseSpaceUpdatedEventParams'
  | 'parsePostReactionCreatedEventParams'
  | 'parsePostReactionUpdatedEventParams'
  | 'parsePostReactionDeletedEventParams'
  | 'parseProfileUpdatedEventParams'
  | 'parseSpaceFollowedEventParams'
  | 'parseSpaceUnfollowedEventParams'
  | 'parseSpaceOwnershipTransferAcceptedEventParams'
  | 'parseSpaceOwnershipTransferCreatedEventParams'
  | 'parseAccountFollowedEventParams'
  | 'parseAccountUnfollowedEventParams'
  | 'parseDomainRegisteredEventParams'
  | 'parseDomainMetaUpdatedEventParams';

type SoonsocialChainEvents =
  | 'parsePostCreatedEventParams'
  | 'parsePostUpdatedEventParams'
  | 'parsePostMovedEventParams'
  | 'parseSpaceCreatedEventParams'
  | 'parseSpaceUpdatedEventParams'
  | 'parsePostReactionCreatedEventParams'
  | 'parsePostReactionUpdatedEventParams'
  | 'parsePostReactionDeletedEventParams'
  | 'parseProfileUpdatedEventParams'
  | 'parseSpaceFollowedEventParams'
  | 'parseSpaceUnfollowedEventParams'
  | 'parseSpaceOwnershipTransferAcceptedEventParams'
  | 'parseSpaceOwnershipTransferCreatedEventParams'
  | 'parseAccountFollowedEventParams'
  | 'parseAccountUnfollowedEventParams'
  | 'parseDomainRegisteredEventParams'
  | 'parseDomainMetaUpdatedEventParams';

type XSocialChainEvents =
  | 'parsePostCreatedEventParams'
  | 'parsePostUpdatedEventParams'
  | 'parsePostMovedEventParams'
  | 'parseSpaceCreatedEventParams'
  | 'parseSpaceUpdatedEventParams'
  | 'parsePostReactionCreatedEventParams'
  | 'parsePostReactionUpdatedEventParams'
  | 'parsePostReactionDeletedEventParams'
  | 'parseProfileUpdatedEventParams'
  | 'parseSpaceFollowedEventParams'
  | 'parseSpaceUnfollowedEventParams'
  | 'parseSpaceOwnershipTransferAcceptedEventParams'
  | 'parseSpaceOwnershipTransferCreatedEventParams'
  | 'parseAccountFollowedEventParams'
  | 'parseAccountUnfollowedEventParams'
  | 'parseEvmAddressLinkedToAccountEventParams'
  | 'parseEvmAddressUnlinkedFromAccountEventParams'
  | 'parsePostFollowedEventParams'
  | 'parsePostUnfollowedEventParams';

type SubsocialChainStorageCalls = 'getRegisteredDomainMeta';
type SoonsocialChainStorageCalls = 'getRegisteredDomainMeta';

type SubsocialChainCalls =
  | 'parseCreatPostCallArgs'
  | 'parsePostUpdatedCallArgs'
  | 'parsePostMoveCallArgs'
  | 'parseSpaceCreateCallArgs'
  | 'parseSpaceUpdateCallArgs'
  | 'parsePostReactionCreateCallArgs'
  | 'parsePostReactionUpdateCallArgs'
  | 'parsePostReactionDeleteCallArgs';

type SoonsocialChainCalls =
  | 'parseCreatPostCallArgs'
  | 'parsePostUpdatedCallArgs'
  | 'parsePostMoveCallArgs'
  | 'parseSpaceCreateCallArgs'
  | 'parseSpaceUpdateCallArgs'
  | 'parsePostReactionCreateCallArgs'
  | 'parsePostReactionUpdateCallArgs'
  | 'parsePostReactionDeleteCallArgs';

export type ChainApiDecorated<C> = {
  events: C extends 'subsocial'
    ? Required<Pick<ChainApi['events'], SubsocialChainEvents>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['events'], SoonsocialChainEvents>>
    : C extends 'xsocial'
    ? Required<Pick<ChainApi['events'], XSocialChainEvents>>
    : any;
  calls: C extends 'subsocial'
    ? Required<Pick<ChainApi['calls'], SubsocialChainCalls>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['calls'], SoonsocialChainCalls>>
    : C extends 'xsocial'
    ? Required<Pick<ChainApi['calls'], SoonsocialChainCalls>>
    : any;
  storage: C extends 'subsocial'
    ? Required<Pick<ChainApi['storage'], SubsocialChainStorageCalls>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['storage'], SoonsocialChainStorageCalls>>
    : C extends 'xsocial'
    ? Required<Pick<ChainApi['storage'], SoonsocialChainStorageCalls>>
    : any;
};

export type ApiDecorator = <C extends ChainName>(
  chainName: C
) => ChainApiDecorated<C>;
