import { ChainContext, Event } from '../types/support';
import { toHex } from '@subsquid/util-internal-hex';
import {
  AccountFollowsAccountFollowedEvent,
  AccountFollowsAccountUnfollowedEvent,
  PostsPostCreatedEvent,
  PostsPostMovedEvent,
  PostsPostUpdatedEvent,
  PostFollowsPostFollowedEvent,
  PostFollowsPostUnfollowedEvent,
  ProfilesProfileUpdatedEvent,
  ReactionsPostReactionCreatedEvent,
  ReactionsPostReactionDeletedEvent,
  ReactionsPostReactionUpdatedEvent,
  SpaceFollowsSpaceFollowedEvent,
  SpaceFollowsSpaceUnfollowedEvent,
  SpaceOwnershipSpaceOwnershipTransferAcceptedEvent,
  SpacesSpaceCreatedEvent,
  SpacesSpaceUpdatedEvent,
  SpaceOwnershipSpaceOwnershipTransferCreatedEvent,
  EvmAccountsEvmAddressLinkedToAccountEvent,
  EvmAccountsEvmAddressUnlinkedFromAccountEvent
} from '../types/events';

import {
  CreatePostEventParsedData,
  UpdatePostEventParsedData,
  MovedPostEventParsedData,
  FollowPostEventParsedData,
  UnfollowPostEventParsedData,
  EventContext,
  SpaceCreatedData,
  CreatedSpaceEventParsedData,
  UpdatedSpaceEventParsedData,
  PostReactionCreatedEventParsedData,
  PostReactionUpdatedEventParsedData,
  PostReactionDeletedEventParsedData,
  ProfileUpdatedEventParsedData,
  SpaceUnfollowedEventParsedData,
  SpaceFollowedEventParsedData,
  AccountFollowedEventParsedData,
  AccountUnfollowedEventParsedData,
  SpaceOwnershipTransferAcceptedEventParsedData,
  DomainRegisteredEventParsedData,
  DomainMetaUpdatedEventParsedData,
  SpaceOwnershipTransferCreatedEventParsedData,
  EvmAddressLinkedToAccountData,
  EvmAddressUnlinkedFromAccountData,
  EvmAddressLinkedToAccountEventParsedData,
  EvmAddressUnlinkedFromAccountEventParsedData
} from '../../../common/types';

import { UnknownVersionError } from '../../../common/errors';

import { addressSs58ToString } from '../../../common/utils';
import { getReactionKindDecorated } from './decorators';

export function parsePostCreatedEventArgs(
  ctx: EventContext
): CreatePostEventParsedData {
  const event = new PostsPostCreatedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { account: accountId, postId } = event.asV100;

    const response: CreatePostEventParsedData = {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString()
    };

    return response;
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostUpdatedEventArgs(
  ctx: EventContext
): UpdatePostEventParsedData {
  const event = new PostsPostUpdatedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { account: accountId, postId } = event.asV100;
    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostMovedEventArgs(
  ctx: EventContext
): MovedPostEventParsedData {
  const event = new PostsPostMovedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { account: accountId, postId, toSpace, fromSpace } = event.asV100;

    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString(),
      toSpace:
        toSpace !== null && toSpace !== undefined
          ? toSpace.toString()
          : toSpace,
      fromSpace:
        fromSpace !== null && fromSpace !== undefined
          ? fromSpace.toString()
          : fromSpace
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostFollowedEventArgs(
  ctx: EventContext
): FollowPostEventParsedData {
  const event = new PostFollowsPostFollowedEvent(ctx, ctx.event);

  if (event.isV107) {
    const { follower: followerId, postId } = event.asV107;

    return {
      followerId: addressSs58ToString(followerId),
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostUnfollowedEventArgs(
  ctx: EventContext
): UnfollowPostEventParsedData {
  const event = new PostFollowsPostUnfollowedEvent(ctx, ctx.event);

  if (event.isV107) {
    const { follower: followerId, postId } = event.asV107;

    return {
      followerId: addressSs58ToString(followerId),
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceCreatedEventArgs(
  ctx: EventContext
): CreatedSpaceEventParsedData {
  const event = new SpacesSpaceCreatedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { account: accountId, spaceId } = event.asV100;

    return {
      accountId: addressSs58ToString(accountId),
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceUpdatedEventArgs(
  ctx: EventContext
): UpdatedSpaceEventParsedData {
  const event = new SpacesSpaceUpdatedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { account: accountId, spaceId } = event.asV100;

    return {
      accountId: addressSs58ToString(accountId),
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostReactionCreatedEventArgs(
  ctx: EventContext
): PostReactionCreatedEventParsedData {
  const event = new ReactionsPostReactionCreatedEvent(ctx, ctx.event);

  if (event.isV102) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV102;

    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      reactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostReactionUpdatedEventArgs(
  ctx: EventContext
): PostReactionUpdatedEventParsedData {
  const event = new ReactionsPostReactionUpdatedEvent(ctx, ctx.event);

  if (event.isV102) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV102;

    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      newReactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostReactionDeletedEventArgs(
  ctx: EventContext
): PostReactionDeletedEventParsedData {
  const event = new ReactionsPostReactionDeletedEvent(ctx, ctx.event);

  if (event.isV102) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV102;

    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      reactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseProfileUpdatedEventArgs(
  ctx: EventContext
): ProfileUpdatedEventParsedData {
  const event = new ProfilesProfileUpdatedEvent(ctx, ctx.event);

  if (event.isV102) {
    const { account: accountId, spaceId } = event.asV102;

    return {
      accountId: addressSs58ToString(accountId),
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceFollowedEventArgs(
  ctx: EventContext
): SpaceFollowedEventParsedData {
  const event = new SpaceFollowsSpaceFollowedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { follower, spaceId } = event.asV100;

    return {
      followerId: addressSs58ToString(follower),
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceUnfollowedEventArgs(
  ctx: EventContext
): SpaceUnfollowedEventParsedData {
  const event = new SpaceFollowsSpaceUnfollowedEvent(ctx, ctx.event);

  if (event.isV100) {
    const { follower, spaceId } = event.asV100;

    return {
      followerId: addressSs58ToString(follower),
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceOwnershipTransferCreatedEventArgs(
  ctx: EventContext
): SpaceOwnershipTransferCreatedEventParsedData {
  const event = new SpaceOwnershipSpaceOwnershipTransferCreatedEvent(
    ctx,
    ctx.event
  );

  if (event.isV102) {
    const { currentOwner, newOwner, spaceId } = event.asV102;

    return {
      currentOwnerId: addressSs58ToString(currentOwner),
      newOwnerId: addressSs58ToString(newOwner),
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseSpaceOwnershipTransferAcceptedEventArgs(
  ctx: EventContext
): SpaceOwnershipTransferAcceptedEventParsedData {
  const event = new SpaceOwnershipSpaceOwnershipTransferAcceptedEvent(
    ctx,
    ctx.event
  );

  if (event.isV102) {
    const { account, spaceId } = event.asV102;

    return {
      accountId: addressSs58ToString(account),
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseAccountFollowedEventArgs(
  ctx: EventContext
): AccountFollowedEventParsedData {
  const event = new AccountFollowsAccountFollowedEvent(ctx, ctx.event);

  if (event.isV102) {
    const { follower, account } = event.asV102;

    return {
      followerId: addressSs58ToString(follower),
      accountId: addressSs58ToString(account)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseAccountUnfollowedEventArgs(
  ctx: EventContext
): AccountUnfollowedEventParsedData {
  const event = new AccountFollowsAccountUnfollowedEvent(ctx, ctx.event);

  if (event.isV102) {
    const { follower, account } = event.asV102;

    return {
      followerId: addressSs58ToString(follower),
      accountId: addressSs58ToString(account)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseDomainRegisteredEventArgs(
  ctx: EventContext
): DomainRegisteredEventParsedData {
  return {
    accountId: '',
    domain: new Uint8Array(8)
  };
}

export function parseDomainMetaUpdatedEventArgs(
  ctx: EventContext
): DomainMetaUpdatedEventParsedData {
  return {
    accountId: '',
    domain: new Uint8Array(8)
  };
}

export function parseEvmAddressLinkedToAccountEventArgs(
  ctx: EventContext
): EvmAddressLinkedToAccountEventParsedData {
  const event = new EvmAccountsEvmAddressLinkedToAccountEvent(ctx, ctx.event);

  if (event.isV104) {
    const { substrate, ethereum } = event.asV104;

    return {
      substrateAccountId: addressSs58ToString(substrate),
      ethereumAccountId: toHex(ethereum)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}
export function parseEvmAddressUnlinkedFromAccountEventArgs(
  ctx: EventContext
): EvmAddressUnlinkedFromAccountEventParsedData {
  const event = new EvmAccountsEvmAddressUnlinkedFromAccountEvent(
    ctx,
    ctx.event
  );

  if (event.isV108) {
    const { substrate, ethereum } = event.asV108;

    return {
      substrateAccountId: addressSs58ToString(substrate),
      ethereumAccountId: toHex(ethereum)
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}
