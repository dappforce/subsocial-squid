import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v100 from './v100'
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

export class BalancesBalanceSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.BalanceSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A balance was set by root.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.BalanceSet') === '1e2b5d5a07046e6d6e5507661d3f3feaddfb41fc609a2336b24957322080ca77'
    }

    /**
     * A balance was set by root.
     */
    get asV100(): {who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesDepositEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Deposit')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    get asV100(): {who: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesDustLostEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.DustLost')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
    }

    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     */
    get asV100(): {account: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesEndowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Endowed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was created with some free balance.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
    }

    /**
     * An account was created with some free balance.
     */
    get asV100(): {account: Uint8Array, freeBalance: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesReserveRepatriatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.ReserveRepatriated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
    }

    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     */
    get asV100(): {from: Uint8Array, to: Uint8Array, amount: bigint, destinationStatus: v100.BalanceStatus} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesReservedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Reserved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was reserved (moved from free to reserved).
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some balance was reserved (moved from free to reserved).
     */
    get asV100(): {who: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesSlashedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Slashed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     */
    get asV100(): {who: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transfer succeeded.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
    }

    /**
     * Transfer succeeded.
     */
    get asV100(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesUnreservedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Unreserved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was unreserved (moved from reserved to free).
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some balance was unreserved (moved from reserved to free).
     */
    get asV100(): {who: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesWithdrawEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Withdraw')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    get asV100(): {who: Uint8Array, amount: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class EnergyDustLostEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Energy.DustLost')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was removed whose balance was non-zero but below
     * ExistentialDeposit, resulting in an outright loss.
     */
    get isV101(): boolean {
        return this._chain.getEventHash('Energy.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
    }

    /**
     * An account was removed whose balance was non-zero but below
     * ExistentialDeposit, resulting in an outright loss.
     */
    get asV101(): {account: Uint8Array, amount: bigint} {
        assert(this.isV101)
        return this._chain.decodeEvent(this.event)
    }
}

export class EnergyEnergyGeneratedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Energy.EnergyGenerated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Energy have been generated to an account.
     */
    get isV101(): boolean {
        return this._chain.getEventHash('Energy.EnergyGenerated') === '4bcd85519e0eb73207f6e8611168616ad5d200319097a6b48dca9900af5d70f4'
    }

    /**
     * Energy have been generated to an account.
     */
    get asV101(): {generator: Uint8Array, receiver: Uint8Array, balanceBurned: bigint} {
        assert(this.isV101)
        return this._chain.decodeEvent(this.event)
    }
}

export class EnergyValueCoefficientUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Energy.ValueCoefficientUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Energy value coefficient has been updated.
     */
    get isV101(): boolean {
        return this._chain.getEventHash('Energy.ValueCoefficientUpdated') === '3b55813576cf0de13f000ad3b579f0b56d77b7272a2c0061924dd13b08bab909'
    }

    /**
     * Energy value coefficient has been updated.
     */
    get asV101(): {newCoefficient: bigint} {
        assert(this.isV101)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmAccountsAccountLinkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EvmAccounts.AccountLinked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Account have been linked to ethereum address
     */
    get isV102(): boolean {
        return this._chain.getEventHash('EvmAccounts.AccountLinked') === '7d325df0caeb27ccebe98dd10ef35c9d01ecbc50f66fb0caf6dcffbb2963c1b0'
    }

    /**
     * Account have been linked to ethereum address
     */
    get asV102(): {substrate: Uint8Array, ethereum: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmAccountsEthCallExecutedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EvmAccounts.EthCallExecuted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('EvmAccounts.EthCallExecuted') === 'd15218d9451baa25e4e3c2b30a15d679f7c3c9aa3d43b64b531831430663eb58'
    }

    get asV102(): {result: v102.Type_38} {
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

export class GrandpaNewAuthoritiesEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Grandpa.NewAuthorities')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New authority set has been applied.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Grandpa.NewAuthorities') === 'e25505d283e6b21359efad4ea3b01da035cbbe2b268fd3cbfb12ca0b5577a9de'
    }

    /**
     * New authority set has been applied.
     */
    get asV100(): {authoritySet: [Uint8Array, bigint][]} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class GrandpaPausedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Grandpa.Paused')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Current authority set has been paused.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Grandpa.Paused') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Current authority set has been paused.
     */
    get asV100(): null {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class GrandpaResumedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Grandpa.Resumed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Current authority set has been resumed.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Grandpa.Resumed') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Current authority set has been resumed.
     */
    get asV100(): null {
        assert(this.isV100)
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

export class ProxyAnnouncedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Proxy.Announced')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An announcement was placed to make a call in the future.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Proxy.Announced') === '5c2546e4632bb75e839f990a33f7feb63fb5598747a25d3d09f23108c106abc4'
    }

    /**
     * An announcement was placed to make a call in the future.
     */
    get asV102(): {real: Uint8Array, proxy: Uint8Array, callHash: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProxyProxyAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Proxy.ProxyAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A proxy was added.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Proxy.ProxyAdded') === 'facb7858b8c2d6a1b1d8b6b1a9ef73f302299e234f819caf7c21e236a7ed9b90'
    }

    /**
     * A proxy was added.
     */
    get asV102(): {delegator: Uint8Array, delegatee: Uint8Array, proxyType: v102.ProxyType, delay: number} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProxyProxyExecutedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Proxy.ProxyExecuted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A proxy was executed correctly, with the given.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Proxy.ProxyExecuted') === 'd15218d9451baa25e4e3c2b30a15d679f7c3c9aa3d43b64b531831430663eb58'
    }

    /**
     * A proxy was executed correctly, with the given.
     */
    get asV102(): {result: v102.Type_38} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProxyProxyRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Proxy.ProxyRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A proxy was removed.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Proxy.ProxyRemoved') === 'facb7858b8c2d6a1b1d8b6b1a9ef73f302299e234f819caf7c21e236a7ed9b90'
    }

    /**
     * A proxy was removed.
     */
    get asV102(): {delegator: Uint8Array, delegatee: Uint8Array, proxyType: v102.ProxyType, delay: number} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProxyPureCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Proxy.PureCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A pure account has been created by new proxy with given
     * disambiguation index and proxy type.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Proxy.PureCreated') === 'e0affa63d998e90e65936fe85d3827d8dd2437e9280c05548051e7ad818948c4'
    }

    /**
     * A pure account has been created by new proxy with given
     * disambiguation index and proxy type.
     */
    get asV102(): {pure: Uint8Array, who: Uint8Array, proxyType: v102.ProxyType, disambiguationIndex: number} {
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

export class ResourceDiscussionsResourceDiscussionLinkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ResourceDiscussions.ResourceDiscussionLinked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV103(): boolean {
        return this._chain.getEventHash('ResourceDiscussions.ResourceDiscussionLinked') === 'b226489b60b5ee4e9b23ba3785a1cd4a4eb7eb52d305e17c2f043405eaeb26b5'
    }

    get asV103(): {resourceId: Uint8Array, accountId: Uint8Array, postId: bigint} {
        assert(this.isV103)
        return this._chain.decodeEvent(this.event)
    }
}

export class RolesRoleCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Roles.RoleCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Roles.RoleCreated') === '008ed4bb8b7bc9284e6ba803c1cfcde5a61429c300c9e1963399488443979e54'
    }

    get asV100(): {account: Uint8Array, spaceId: bigint, roleId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class RolesRoleDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Roles.RoleDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Roles.RoleDeleted') === 'a58247060df1a3a901646649f1e12bcc5274ae227b4b2ab041966abd4ece14d2'
    }

    get asV100(): {account: Uint8Array, roleId: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class RolesRoleGrantedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Roles.RoleGranted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Roles.RoleGranted') === '3dd6b73057722a969d2f3f466bc225cddf384a8aabb3bf563b0bcb7bb9a6ceed'
    }

    get asV100(): {account: Uint8Array, roleId: bigint, users: v100.User[]} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class RolesRoleRevokedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Roles.RoleRevoked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Roles.RoleRevoked') === '3dd6b73057722a969d2f3f466bc225cddf384a8aabb3bf563b0bcb7bb9a6ceed'
    }

    get asV100(): {account: Uint8Array, roleId: bigint, users: v100.User[]} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class RolesRoleUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Roles.RoleUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV100(): boolean {
        return this._chain.getEventHash('Roles.RoleUpdated') === 'a58247060df1a3a901646649f1e12bcc5274ae227b4b2ab041966abd4ece14d2'
    }

    get asV100(): {account: Uint8Array, roleId: bigint} {
        assert(this.isV100)
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

export class SpaceOwnershipSpaceOwnershipTransferRejectedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'SpaceOwnership.SpaceOwnershipTransferRejected')
        this._chain = ctx._chain
        this.event = event
    }

    get isV102(): boolean {
        return this._chain.getEventHash('SpaceOwnership.SpaceOwnershipTransferRejected') === '3598290eeb909bc34636d196da89829d37d0fa0ae5899f72908d4977aa03a0b7'
    }

    get asV102(): {account: Uint8Array, spaceId: bigint} {
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

export class SudoKeyChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.KeyChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The \[sudoer\] just switched identity; the old key is supplied if one existed.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Sudo.KeyChanged') === 'b94a7a753f8f0b026120555f1f1c70878235307461e256807cb791dad15244c2'
    }

    /**
     * The \[sudoer\] just switched identity; the old key is supplied if one existed.
     */
    get asV100(): {oldSudoer: (Uint8Array | undefined)} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoSudidEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.Sudid')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A sudo just took place. \[result\]
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Sudo.Sudid') === '1b4cd14e3ef27d194a19f72ca99c0748bad5378dacf5240cdcde1536e1d11dad'
    }

    /**
     * A sudo just took place. \[result\]
     */
    get asV100(): {sudoResult: v100.Type_38} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoSudoAsDoneEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.SudoAsDone')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A sudo just took place. \[result\]
     */
    get isV100(): boolean {
        return this._chain.getEventHash('Sudo.SudoAsDone') === '1b4cd14e3ef27d194a19f72ca99c0748bad5378dacf5240cdcde1536e1d11dad'
    }

    /**
     * A sudo just took place. \[result\]
     */
    get asV100(): {sudoResult: v100.Type_38} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemCodeUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.CodeUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * `:code` was updated.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.CodeUpdated') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * `:code` was updated.
     */
    get asV100(): null {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemExtrinsicFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.ExtrinsicFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An extrinsic failed.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.ExtrinsicFailed') === '36c29895cd15b6f845bb064a671635ce07ef9de9648695c2803020e8510d0fb3'
    }

    /**
     * An extrinsic failed.
     */
    get asV100(): {dispatchError: v100.DispatchError, dispatchInfo: v100.DispatchInfo} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemExtrinsicSuccessEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.ExtrinsicSuccess')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An extrinsic completed successfully.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.ExtrinsicSuccess') === '6b78214e1591ecc2de1662ebf5ca93838612414a62415cde1cdd2962f8235a92'
    }

    /**
     * An extrinsic completed successfully.
     */
    get asV100(): {dispatchInfo: v100.DispatchInfo} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemKilledAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.KilledAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was reaped.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.KilledAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    /**
     * An account was reaped.
     */
    get asV100(): {account: Uint8Array} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemNewAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.NewAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A new account was created.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.NewAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    /**
     * A new account was created.
     */
    get asV100(): {account: Uint8Array} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.Remarked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * On on-chain remark happened.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('System.Remarked') === 'c58b73482fe762a6dcca2f35266f0d1739333312cf7a50eea55c666d0cda6101'
    }

    /**
     * On on-chain remark happened.
     */
    get asV100(): {sender: Uint8Array, hash: Uint8Array} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransactionPaymentTransactionFeePaidEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'TransactionPayment.TransactionFeePaid')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     */
    get isV100(): boolean {
        return this._chain.getEventHash('TransactionPayment.TransactionFeePaid') === 'f2e962e9996631445edecd62b0646df79871442a2d1a1a6e1f550a0b3a56b226'
    }

    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     */
    get asV100(): {who: Uint8Array, actualFee: bigint, tip: bigint} {
        assert(this.isV100)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityBatchCompletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchCompleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches completed fully with no error.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.BatchCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Batch of dispatches completed fully with no error.
     */
    get asV102(): null {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityBatchCompletedWithErrorsEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchCompletedWithErrors')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches completed but has errors.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.BatchCompletedWithErrors') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Batch of dispatches completed but has errors.
     */
    get asV102(): null {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityBatchInterruptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchInterrupted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.BatchInterrupted') === '14dbb9456065a44deeed159d4dbd21796ec92754c0494d698c9bcc529d0f7279'
    }

    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     */
    get asV102(): {index: number, error: v102.DispatchError} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityDispatchedAsEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.DispatchedAs')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A call was dispatched.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.DispatchedAs') === 'd15218d9451baa25e4e3c2b30a15d679f7c3c9aa3d43b64b531831430663eb58'
    }

    /**
     * A call was dispatched.
     */
    get asV102(): {result: v102.Type_38} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityItemCompletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.ItemCompleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A single item within a Batch of dispatches has completed with no error.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.ItemCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * A single item within a Batch of dispatches has completed with no error.
     */
    get asV102(): null {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityItemFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.ItemFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A single item within a Batch of dispatches has completed with error.
     */
    get isV102(): boolean {
        return this._chain.getEventHash('Utility.ItemFailed') === '58463e011dfd19c6786d4056e9e9452b33b4cb0fcf9c6e8c032e8ad7d16b0d34'
    }

    /**
     * A single item within a Batch of dispatches has completed with error.
     */
    get asV102(): {error: v102.DispatchError} {
        assert(this.isV102)
        return this._chain.decodeEvent(this.event)
    }
}
