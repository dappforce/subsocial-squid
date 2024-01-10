import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v102 from './v102'

export class AccountFollowsAccountFollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'AccountFollows.AccountFollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('AccountFollows.AccountFollowed') === '58dcd964d7fecf10fd85a4b5f5055a33d6cd8c1d0a60f35895e4b2d02f69670d'
    }

    get asV102(): {follower: Uint8Array, account: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class AccountFollowsAccountUnfollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'AccountFollows.AccountUnfollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('AccountFollows.AccountUnfollowed') === '58dcd964d7fecf10fd85a4b5f5055a33d6cd8c1d0a60f35895e4b2d02f69670d'
    }

    get asV102(): {follower: Uint8Array, account: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmAccountsEvmAddressLinkedToAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EvmAccounts.EvmAddressLinkedToAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Account have been linked to evm address
     */
    get isV104(): boolean {
        return this._chain.getEventHash('EvmAccounts.EvmAddressLinkedToAccount') === '4e91f3af896ea5e5fbce7968b31b0abca921c10c8abb59bde9e837cf3e21e503'
    }

    /**
     * Account have been linked to evm address
     */
    get asV104(): {ethereum: Uint8Array, substrate: Uint8Array} {
        assert(this.isV104)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmAccountsEvmAddressUnlinkedFromAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EvmAccounts.EvmAddressUnlinkedFromAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Account have been unlinked from evm address
     */
    get isV108(): boolean {
        return this._chain.getEventHash('EvmAccounts.EvmAddressUnlinkedFromAccount') === '4e91f3af896ea5e5fbce7968b31b0abca921c10c8abb59bde9e837cf3e21e503'
    }

    /**
     * Account have been unlinked from evm address
     */
    get asV108(): {ethereum: Uint8Array, substrate: Uint8Array} {
        assert(this.isV108)
        return this._chain.decodeEvent(this.event)
    }
}

export class PostFollowsPostFollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'PostFollows.PostFollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV107(): boolean {
        return this._chain.getEventHash('PostFollows.PostFollowed') === 'bb7f7df752d5d18e55dbb327ddaa38c7f4a3bc11e49425dc7193c24184d8e643'
    }

    get asV107(): {follower: Uint8Array, postId: bigint} {
        assert(this.isV107)
        return this._chain.decodeEvent(this.event)
    }
}

export class PostFollowsPostUnfollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'PostFollows.PostUnfollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV107(): boolean {
        return this._chain.getEventHash('PostFollows.PostUnfollowed') === 'bb7f7df752d5d18e55dbb327ddaa38c7f4a3bc11e49425dc7193c24184d8e643'
    }

    get asV107(): {follower: Uint8Array, postId: bigint} {
        assert(this.isV107)
        return this._chain.decodeEvent(this.event)
    }
}

export class PostsPostCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Posts.PostCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Posts.PostCreated') === 'c15c37af42f4d900025837e5f4326117b28dd922aa079cae41b57e9886b55782'
    }

    get asV100(): {account: Uint8Array, postId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class PostsPostMovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Posts.PostMoved')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Posts.PostMoved') === '31342df9d009b9f3d0c9938b7c12d2c992b23b06de6edcd05215dd3e88f36a6a'
    }

    get asV100(): {account: Uint8Array, postId: bigint, fromSpace: (bigint | undefined), toSpace: (bigint | undefined)} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class PostsPostUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Posts.PostUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Posts.PostUpdated') === 'c15c37af42f4d900025837e5f4326117b28dd922aa079cae41b57e9886b55782'
    }

    get asV100(): {account: Uint8Array, postId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProfilesProfileUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Profiles.ProfileUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Profile's space id was updated for this account.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Profiles.ProfileUpdated') === 'd940f4b0c5de1ed174d22549ad330a36ea0aad9b808f016f5aaace9c80ce6441'
    }

    /**
     * Profile's space id was updated for this account.
     */
    get asV102(): {account: Uint8Array, spaceId: (bigint | undefined)} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ReactionsPostReactionCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Reactions.PostReactionCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('Reactions.PostReactionCreated') === 'd60054aecf68a376c704208df2db21ba58faec163ee7165b476481136322cee8'
    }

    get asV102(): {account: Uint8Array, postId: bigint, reactionId: bigint, reactionKind: v102.ReactionKind} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ReactionsPostReactionDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Reactions.PostReactionDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('Reactions.PostReactionDeleted') === 'd60054aecf68a376c704208df2db21ba58faec163ee7165b476481136322cee8'
    }

    get asV102(): {account: Uint8Array, postId: bigint, reactionId: bigint, reactionKind: v102.ReactionKind} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ReactionsPostReactionUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Reactions.PostReactionUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('Reactions.PostReactionUpdated') === 'd60054aecf68a376c704208df2db21ba58faec163ee7165b476481136322cee8'
    }

    get asV102(): {account: Uint8Array, postId: bigint, reactionId: bigint, reactionKind: v102.ReactionKind} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpaceFollowsSpaceFollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'SpaceFollows.SpaceFollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('SpaceFollows.SpaceFollowed') === '39e28a03c48825c8d41a5f418096625711ab9709891a6cabc9f50fec5f113023'
    }

    get asV100(): {follower: Uint8Array, spaceId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpaceFollowsSpaceUnfollowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'SpaceFollows.SpaceUnfollowed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('SpaceFollows.SpaceUnfollowed') === '39e28a03c48825c8d41a5f418096625711ab9709891a6cabc9f50fec5f113023'
    }

    get asV100(): {follower: Uint8Array, spaceId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpaceOwnershipSpaceOwnershipTransferAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'SpaceOwnership.SpaceOwnershipTransferAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('SpaceOwnership.SpaceOwnershipTransferAccepted') === '3598290eeb909bc34636d196da89829d37d0fa0ae5899f72908d4977aa03a0b7'
    }

    get asV102(): {account: Uint8Array, spaceId: bigint} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpaceOwnershipSpaceOwnershipTransferCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'SpaceOwnership.SpaceOwnershipTransferCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('SpaceOwnership.SpaceOwnershipTransferCreated') === '7b63a4b6a0bc71448b9ddfcb9a69f7a52138afd689d538ab31dd07cfd36d2f44'
    }

    get asV102(): {currentOwner: Uint8Array, spaceId: bigint, newOwner: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpacesSpaceCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Spaces.SpaceCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Spaces.SpaceCreated') === '3598290eeb909bc34636d196da89829d37d0fa0ae5899f72908d4977aa03a0b7'
    }

    get asV100(): {account: Uint8Array, spaceId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SpacesSpaceUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Spaces.SpaceUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Spaces.SpaceUpdated') === '3598290eeb909bc34636d196da89829d37d0fa0ae5899f72908d4977aa03a0b7'
    }

    get asV100(): {account: Uint8Array, spaceId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}
