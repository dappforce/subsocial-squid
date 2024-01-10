import { toHex } from '@subsquid/util-internal-hex';

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
  SpaceUnfollowedEventParsedParams,
  SpaceFollowedEventParsedParams,
  AccountFollowedEventParsedParams,
  AccountUnfollowedEventParsedParams,
  SpaceOwnershipTransferAcceptedEventParsedParams,
  DomainRegisteredEventParsedParams,
  DomainMetaUpdatedEventParsedParams,
  SpaceOwnershipTransferCreatedEventParsedParams,
  EvmAddressLinkedToAccountEventParsedParams,
  EvmAddressUnlinkedFromAccountEventParsedParams,
  PostFollowedEventParsedParams,
  PostUnfollowedEventParsedParams
} from '@subsocial/data-hub-sdk';
import { events } from '../types';

import { EventContext, EventForDecode } from '../../../common/types';

import { UnknownVersionError } from '../../../common/errors';

import { addressSs58ToString } from '../../../common/utils';
import { getReactionKindDecorated } from './decorators';
import { toSubsocialAddress } from '@subsocial/utils';

export function parsePostCreatedEventParams(
  ctx: EventForDecode
): PostCreatedEventParsedParams {
  if (events.posts.postCreated.v100.is(ctx)) {
    const { account: accountId, postId } =
      events.posts.postCreated.v100.decode(ctx);

    const response: PostCreatedEventParsedParams = {
      accountId: toSubsocialAddress(accountId)!,
      postId: postId.toString()
    };

    return response;
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostUpdatedEventParams(
  ctx: EventForDecode
): PostUpdatedEventParsedParams {
  if (events.posts.postUpdated.v100.is(ctx)) {
    const { account: accountId, postId } =
      events.posts.postUpdated.v100.decode(ctx);
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
  if (events.posts.postMoved.v100.is(ctx)) {
    const {
      account: accountId,
      postId,
      toSpace,
      fromSpace
    } = events.posts.postMoved.v100.decode(ctx);

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

export function parsePostFollowedEventParams(
  ctx: EventForDecode
): PostFollowedEventParsedParams {
  if (events.postFollows.postFollowed.v107.is(ctx)) {
    const { follower: followerId, postId } =
      events.postFollows.postFollowed.v107.decode(ctx);

    return {
      followerId: toSubsocialAddress(followerId)!,
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parsePostUnfollowedEventParams(
  ctx: EventForDecode
): PostUnfollowedEventParsedParams {
  if (events.postFollows.postUnfollowed.v107.is(ctx)) {
    const { follower: followerId, postId } =
      events.postFollows.postUnfollowed.v107.decode(ctx);

    return {
      followerId: toSubsocialAddress(followerId)!,
      postId: postId.toString()
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}

export function parseSpaceCreatedEventParams(
  ctx: EventForDecode
): SpaceCreatedEventParsedParams {
  if (events.spaces.spaceCreated.v100.is(ctx)) {
    const { account: accountId, spaceId } =
      events.spaces.spaceCreated.v100.decode(ctx);

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
  if (events.spaces.spaceUpdated.v100.is(ctx)) {
    const { account: accountId, spaceId } =
      events.spaces.spaceUpdated.v100.decode(ctx);

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
  if (events.reactions.postReactionCreated.v102.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionCreated.v102.decode(ctx);

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
  if (events.reactions.postReactionUpdated.v102.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionUpdated.v102.decode(ctx);

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
  if (events.reactions.postReactionDeleted.v102.is(ctx)) {
    const {
      account: accountId,
      postId,
      reactionId,
      reactionKind
    } = events.reactions.postReactionDeleted.v102.decode(ctx);

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
  if (events.profiles.profileUpdated.v102.is(ctx)) {
    const { account: accountId, spaceId } =
      events.profiles.profileUpdated.v102.decode(ctx);

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
  if (events.spaceFollows.spaceFollowed.v100.is(ctx)) {
    const { follower, spaceId } =
      events.spaceFollows.spaceFollowed.v100.decode(ctx);

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
  if (events.spaceFollows.spaceUnfollowed.v100.is(ctx)) {
    const { follower, spaceId } =
      events.spaceFollows.spaceUnfollowed.v100.decode(ctx);

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
  if (events.spaceOwnership.spaceOwnershipTransferCreated.v102.is(ctx)) {
    const { currentOwner, newOwner, spaceId } =
      events.spaceOwnership.spaceOwnershipTransferCreated.v102.decode(ctx);

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
  if (events.spaceOwnership.spaceOwnershipTransferAccepted.v102.is(ctx)) {
    const { account, spaceId } =
      events.spaceOwnership.spaceOwnershipTransferAccepted.v102.decode(ctx);

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
  if (events.accountFollows.accountFollowed.v102.is(ctx)) {
    const { follower, account } =
      events.accountFollows.accountFollowed.v102.decode(ctx);

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
  if (events.accountFollows.accountUnfollowed.v102.is(ctx)) {
    const { follower, account } =
      events.accountFollows.accountUnfollowed.v102.decode(ctx);

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
  return {
    accountId: '',
    domain: new Uint8Array(8)
  };
}

export function parseDomainMetaUpdatedEventParams(
  ctx: EventForDecode
): DomainMetaUpdatedEventParsedParams {
  return {
    accountId: '',
    domain: new Uint8Array(8)
  };
}

export function parseEvmAddressLinkedToAccountEventParams(
  ctx: EventForDecode
): EvmAddressLinkedToAccountEventParsedParams {
  if (events.evmAccounts.evmAddressLinkedToAccount.v104.is(ctx)) {
    const { substrate, ethereum } =
      events.evmAccounts.evmAddressLinkedToAccount.v104.decode(ctx);

    return {
      substrateAccountId: toSubsocialAddress(substrate)!,
      ethereumAccountId: ethereum
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}
export function parseEvmAddressUnlinkedFromAccountEventParams(
  ctx: EventForDecode
): EvmAddressUnlinkedFromAccountEventParsedParams {
  if (events.evmAccounts.evmAddressUnlinkedFromAccount.v108.is(ctx)) {
    const { substrate, ethereum } =
      events.evmAccounts.evmAddressUnlinkedFromAccount.v108.decode(ctx);

    return {
      substrateAccountId: toSubsocialAddress(substrate)!,
      ethereumAccountId: ethereum
    };
  } else {
    throw new UnknownVersionError(ctx.name);
  }
}
//
// export function parseProxyAddedEventParams(
//   ctx: EventForDecode
// ): EvmAddressUnlinkedFromAccountEventParsedParams {
//   const event = new ProxyProxyAddedEvent(ctx, ctx.event);
//
//   if (event.isV102) {
//     const { delegator, delegatee, proxyType } = event.asV102;
//
//     return {
//       delegatorAccountId: toSubsocialAddress(delegator),
//       proxyAccountId: toSubsocialAddress(delegatee),
//       proxyType: proxyType.__kind
//     };
//   } else {
//     throw new UnknownVersionError(ctx.event.name);
//   }
// }
//
// export function parseProxyRemovedEventParams(
//   ctx: EventForDecode
// ): EvmAddressUnlinkedFromAccountEventParsedParams {
//   const event = new ProxyProxyRemovedEvent(ctx, ctx.event);
//
//   if (event.isV102) {
//     const { delegator, delegatee, proxyType } = event.asV102;
//
//     return {
//       delegatorAccountId: toSubsocialAddress(delegator),
//       proxyAccountId: toSubsocialAddress(delegatee),
//       proxyType: proxyType.__kind
//     };
//   } else {
//     throw new UnknownVersionError(ctx.event.name);
//   }
// }
