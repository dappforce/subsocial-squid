import { ChainContext, Event } from '../types/support';
import {
  AccountFollowsAccountFollowedEvent,
  AccountFollowsAccountUnfollowedEvent,
  DomainsDomainMetaUpdatedEvent,
  DomainsDomainRegisteredEvent,
  PostsPostCreatedEvent,
  PostsPostMovedEvent,
  PostsPostUpdatedEvent,
  ProfilesProfileUpdatedEvent,
  ReactionsPostReactionCreatedEvent,
  ReactionsPostReactionDeletedEvent,
  ReactionsPostReactionUpdatedEvent,
  SpaceFollowsSpaceFollowedEvent,
  SpaceFollowsSpaceUnfollowedEvent,
  SpaceOwnershipSpaceOwnershipTransferAcceptedEvent,
  SpaceOwnershipSpaceOwnershipTransferCreatedEvent,
  SpacesSpaceCreatedEvent,
  SpacesSpaceUpdatedEvent
} from '../types/events';

import {
  CreatePostEventParsedData,
  UpdatePostEventParsedData,
  MovedPostEventParsedData,
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
  DomainRegisteredData,
  DomainRegisteredEventParsedData,
  DomainMetaUpdatedEventParsedData,
  SpaceOwnershipTransferCreatedEventParsedData
} from '../../../common/types';

import { UnknownVersionError } from '../../../common/errors';

import { addressSs58ToString } from '../../../common/utils';
import { getReactionKindDecorated } from './decorators';
import { toHex } from '@subsquid/util-internal-hex';

export function parsePostCreatedEventArgs(
  ctx: EventContext
): CreatePostEventParsedData {
  const event = new PostsPostCreatedEvent(ctx, ctx.event);

  if (event.isV13) {
    const { account: accountId, postId } = event.asV13;

    return {
      accountId: addressSs58ToString(accountId),
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parsePostUpdatedEventArgs(
  ctx: EventContext
): UpdatePostEventParsedData {
  const event = new PostsPostUpdatedEvent(ctx, ctx.event);

  if (event.isV13) {
    const { account: accountId, postId } = event.asV13;

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

  if (event.isV13) {
    const { account: accountId, postId, toSpace, fromSpace } = event.asV13;

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

export function parseSpaceCreatedEventArgs(
  ctx: EventContext
): CreatedSpaceEventParsedData {
  const event = new SpacesSpaceCreatedEvent(ctx, ctx.event);

  if (event.isV13) {
    const { account: accountId, spaceId } = event.asV13;

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

  if (event.isV13) {
    const { account: accountId, spaceId } = event.asV13;

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

  if (event.isV13) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV13;

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

  if (event.isV13) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV13;

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

  if (event.isV13) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = event.asV13;

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

  if (event.isV13) {
    const { account: accountId, spaceId } = event.asV13;

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

  if (event.isV13) {
    const { follower, spaceId } = event.asV13;

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

  if (event.isV13) {
    const { follower, spaceId } = event.asV13;

    return {
      followerId: addressSs58ToString(follower),
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

  if (event.isV13) {
    const { account, spaceId } = event.asV13;

    return {
      accountId: addressSs58ToString(account),
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

  if (event.isV13) {
    const { currentOwner, newOwner, spaceId } = event.asV13;

    return {
      currentOwnerId: addressSs58ToString(currentOwner),
      newOwnerId: addressSs58ToString(newOwner),
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

  if (event.isV13) {
    const { follower, account } = event.asV13;

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

  if (event.isV13) {
    const { follower, account } = event.asV13;

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
  const event = new DomainsDomainRegisteredEvent(ctx, ctx.event);

  if (event.isV7) {
    const { who, domain } = event.asV7;

    return {
      accountId: addressSs58ToString(who),
      domain
    };
  } else if (event.isV27) {
    const { who, domain, recipient } = event.asV27;

    return {
      accountId: addressSs58ToString(who),
      recipientId: addressSs58ToString(recipient),
      domain
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}

export function parseDomainMetaUpdatedEventArgs(
  ctx: EventContext
): DomainMetaUpdatedEventParsedData {
  const event = new DomainsDomainMetaUpdatedEvent(ctx, ctx.event);

  if (event.isV7) {
    const { who, domain } = event.asV7;

    return {
      accountId: addressSs58ToString(who),
      domain
    };
  } else {
    throw new UnknownVersionError(ctx.event.name);
  }
}
