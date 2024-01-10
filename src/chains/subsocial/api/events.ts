import { events } from '../types';

import {
  PostCreatedEventParsedParams,
  PostUpdatedEventParsedParams,
  PostMovedEventParsedParams,
  SpaceCreatedEventParsedParams,
  SpaceUpdatedEventParsedParams,
  PostReactionCreatedEventParsedParams,
  PostReactionUpdatedEventParsedParams,
  PostReactionDeletedEventParsedParams,
  ProfileUpdatedEventParsedParams,
  SpaceFollowedEventParsedParams,
  SpaceUnfollowedEventParsedParams,
  SpaceOwnershipTransferAcceptedEventParsedParams,
  SpaceOwnershipTransferCreatedEventParsedParams,
  AccountFollowedEventParsedParams,
  AccountUnfollowedEventParsedParams,
  DomainRegisteredEventParsedParams,
  DomainMetaUpdatedEventParsedParams
} from '@subsocial/data-hub-sdk';
import { EventForDecode } from '../../../common/types';

import { UnknownVersionError } from '../../../common/errors';

import { getReactionKindDecorated } from './decorators';
import { toSubsocialAddress } from '@subsocial/utils';
import { stringToU8a } from '@polkadot/util';

export function parsePostCreatedEventParams(
  ctx: EventForDecode
): PostCreatedEventParsedParams {
  if (events.posts.postCreated.v13.is(ctx)) {
    const { account: accountId, postId } =
      events.posts.postCreated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostUpdatedEventParams(
  ctx: EventForDecode
): PostUpdatedEventParsedParams {
  if (events.posts.postUpdated.v13.is(ctx)) {
    const { account: accountId, postId } =
      events.posts.postUpdated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostMovedEventParams(
  ctx: EventForDecode
): PostMovedEventParsedParams {
  if (events.posts.postMoved.v13.is(ctx)) {
    const {
      account: accountId,
      postId,
      toSpace,
      fromSpace
    } = events.posts.postMoved.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
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
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceCreatedEventParams(
  ctx: EventForDecode
): SpaceCreatedEventParsedParams {
  if (events.spaces.spaceCreated.v13.is(ctx)) {
    const { account: accountId, spaceId } =
      events.spaces.spaceCreated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceUpdatedEventParams(
  ctx: EventForDecode
): SpaceUpdatedEventParsedParams {
  if (events.spaces.spaceUpdated.v13.is(ctx)) {
    const { account: accountId, spaceId } =
      events.spaces.spaceUpdated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostReactionCreatedEventParams(
  ctx: EventForDecode
): PostReactionCreatedEventParsedParams {
  if (events.reactions.postReactionCreated.v13.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionCreated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      reactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostReactionUpdatedEventParams(
  ctx: EventForDecode
): PostReactionUpdatedEventParsedParams {
  if (events.reactions.postReactionUpdated.v13.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionUpdated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      newReactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostReactionDeletedEventParams(
  ctx: EventForDecode
): PostReactionDeletedEventParsedParams {
  if (events.reactions.postReactionDeleted.v13.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionDeleted.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString(),
      reactionId: reactionId.toString(),
      reactionKind: getReactionKindDecorated(reactionKind)
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseProfileUpdatedEventParams(
  ctx: EventForDecode
): ProfileUpdatedEventParsedParams {
  if (events.profiles.profileUpdated.v13.is(ctx)) {
    const { account: accountId, spaceId } =
      events.profiles.profileUpdated.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(accountId)!,
      spaceId:
        spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceFollowedEventParams(
  ctx: EventForDecode
): SpaceFollowedEventParsedParams {
  if (events.spaceFollows.spaceFollowed.v13.is(ctx)) {
    const { follower, spaceId } =
      events.spaceFollows.spaceFollowed.v13.decode(ctx);

    return {
      followerId: toSubsocialAddress(follower)!,
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceUnfollowedEventParams(
  ctx: EventForDecode
): SpaceUnfollowedEventParsedParams {
  if (events.spaceFollows.spaceUnfollowed.v13.is(ctx)) {
    const { follower, spaceId } =
      events.spaceFollows.spaceUnfollowed.v13.decode(ctx);

    return {
      followerId: toSubsocialAddress(follower)!,
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceOwnershipTransferCreatedEventParams(
  ctx: EventForDecode
): SpaceOwnershipTransferCreatedEventParsedParams {
  if (events.spaceOwnership.spaceOwnershipTransferCreated.v13.is(ctx)) {
    const { currentOwner, newOwner, spaceId } =
      events.spaceOwnership.spaceOwnershipTransferCreated.v13.decode(ctx);

    return {
      currentOwnerId: toSubsocialAddress(currentOwner)!,
      newOwnerId: toSubsocialAddress(newOwner)!,
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceOwnershipTransferAcceptedEventParams(
  ctx: EventForDecode
): SpaceOwnershipTransferAcceptedEventParsedParams {
  if (events.spaceOwnership.spaceOwnershipTransferAccepted.v13.is(ctx)) {
    const { account, spaceId } =
      events.spaceOwnership.spaceOwnershipTransferAccepted.v13.decode(ctx);

    return {
      accountId: toSubsocialAddress(account)!,
      spaceId: spaceId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseAccountFollowedEventParams(
  ctx: EventForDecode
): AccountFollowedEventParsedParams {
  if (events.accountFollows.accountFollowed.v13.is(ctx)) {
    const { follower, account } =
      events.accountFollows.accountFollowed.v13.decode(ctx);

    return {
      followerId: toSubsocialAddress(follower)!,
      accountId: toSubsocialAddress(account)!
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseAccountUnfollowedEventParams(
  ctx: EventForDecode
): AccountUnfollowedEventParsedParams {
  if (events.accountFollows.accountUnfollowed.v13.is(ctx)) {
    const { follower, account } =
      events.accountFollows.accountUnfollowed.v13.decode(ctx);

    return {
      followerId: toSubsocialAddress(follower)!,
      accountId: toSubsocialAddress(account)!
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseDomainRegisteredEventParams(
  ctx: EventForDecode
): DomainRegisteredEventParsedParams {
  if (events.domains.domainRegistered.v7.is(ctx)) {
    const { who, domain } = events.domains.domainRegistered.v7.decode(ctx);

    return {
      accountId: toSubsocialAddress(who)!,
      domain: stringToU8a(domain)
    };
  } else if (events.domains.domainRegistered.v27.is(ctx)) {
    const { who, domain, recipient } =
      events.domains.domainRegistered.v27.decode(ctx);

    return {
      accountId: toSubsocialAddress(who)!,
      recipientId: toSubsocialAddress(recipient)!,
      domain: stringToU8a(domain)
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseDomainMetaUpdatedEventParams(
  ctx: EventForDecode
): DomainMetaUpdatedEventParsedParams {
  if (events.domains.domainMetaUpdated.v7.is(ctx)) {
    const { who, domain } = events.domains.domainMetaUpdated.v7.decode(ctx);

    return {
      accountId: toSubsocialAddress(who)!,
      domain: stringToU8a(domain)
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}
