import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v1500 from './v1500'
import * as v1501 from './v1501'

export class AccountFollowsFollowAccountCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'AccountFollows.follow_account')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('AccountFollows.follow_account') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    get asV1500(): {account: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class AccountFollowsForceFollowAccountCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'AccountFollows.force_follow_account')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('AccountFollows.force_follow_account') === '9f1ddc744dbfea01361fbbdbc972ecb2b13eee16d23418408dc945e350942bf2'
    }

    get asV1500(): {follower: Uint8Array, following: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class AccountFollowsUnfollowAccountCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'AccountFollows.unfollow_account')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('AccountFollows.unfollow_account') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    get asV1500(): {account: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class AuthorshipSetUnclesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Authorship.set_uncles')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Provide a set of uncles.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Authorship.set_uncles') === 'cf2d7dac8c8babfdda54dfcca36fda32336dc937b0f1767c6b2332a9b718e0b5'
    }

    /**
     * Provide a set of uncles.
     */
    get asV1500(): {newUncles: v1500.Header[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesForceTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.force_transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Exactly as `transfer`, except the origin must be root and the source account may be
     * specified.
     * # <weight>
     * - Same as transfer, but additional read and write because the source account is not
     *   assumed to be in the overlay.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.force_transfer') === 'e5944fbe8224a17fe49f9c1d1d01efaf87fb1778fd39618512af54c9ba6f9dff'
    }

    /**
     * Exactly as `transfer`, except the origin must be root and the source account may be
     * specified.
     * # <weight>
     * - Same as transfer, but additional read and write because the source account is not
     *   assumed to be in the overlay.
     * # </weight>
     */
    get asV1500(): {source: v1500.MultiAddress, dest: v1500.MultiAddress, value: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesForceUnreserveCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.force_unreserve')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unreserve some balance from a user by force.
     * 
     * Can only be called by ROOT.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.force_unreserve') === '30bc48977e2a7ad3fc8ac014948ded50fc54886bad9a1f65b02bb64f27d8a6be'
    }

    /**
     * Unreserve some balance from a user by force.
     * 
     * Can only be called by ROOT.
     */
    get asV1500(): {who: v1500.MultiAddress, amount: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesSetBalanceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.set_balance')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the balances of a given account.
     * 
     * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
     * also alter the total issuance of the system (`TotalIssuance`) appropriately.
     * If the new free or reserved balance is below the existential deposit,
     * it will reset the account nonce (`frame_system::AccountNonce`).
     * 
     * The dispatch origin for this call is `root`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.set_balance') === 'beb82909d38c015bc075ff8b107e47a02f8772bf5cf681d6cd84ef685e448a8f'
    }

    /**
     * Set the balances of a given account.
     * 
     * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
     * also alter the total issuance of the system (`TotalIssuance`) appropriately.
     * If the new free or reserved balance is below the existential deposit,
     * it will reset the account nonce (`frame_system::AccountNonce`).
     * 
     * The dispatch origin for this call is `root`.
     */
    get asV1500(): {who: v1500.MultiAddress, newFree: bigint, newReserved: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Transfer some liquid free balance to another account.
     * 
     * `transfer` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     * 
     * The dispatch origin for this call must be `Signed` by the transactor.
     * 
     * # <weight>
     * - Dependent on arguments but not critical, given proper implementations for input config
     *   types. See related functions below.
     * - It contains a limited number of reads and writes internally and no complex
     *   computation.
     * 
     * Related functions:
     * 
     *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
     *   - Transferring balances to accounts that did not exist before will cause
     *     `T::OnNewAccount::on_new_account` to be called.
     *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
     *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
     *     that the transfer will not kill the origin account.
     * ---------------------------------
     * - Origin account is already in memory, so no DB operations for them.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.transfer') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * Transfer some liquid free balance to another account.
     * 
     * `transfer` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     * 
     * The dispatch origin for this call must be `Signed` by the transactor.
     * 
     * # <weight>
     * - Dependent on arguments but not critical, given proper implementations for input config
     *   types. See related functions below.
     * - It contains a limited number of reads and writes internally and no complex
     *   computation.
     * 
     * Related functions:
     * 
     *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
     *   - Transferring balances to accounts that did not exist before will cause
     *     `T::OnNewAccount::on_new_account` to be called.
     *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
     *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
     *     that the transfer will not kill the origin account.
     * ---------------------------------
     * - Origin account is already in memory, so no DB operations for them.
     * # </weight>
     */
    get asV1500(): {dest: v1500.MultiAddress, value: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferAllCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer_all')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Transfer the entire transferable balance from the caller account.
     * 
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     * 
     * The dispatch origin of this call must be Signed.
     * 
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *   of the funds the account has, causing the sender account to be killed (false), or
     *   transfer everything except at least the existential deposit, which will guarantee to
     *   keep the sender account alive (true). # <weight>
     * - O(1). Just like transfer, but reading the user's transferable balance first.
     *   #</weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.transfer_all') === '9c94c2ca9979f6551af6e123fb6b6ba14d026f862f9a023706f8f88c556b355f'
    }

    /**
     * Transfer the entire transferable balance from the caller account.
     * 
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     * 
     * The dispatch origin of this call must be Signed.
     * 
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *   of the funds the account has, causing the sender account to be killed (false), or
     *   transfer everything except at least the existential deposit, which will guarantee to
     *   keep the sender account alive (true). # <weight>
     * - O(1). Just like transfer, but reading the user's transferable balance first.
     *   #</weight>
     */
    get asV1500(): {dest: v1500.MultiAddress, keepAlive: boolean} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferKeepAliveCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer_keep_alive')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Same as the [`transfer`] call, but with a check that the transfer will not kill the
     * origin account.
     * 
     * 99% of the time you want [`transfer`] instead.
     * 
     * [`transfer`]: struct.Pallet.html#method.transfer
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Balances.transfer_keep_alive') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * Same as the [`transfer`] call, but with a check that the transfer will not kill the
     * origin account.
     * 
     * 99% of the time you want [`transfer`] instead.
     * 
     * [`transfer`]: struct.Pallet.html#method.transfer
     */
    get asV1500(): {dest: v1500.MultiAddress, value: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class CollatorSelectionLeaveIntentCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'CollatorSelection.leave_intent')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Deregister `origin` as a collator candidate. Note that the collator can only leave on
     * session change. The `CandidacyBond` will be unreserved immediately.
     * 
     * This call will fail if the total number of candidates would drop below `MinCandidates`.
     * 
     * This call is not available to `Invulnerable` collators.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('CollatorSelection.leave_intent') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Deregister `origin` as a collator candidate. Note that the collator can only leave on
     * session change. The `CandidacyBond` will be unreserved immediately.
     * 
     * This call will fail if the total number of candidates would drop below `MinCandidates`.
     * 
     * This call is not available to `Invulnerable` collators.
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class CollatorSelectionRegisterAsCandidateCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'CollatorSelection.register_as_candidate')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Register this account as a collator candidate. The account must (a) already have
     * registered session keys and (b) be able to reserve the `CandidacyBond`.
     * 
     * This call is not available to `Invulnerable` collators.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('CollatorSelection.register_as_candidate') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Register this account as a collator candidate. The account must (a) already have
     * registered session keys and (b) be able to reserve the `CandidacyBond`.
     * 
     * This call is not available to `Invulnerable` collators.
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class CollatorSelectionSetCandidacyBondCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'CollatorSelection.set_candidacy_bond')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the candidacy bond amount.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('CollatorSelection.set_candidacy_bond') === 'a862ec70ffc8f3bd1c3d634825c052f8531eba68afa42769689fc18a6d718eda'
    }

    /**
     * Set the candidacy bond amount.
     */
    get asV1500(): {bond: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class CollatorSelectionSetDesiredCandidatesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'CollatorSelection.set_desired_candidates')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the ideal number of collators (not including the invulnerables).
     * If lowering this number, then the number of running collators could be higher than this figure.
     * Aside from that edge case, there should be no other way to have more collators than the desired number.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('CollatorSelection.set_desired_candidates') === '405f1447d8db6ecc920213976cf7f98b6e74c5ceb4e2ecf66c742895e40e5d78'
    }

    /**
     * Set the ideal number of collators (not including the invulnerables).
     * If lowering this number, then the number of running collators could be higher than this figure.
     * Aside from that edge case, there should be no other way to have more collators than the desired number.
     */
    get asV1500(): {max: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class CollatorSelectionSetInvulnerablesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'CollatorSelection.set_invulnerables')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the list of invulnerable (fixed) collators.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('CollatorSelection.set_invulnerables') === '4f4db85b7e763f702804fa793ac5cba68cfd546b497830a9c3c21dced2b91524'
    }

    /**
     * Set the list of invulnerable (fixed) collators.
     */
    get asV1500(): {new: Uint8Array[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DmpQueueServiceOverweightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'DmpQueue.service_overweight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Service a single overweight message.
     * 
     * - `origin`: Must pass `ExecuteOverweightOrigin`.
     * - `index`: The index of the overweight message to service.
     * - `weight_limit`: The amount of weight that message execution may take.
     * 
     * Errors:
     * - `Unknown`: Message of `index` is unknown.
     * - `OverLimit`: Message execution may use greater than `weight_limit`.
     * 
     * Events:
     * - `OverweightServiced`: On success.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('DmpQueue.service_overweight') === 'f6b281f58290b6af96ac2dda36163d81223f37d0a8a100877e2526969a57d772'
    }

    /**
     * Service a single overweight message.
     * 
     * - `origin`: Must pass `ExecuteOverweightOrigin`.
     * - `index`: The index of the overweight message to service.
     * - `weight_limit`: The amount of weight that message execution may take.
     * 
     * Errors:
     * - `Unknown`: Message of `index` is unknown.
     * - `OverLimit`: Message execution may use greater than `weight_limit`.
     * 
     * Events:
     * - `OverweightServiced`: On success.
     */
    get asV1500(): {index: bigint, weightLimit: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsForceRegisterDomainCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.force_register_domain')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Registers a domain ([full_domain]) using root on behalf of a [target] with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.force_register_domain') === '40e509166207cb270df62795a12c8c80b39ca1f70bc8e70c892903b2be96a2c6'
    }

    /**
     * Registers a domain ([full_domain]) using root on behalf of a [target] with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     */
    get asV1500(): {target: v1500.MultiAddress, fullDomain: Uint8Array, content: v1500.Content, expiresIn: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsForceSetInnerValueCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.force_set_inner_value')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Sets the domain inner_value to be one of subsocial account, space, or post.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.force_set_inner_value') === 'c8c9a5a438c13bd9fe3ac0252c8b8f4584dfd1c2cbfc9d63e768fbd79733e0c1'
    }

    /**
     * Sets the domain inner_value to be one of subsocial account, space, or post.
     */
    get asV1500(): {domain: Uint8Array, valueOpt: (v1500.InnerValue | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsRegisterDomainCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.register_domain')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Registers a domain ([full_domain]) using origin with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     * [full_domain] is a full domain name including a dot (.) and TLD.
     * Example of a [full_domain]: `mytoken.ksm`
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.register_domain') === '3a465edd0f4760aca0b7bef927f9f6ba6cab3ba2072b666f03187709c44bf800'
    }

    /**
     * Registers a domain ([full_domain]) using origin with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     * [full_domain] is a full domain name including a dot (.) and TLD.
     * Example of a [full_domain]: `mytoken.ksm`
     */
    get asV1500(): {fullDomain: Uint8Array, content: v1500.Content, expiresIn: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsReserveWordsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.reserve_words')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Mark set of domains as not reservable by users.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.reserve_words') === '67e634908b17d97e6c6912794c724071ca531b5db4a2d99e3eadd5d7d3bfc6e8'
    }

    /**
     * Mark set of domains as not reservable by users.
     */
    get asV1500(): {words: Uint8Array[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSetDomainContentCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.set_domain_content')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Sets the domain content to be an outside link.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.set_domain_content') === 'd51962d163738aeb04635f233971dac507e6baaa5820a8818895470ecb79b425'
    }

    /**
     * Sets the domain content to be an outside link.
     */
    get asV1500(): {domain: Uint8Array, newContent: v1500.Content} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSetInnerValueCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.set_inner_value')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Sets the domain inner_value to be one of Subsocial account, space, or post.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.set_inner_value') === 'c8c9a5a438c13bd9fe3ac0252c8b8f4584dfd1c2cbfc9d63e768fbd79733e0c1'
    }

    /**
     * Sets the domain inner_value to be one of Subsocial account, space, or post.
     */
    get asV1500(): {domain: Uint8Array, valueOpt: (v1500.InnerValue | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSetOuterValueCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.set_outer_value')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Sets the domain outer_value to be a custom string.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.set_outer_value') === 'a7a49d7838396269e0c9aef1fad54ac214ecef268af669b42deb9939559aa988'
    }

    /**
     * Sets the domain outer_value to be a custom string.
     */
    get asV1500(): {domain: Uint8Array, valueOpt: (Uint8Array | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSupportTldsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.support_tlds')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Add support for a set of top-level domains.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Domains.support_tlds') === '771193405f7db729582ab2b08bcc692130aef2b5876681d11d983c1914429e19'
    }

    /**
     * Add support for a set of top-level domains.
     */
    get asV1500(): {tlds: Uint8Array[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class EnergyGenerateEnergyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Energy.generate_energy')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Generate energy for a target account by burning balance from the caller.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Energy.generate_energy') === '2833b65231d93e24c30a1c2d95575c516c313c659d6944bcf91e8f8383765b45'
    }

    /**
     * Generate energy for a target account by burning balance from the caller.
     */
    get asV1500(): {target: v1500.MultiAddress, burnAmount: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class EnergyUpdateValueCoefficientCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Energy.update_value_coefficient')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Updates the value coefficient. Only callable by the `UpdateOrigin`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Energy.update_value_coefficient') === '3b55813576cf0de13f000ad3b579f0b56d77b7272a2c0061924dd13b08bab909'
    }

    /**
     * Updates the value coefficient. Only callable by the `UpdateOrigin`.
     */
    get asV1500(): {newCoefficient: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ParachainSystemAuthorizeUpgradeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ParachainSystem.authorize_upgrade')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('ParachainSystem.authorize_upgrade') === '9e5c86c297bd88fae31bc40119e44695818ddc3ab8842b90daeb12771005c70d'
    }

    get asV1500(): {codeHash: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ParachainSystemEnactAuthorizedUpgradeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ParachainSystem.enact_authorized_upgrade')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('ParachainSystem.enact_authorized_upgrade') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    get asV1500(): {code: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ParachainSystemSetValidationDataCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ParachainSystem.set_validation_data')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the current validation data.
     * 
     * This should be invoked exactly once per block. It will panic at the finalization
     * phase if the call was not invoked.
     * 
     * The dispatch origin for this call must be `Inherent`
     * 
     * As a side effect, this function upgrades the current validation function
     * if the appropriate time has come.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('ParachainSystem.set_validation_data') === 'df843f97e4c625e033541d5f205c5889f3131bdb4549570310e924d96769c1cd'
    }

    /**
     * Set the current validation data.
     * 
     * This should be invoked exactly once per block. It will panic at the finalization
     * phase if the call was not invoked.
     * 
     * The dispatch origin for this call must be `Inherent`
     * 
     * As a side effect, this function upgrades the current validation function
     * if the appropriate time has come.
     */
    get asV1500(): {data: v1500.ParachainInherentData} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ParachainSystemSudoSendUpwardMessageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ParachainSystem.sudo_send_upward_message')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('ParachainSystem.sudo_send_upward_message') === '34457b6daded32ddc4ec3a5a21e34b9af8dcd7d190a5a7833fa8a7ed53b31206'
    }

    get asV1500(): {message: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmExecuteCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.execute')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Execute an XCM message from a local, signed, origin.
     * 
     * An event is deposited indicating whether `msg` could be executed completely or only
     * partially.
     * 
     * No more than `max_weight` will be used in its attempted execution. If this is less than the
     * maximum amount of weight that the message could take to be executed, then no execution
     * attempt will be made.
     * 
     * NOTE: A successful return to this does *not* imply that the `msg` was executed successfully
     * to completion; only that *some* of it was executed.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.execute') === 'c6251691ab3319ecee95442d381c308f9ada155e423798c908cbd6b063aa26b4'
    }

    /**
     * Execute an XCM message from a local, signed, origin.
     * 
     * An event is deposited indicating whether `msg` could be executed completely or only
     * partially.
     * 
     * No more than `max_weight` will be used in its attempted execution. If this is less than the
     * maximum amount of weight that the message could take to be executed, then no execution
     * attempt will be made.
     * 
     * NOTE: A successful return to this does *not* imply that the `msg` was executed successfully
     * to completion; only that *some* of it was executed.
     */
    get asV1500(): {message: v1500.Type_214, maxWeight: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmForceDefaultXcmVersionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.force_default_xcm_version')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set a safe XCM version (the version that XCM should be encoded with if the most recent
     * version a destination can accept is unknown).
     * 
     * - `origin`: Must be Root.
     * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.force_default_xcm_version') === 'd4bcd64cc4c940eafd14296ec6cbfb7d27e4ca42a4c7dab4c0b89f6c8102257e'
    }

    /**
     * Set a safe XCM version (the version that XCM should be encoded with if the most recent
     * version a destination can accept is unknown).
     * 
     * - `origin`: Must be Root.
     * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    get asV1500(): {maybeXcmVersion: (number | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmForceSubscribeVersionNotifyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.force_subscribe_version_notify')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Ask a location to notify us regarding their XCM version and any changes to it.
     * 
     * - `origin`: Must be Root.
     * - `location`: The location to which we should subscribe for XCM version notifications.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.force_subscribe_version_notify') === 'f3f38b2278743e50bfd76c0f778560fb38a60c931275e9df42f2b9ce08c1d6fc'
    }

    /**
     * Ask a location to notify us regarding their XCM version and any changes to it.
     * 
     * - `origin`: Must be Root.
     * - `location`: The location to which we should subscribe for XCM version notifications.
     */
    get asV1500(): {location: v1500.VersionedMultiLocation} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmForceUnsubscribeVersionNotifyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.force_unsubscribe_version_notify')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Require that a particular destination should no longer notify us regarding any XCM
     * version changes.
     * 
     * - `origin`: Must be Root.
     * - `location`: The location to which we are currently subscribed for XCM version
     *   notifications which we no longer desire.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.force_unsubscribe_version_notify') === 'f3f38b2278743e50bfd76c0f778560fb38a60c931275e9df42f2b9ce08c1d6fc'
    }

    /**
     * Require that a particular destination should no longer notify us regarding any XCM
     * version changes.
     * 
     * - `origin`: Must be Root.
     * - `location`: The location to which we are currently subscribed for XCM version
     *   notifications which we no longer desire.
     */
    get asV1500(): {location: v1500.VersionedMultiLocation} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmForceXcmVersionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.force_xcm_version')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Extoll that a particular destination can be communicated with through a particular
     * version of XCM.
     * 
     * - `origin`: Must be Root.
     * - `location`: The destination that is being described.
     * - `xcm_version`: The latest version of XCM that `location` supports.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.force_xcm_version') === '3bdd3ba3db54facd962462ff1c2c0ede1b428cf9119b36a4e96fa86916145f75'
    }

    /**
     * Extoll that a particular destination can be communicated with through a particular
     * version of XCM.
     * 
     * - `origin`: Must be Root.
     * - `location`: The destination that is being described.
     * - `xcm_version`: The latest version of XCM that `location` supports.
     */
    get asV1500(): {location: v1500.V1MultiLocation, xcmVersion: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmLimitedReserveTransferAssetsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.limited_reserve_transfer_assets')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Transfer some assets from the local chain to the sovereign account of a destination
     * chain and forward a notification XCM.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the assets send may be
     * at risk.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
     *   `dest` side.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.limited_reserve_transfer_assets') === '3c203a3f95b9fe53b8c376802c4fe60fa6077815af7432dcd2a3e458169a5d2a'
    }

    /**
     * Transfer some assets from the local chain to the sovereign account of a destination
     * chain and forward a notification XCM.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the assets send may be
     * at risk.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
     *   `dest` side.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    get asV1500(): {dest: v1500.VersionedMultiLocation, beneficiary: v1500.VersionedMultiLocation, assets: v1500.VersionedMultiAssets, feeAssetItem: number, weightLimit: v1500.V2WeightLimit} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmLimitedTeleportAssetsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.limited_teleport_assets')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Teleport some assets from the local chain to some destination chain.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the assets send may be
     * at risk.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
     *   `dest` side. May not be empty.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.limited_teleport_assets') === '3c203a3f95b9fe53b8c376802c4fe60fa6077815af7432dcd2a3e458169a5d2a'
    }

    /**
     * Teleport some assets from the local chain to some destination chain.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the assets send may be
     * at risk.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
     *   `dest` side. May not be empty.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    get asV1500(): {dest: v1500.VersionedMultiLocation, beneficiary: v1500.VersionedMultiLocation, assets: v1500.VersionedMultiAssets, feeAssetItem: number, weightLimit: v1500.V2WeightLimit} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmReserveTransferAssetsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.reserve_transfer_assets')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Transfer some assets from the local chain to the sovereign account of a destination
     * chain and forward a notification XCM.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
     *   `dest` side.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.reserve_transfer_assets') === '123b8170fa49ede01f38623e457f4e4d417c90cff5b93ced45a9eb8fe8e6ca2e'
    }

    /**
     * Transfer some assets from the local chain to the sovereign account of a destination
     * chain and forward a notification XCM.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
     *   `dest` side.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     */
    get asV1500(): {dest: v1500.VersionedMultiLocation, beneficiary: v1500.VersionedMultiLocation, assets: v1500.VersionedMultiAssets, feeAssetItem: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmSendCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.send')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.send') === '3ca4beb317aeed3e0a00ae870ffd3bef841bb6f4e766db0b286c7fc5d8eef886'
    }

    get asV1500(): {dest: v1500.VersionedMultiLocation, message: v1500.VersionedXcm} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PolkadotXcmTeleportAssetsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'PolkadotXcm.teleport_assets')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Teleport some assets from the local chain to some destination chain.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
     *   `dest` side. May not be empty.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('PolkadotXcm.teleport_assets') === '123b8170fa49ede01f38623e457f4e4d417c90cff5b93ced45a9eb8fe8e6ca2e'
    }

    /**
     * Teleport some assets from the local chain to some destination chain.
     * 
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     * 
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
     *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
     *   an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
     *   `dest` side. May not be empty.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *   fees.
     */
    get asV1500(): {dest: v1500.VersionedMultiLocation, beneficiary: v1500.VersionedMultiLocation, assets: v1500.VersionedMultiAssets, feeAssetItem: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsCreatePostCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.create_post')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.create_post') === '13cf8f56f66250567e65ce0c2f684f94aac1d468477a4bc95459f9e824a0ccd8'
    }

    get asV1500(): {spaceIdOpt: (bigint | undefined), extension: v1500.PostExtension, content: v1500.Content} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsForceCreatePostCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.force_create_post')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.force_create_post') === '8e71c94b3f7776c4af6b23fe4dc8ca2bb1de4d193c2a4dd0802d6b55d85eafed'
    }

    get asV1500(): {postId: bigint, created: v1500.WhoAndWhen, owner: Uint8Array, extension: v1500.PostExtension, spaceIdOpt: (bigint | undefined), content: v1500.Content, hidden: boolean, upvotesCount: number, downvotesCount: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsForceRemovePostCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.force_remove_post')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.force_remove_post') === 'f9262d9dba5799cc2473a7efe96fe103847ca3105b849986ffed47775c8580cb'
    }

    get asV1500(): {postId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsForceSetNextPostIdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.force_set_next_post_id')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.force_set_next_post_id') === 'f9262d9dba5799cc2473a7efe96fe103847ca3105b849986ffed47775c8580cb'
    }

    get asV1500(): {postId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsMovePostCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.move_post')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.move_post') === '478dc9b8210ec3e52e94f9e8c5066f483455585059d77f7021e5766e761f7513'
    }

    get asV1500(): {postId: bigint, newSpaceId: (bigint | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class PostsUpdatePostCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Posts.update_post')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Posts.update_post') === '40b76a48c2a2c8c219b90e1a6b9507d6201436a9c87cff94f849f9fdfd477341'
    }

    get asV1500(): {postId: bigint, update: v1500.PostUpdate} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ProfilesForceSetSpaceAsProfileCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Profiles.force_set_space_as_profile')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Profiles.force_set_space_as_profile') === 'f7c1f16a0e6ff74632925fa0e5cb44fced5cad77fe93a7bc744571880ad6f4ea'
    }

    get asV1500(): {account: Uint8Array, spaceIdOpt: (bigint | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ProfilesResetProfileCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Profiles.reset_profile')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Profiles.reset_profile') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ProfilesSetProfileCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Profiles.set_profile')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Profiles.set_profile') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyAddProxyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.add_proxy')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Register a proxy account for the sender that is able to make calls on its behalf.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `proxy`: The account that the `caller` would like to make a proxy.
     * - `proxy_type`: The permissions allowed for this proxy account.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.add_proxy') === '03810d2937d4c30f9225de14b4fd3c63ba0e82307394a263e45dfb74f36bc724'
    }

    /**
     * Register a proxy account for the sender that is able to make calls on its behalf.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `proxy`: The account that the `caller` would like to make a proxy.
     * - `proxy_type`: The permissions allowed for this proxy account.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get asV1501(): {delegate: Uint8Array, proxyType: v1501.ProxyType, delay: number} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyAnnounceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.announce')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Publish the hash of a proxy-call that will be made in the future.
     * 
     * This must be called some number of blocks before the corresponding `proxy` is attempted
     * if the delay associated with the proxy relationship is greater than zero.
     * 
     * No more than `MaxPending` announcements may be made at any one time.
     * 
     * This will take a deposit of `AnnouncementDepositFactor` as well as
     * `AnnouncementDepositBase` if there are no other pending announcements.
     * 
     * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.announce') === '886fe5248256b2372151aa5c936f9027a64929a3501efe231a22f1ee868cff3e'
    }

    /**
     * Publish the hash of a proxy-call that will be made in the future.
     * 
     * This must be called some number of blocks before the corresponding `proxy` is attempted
     * if the delay associated with the proxy relationship is greater than zero.
     * 
     * No more than `MaxPending` announcements may be made at any one time.
     * 
     * This will take a deposit of `AnnouncementDepositFactor` as well as
     * `AnnouncementDepositBase` if there are no other pending announcements.
     * 
     * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get asV1501(): {real: Uint8Array, callHash: Uint8Array} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyAnonymousCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.anonymous')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     * initialize it with a proxy of `proxy_type` for `origin` sender.
     * 
     * Requires a `Signed` origin.
     * 
     * - `proxy_type`: The type of the proxy that the sender will be registered as over the
     * new account. This will almost always be the most permissive `ProxyType` possible to
     * allow for maximum flexibility.
     * - `index`: A disambiguation index, in case this is called multiple times in the same
     * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     * want to use `0`.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     * 
     * Fails with `Duplicate` if this has already been called in this transaction, from the
     * same sender, with the same parameters.
     * 
     * Fails if there are insufficient funds to pay for deposit.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     * TODO: Might be over counting 1 read
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.anonymous') === '74720492fa45302fd755414d27123047b96a321e3626ce14d00df47189bc6074'
    }

    /**
     * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     * initialize it with a proxy of `proxy_type` for `origin` sender.
     * 
     * Requires a `Signed` origin.
     * 
     * - `proxy_type`: The type of the proxy that the sender will be registered as over the
     * new account. This will almost always be the most permissive `ProxyType` possible to
     * allow for maximum flexibility.
     * - `index`: A disambiguation index, in case this is called multiple times in the same
     * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     * want to use `0`.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     * 
     * Fails with `Duplicate` if this has already been called in this transaction, from the
     * same sender, with the same parameters.
     * 
     * Fails if there are insufficient funds to pay for deposit.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     * TODO: Might be over counting 1 read
     */
    get asV1501(): {proxyType: v1501.ProxyType, delay: number, index: number} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyKillAnonymousCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.kill_anonymous')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Removes a previously spawned anonymous proxy.
     * 
     * WARNING: **All access to this account will be lost.** Any funds held in it will be
     * inaccessible.
     * 
     * Requires a `Signed` origin, and the sender account must have been created by a call to
     * `anonymous` with corresponding parameters.
     * 
     * - `spawner`: The account that originally called `anonymous` to create this account.
     * - `index`: The disambiguation index originally passed to `anonymous`. Probably `0`.
     * - `proxy_type`: The proxy type originally passed to `anonymous`.
     * - `height`: The height of the chain when the call to `anonymous` was processed.
     * - `ext_index`: The extrinsic index in which the call to `anonymous` was processed.
     * 
     * Fails with `NoPermission` in case the caller is not a previously created anonymous
     * account whose `anonymous` call has corresponding parameters.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.kill_anonymous') === 'ccd78c0b2eb41a0ddf01f63f7d3d3f9a4f26dc1e381928f256109a91d4901b20'
    }

    /**
     * Removes a previously spawned anonymous proxy.
     * 
     * WARNING: **All access to this account will be lost.** Any funds held in it will be
     * inaccessible.
     * 
     * Requires a `Signed` origin, and the sender account must have been created by a call to
     * `anonymous` with corresponding parameters.
     * 
     * - `spawner`: The account that originally called `anonymous` to create this account.
     * - `index`: The disambiguation index originally passed to `anonymous`. Probably `0`.
     * - `proxy_type`: The proxy type originally passed to `anonymous`.
     * - `height`: The height of the chain when the call to `anonymous` was processed.
     * - `ext_index`: The extrinsic index in which the call to `anonymous` was processed.
     * 
     * Fails with `NoPermission` in case the caller is not a previously created anonymous
     * account whose `anonymous` call has corresponding parameters.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get asV1501(): {spawner: Uint8Array, proxyType: v1501.ProxyType, index: number, height: number, extIndex: number} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyProxyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.proxy')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
     * `add_proxy`.
     * 
     * Removes any corresponding announcement(s).
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.proxy') === 'e92abc7c483c5200b19f6527bfd02816157fa81f5eedc518c06d3b9fc2450cd6'
    }

    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
     * `add_proxy`.
     * 
     * Removes any corresponding announcement(s).
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get asV1501(): {real: Uint8Array, forceProxyType: (v1501.ProxyType | undefined), call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyProxyAnnouncedCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.proxy_announced')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Dispatch the given `call` from an account that the sender is authorized for through
     * `add_proxy`.
     * 
     * Removes any corresponding announcement(s).
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.proxy_announced') === '146a554d105b4f280469dfa6bb3f3b660906c4bc012c71dab0cca1be553e6f50'
    }

    /**
     * Dispatch the given `call` from an account that the sender is authorized for through
     * `add_proxy`.
     * 
     * Removes any corresponding announcement(s).
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get asV1501(): {delegate: Uint8Array, real: Uint8Array, forceProxyType: (v1501.ProxyType | undefined), call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyRejectAnnouncementCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.reject_announcement')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Remove the given announcement of a delegate.
     * 
     * May be called by a target (proxied) account to remove a call that one of their delegates
     * (`delegate`) has announced they want to execute. The deposit is returned.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `delegate`: The account that previously announced the call.
     * - `call_hash`: The hash of the call to be made.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.reject_announcement') === '717e6dbb2911f49e34a3b48c48c86b40495423ab31d5b45f0062629c73057f2b'
    }

    /**
     * Remove the given announcement of a delegate.
     * 
     * May be called by a target (proxied) account to remove a call that one of their delegates
     * (`delegate`) has announced they want to execute. The deposit is returned.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `delegate`: The account that previously announced the call.
     * - `call_hash`: The hash of the call to be made.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get asV1501(): {delegate: Uint8Array, callHash: Uint8Array} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyRemoveAnnouncementCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.remove_announcement')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Remove a given announcement.
     * 
     * May be called by a proxy account to remove a call they previously announced and return
     * the deposit.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.remove_announcement') === '886fe5248256b2372151aa5c936f9027a64929a3501efe231a22f1ee868cff3e'
    }

    /**
     * Remove a given announcement.
     * 
     * May be called by a proxy account to remove a call they previously announced and return
     * the deposit.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     * 
     * # <weight>
     * Weight is a function of:
     * - A: the number of announcements made.
     * - P: the number of proxies the user has.
     * # </weight>
     */
    get asV1501(): {real: Uint8Array, callHash: Uint8Array} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyRemoveProxiesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.remove_proxies')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unregister all proxy accounts for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * WARNING: This may be called on accounts created by `anonymous`, however if done, then
     * the unreserved fees will be inaccessible. **All access to this account will be lost.**
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.remove_proxies') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Unregister all proxy accounts for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * WARNING: This may be called on accounts created by `anonymous`, however if done, then
     * the unreserved fees will be inaccessible. **All access to this account will be lost.**
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get asV1501(): null {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyRemoveProxyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.remove_proxy')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unregister a proxy account for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `proxy`: The account that the `caller` would like to remove as a proxy.
     * - `proxy_type`: The permissions currently enabled for the removed proxy account.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Proxy.remove_proxy') === '03810d2937d4c30f9225de14b4fd3c63ba0e82307394a263e45dfb74f36bc724'
    }

    /**
     * Unregister a proxy account for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `proxy`: The account that the `caller` would like to remove as a proxy.
     * - `proxy_type`: The permissions currently enabled for the removed proxy account.
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    get asV1501(): {delegate: Uint8Array, proxyType: v1501.ProxyType, delay: number} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsCreatePostReactionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.create_post_reaction')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.create_post_reaction') === '40a2068cedc002bd126a60b2fdfd6a8420e987d189f9789df116abe34a019b23'
    }

    get asV1500(): {postId: bigint, kind: v1500.ReactionKind} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsDeletePostReactionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.delete_post_reaction')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.delete_post_reaction') === '970bcbf9af644b51607abf67a12d6a45b84829829490c3b7c746fa56c52c9dba'
    }

    get asV1500(): {postId: bigint, reactionId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsForceCreatePostReactionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.force_create_post_reaction')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.force_create_post_reaction') === '987e04781798f9eb9511d6f8c626f296534b1b5bc939350db59d7b0814dbeaa8'
    }

    get asV1500(): {who: Uint8Array, postId: bigint, reactionId: bigint, created: v1500.WhoAndWhen, reactionKind: v1500.ReactionKind} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsForceDeletePostReactionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.force_delete_post_reaction')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.force_delete_post_reaction') === '1c248fa4683beb8fcf7a5517d2a9175a5ce4e77b7d643e286f7b69593964166b'
    }

    get asV1500(): {reactionId: bigint, postId: bigint, who: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsForceSetNextReactionIdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.force_set_next_reaction_id')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.force_set_next_reaction_id') === '3682d4a0db85e4ed6fb7152656bf4a3ff65ad9abfa07d49b27047be1e1212af6'
    }

    get asV1500(): {reactionId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class ReactionsUpdatePostReactionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Reactions.update_post_reaction')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Reactions.update_post_reaction') === 'd06582c6fcf18f040305ce7b19db3c68689a72d1b24731900e8960ed4d399dfe'
    }

    get asV1500(): {postId: bigint, reactionId: bigint, newKind: v1500.ReactionKind} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesCreateRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.create_role')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Create a new role, with a list of permissions, within a given space.
     * 
     * `content` can optionally contain additional information associated with a role,
     * such as a name, description, and image for a role. This may be useful for end users.
     * 
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.create_role') === '53d4d0de7f8d40b0cfe71c1333b35cca7a258f7895cb1aa9b10fe746257d9aec'
    }

    /**
     * Create a new role, with a list of permissions, within a given space.
     * 
     * `content` can optionally contain additional information associated with a role,
     * such as a name, description, and image for a role. This may be useful for end users.
     * 
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV1500(): {spaceId: bigint, timeToLive: (number | undefined), content: v1500.Content, permissions: v1500.SpacePermission[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesDeleteRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.delete_role')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Delete a given role and clean all associated storage items.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.delete_role') === '09b6dc7d2cec09d896cbbfc31ed6aada6bbc3cb117f4e68806e7dfa396c75a01'
    }

    /**
     * Delete a given role and clean all associated storage items.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV1500(): {roleId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesForceCreateRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.force_create_role')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.force_create_role') === '5f8992f6708549c4fbecbef7078c4b2c200c22baac08ad94e397ce8ef1439433'
    }

    get asV1500(): {created: v1500.WhoAndWhen, roleId: bigint, spaceId: bigint, disabled: boolean, content: v1500.Content, permissions: v1500.SpacePermission[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesForceGrantRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.force_grant_role')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.force_grant_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    get asV1500(): {roleId: bigint, users: v1500.User[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesForceSetNextRoleIdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.force_set_next_role_id')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.force_set_next_role_id') === '09b6dc7d2cec09d896cbbfc31ed6aada6bbc3cb117f4e68806e7dfa396c75a01'
    }

    get asV1500(): {roleId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesGrantRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.grant_role')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Grant a given role to a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.grant_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    /**
     * Grant a given role to a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV1500(): {roleId: bigint, users: v1500.User[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesRevokeRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.revoke_role')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Revoke a given role from a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.revoke_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    /**
     * Revoke a given role from a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV1500(): {roleId: bigint, users: v1500.User[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class RolesUpdateRoleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Roles.update_role')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Update an existing role by a given id.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Roles.update_role') === '0808dd95aaddb72acd705e907cc373e859edbb31ebada4870e17bbd630e7f7d7'
    }

    /**
     * Update an existing role by a given id.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV1500(): {roleId: bigint, update: v1500.RoleUpdate} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SessionPurgeKeysCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Session.purge_keys')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Removes any session key(s) of the function caller.
     * 
     * This doesn't take effect until the next session.
     * 
     * The dispatch origin of this function must be Signed and the account must be either be
     * convertible to a validator ID using the chain's typical addressing system (this usually
     * means being a controller account) or directly convertible into a validator ID (which
     * usually means being a stash account).
     * 
     * # <weight>
     * - Complexity: `O(1)` in number of key types. Actual cost depends on the number of length
     *   of `T::Keys::key_ids()` which is fixed.
     * - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
     * - DbWrites: `NextKeys`, `origin account`
     * - DbWrites per key id: `KeyOwner`
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Session.purge_keys') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Removes any session key(s) of the function caller.
     * 
     * This doesn't take effect until the next session.
     * 
     * The dispatch origin of this function must be Signed and the account must be either be
     * convertible to a validator ID using the chain's typical addressing system (this usually
     * means being a controller account) or directly convertible into a validator ID (which
     * usually means being a stash account).
     * 
     * # <weight>
     * - Complexity: `O(1)` in number of key types. Actual cost depends on the number of length
     *   of `T::Keys::key_ids()` which is fixed.
     * - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
     * - DbWrites: `NextKeys`, `origin account`
     * - DbWrites per key id: `KeyOwner`
     * # </weight>
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SessionSetKeysCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Session.set_keys')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     * This doesn't take effect until the next session.
     * 
     * The dispatch origin of this function must be signed.
     * 
     * # <weight>
     * - Complexity: `O(1)`. Actual cost depends on the number of length of
     *   `T::Keys::key_ids()` which is fixed.
     * - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
     * - DbWrites: `origin account`, `NextKeys`
     * - DbReads per key id: `KeyOwner`
     * - DbWrites per key id: `KeyOwner`
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Session.set_keys') === 'c0b44bc08ddc0ad90c1bd05300acef09fd979fcb434b3b92b011e7817fd56c2f'
    }

    /**
     * Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     * This doesn't take effect until the next session.
     * 
     * The dispatch origin of this function must be signed.
     * 
     * # <weight>
     * - Complexity: `O(1)`. Actual cost depends on the number of length of
     *   `T::Keys::key_ids()` which is fixed.
     * - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
     * - DbWrites: `origin account`, `NextKeys`
     * - DbReads per key id: `KeyOwner`
     * - DbWrites per key id: `KeyOwner`
     * # </weight>
     */
    get asV1500(): {keys: v1500.SessionKeys, proof: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceFollowsFollowSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceFollows.follow_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceFollows.follow_space') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceFollowsForceFollowSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceFollows.force_follow_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceFollows.force_follow_space') === '39e28a03c48825c8d41a5f418096625711ab9709891a6cabc9f50fec5f113023'
    }

    get asV1500(): {follower: Uint8Array, spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceFollowsUnfollowSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceFollows.unfollow_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceFollows.unfollow_space') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceOwnershipAcceptPendingOwnershipCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceOwnership.accept_pending_ownership')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceOwnership.accept_pending_ownership') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceOwnershipRejectPendingOwnershipCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceOwnership.reject_pending_ownership')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceOwnership.reject_pending_ownership') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpaceOwnershipTransferSpaceOwnershipCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'SpaceOwnership.transfer_space_ownership')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('SpaceOwnership.transfer_space_ownership') === '0be1c8da7bce1c1d4b72a908cc1e82a8c163a5dae025f1fa840794a99d326abb'
    }

    get asV1500(): {spaceId: bigint, transferTo: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpacesCreateSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Spaces.create_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Spaces.create_space') === '9936dd5ea2c6a85521dd6da6a820bc2d33e354de26ec4a3cd0edd14b4262ebcb'
    }

    get asV1500(): {content: v1500.Content, permissionsOpt: (v1500.SpacePermissions | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpacesForceCreateSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Spaces.force_create_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Spaces.force_create_space') === '7ead14491fa15ebba109062af6eab61b693d1536644c07041915443aa76c179c'
    }

    get asV1500(): {spaceId: bigint, created: v1500.WhoAndWhen, owner: Uint8Array, content: v1500.Content, hidden: boolean, permissionsOpt: (v1500.SpacePermissions | undefined)} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpacesForceSetNextSpaceIdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Spaces.force_set_next_space_id')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Spaces.force_set_next_space_id') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV1500(): {spaceId: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SpacesUpdateSpaceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Spaces.update_space')
        this._chain = ctx._chain
        this.call = call
    }

    get isV1500(): boolean {
        return this._chain.getCallHash('Spaces.update_space') === '27a261800f7e184fb6ef58e09df3f9264fb8c2497e3011f84bdabfd750b7348c'
    }

    get asV1500(): {spaceId: bigint, update: v1500.SpaceUpdate} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSetKeyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.set_key')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     * key.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB change.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Sudo.set_key') === 'e634aac3331d47a56ff572c52ad90a648769dfbf2c00d7bd44498b4ee41f6ac7'
    }

    /**
     * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     * key.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB change.
     * # </weight>
     */
    get asV1500(): {new: v1500.MultiAddress} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '87aeaa958e8e1feab18e31c5d0980cdf585b6b72e149316276ee41ca4856bdf3'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get asV1500(): {call: v1500.Call} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '949dcd8332cf31b2cb9a398a89a345623b4f2e5d2eefbabed92b09df8b487825'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get asV1501(): {call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoAsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo_as')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === 'bea5b68ebe578dd9272391f8767e7c954b44be58a05ee30dee34f8ad640cd1e0'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get asV1500(): {who: v1500.MultiAddress, call: v1500.Call} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '9902111b898bd6dd0892e400c136c253cc9e7f93dcd54bd84f0ddba4bcb50502'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + 10,000.
     * # </weight>
     */
    get asV1501(): {who: v1501.MultiAddress, call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoUncheckedWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo_unchecked_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - The weight of this call is defined by the caller.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === 'da8fc535b8bc445444e1730066a5a11fb96e1c0d0e8fa54c801a00c04d5c295c'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - The weight of this call is defined by the caller.
     * # </weight>
     */
    get asV1500(): {call: v1500.Call, weight: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - The weight of this call is defined by the caller.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '467f7f106d008c2b2b8c601e7077f81ccf384bd5ef27cfbf75b00695182bca5e'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * # <weight>
     * - O(1).
     * - The weight of this call is defined by the caller.
     * # </weight>
     */
    get asV1501(): {call: v1501.Call, weight: bigint} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemFillBlockCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.fill_block')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * A dispatch that will fill the block weight up to the given ratio.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.fill_block') === '41c1841312db092642508be699e4a3f54d52efe2dcaa8101ca9518398fb70c49'
    }

    /**
     * A dispatch that will fill the block weight up to the given ratio.
     */
    get asV1500(): {ratio: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemKillPrefixCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.kill_prefix')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Kill all storage items with a key that starts with the given prefix.
     * 
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.kill_prefix') === 'dfbadd42bee8b18fc81cf78683511061181cffbf7a8ebfd3e5719c389b373d93'
    }

    /**
     * Kill all storage items with a key that starts with the given prefix.
     * 
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    get asV1500(): {prefix: Uint8Array, subkeys: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemKillStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.kill_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Kill some items from storage.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.kill_storage') === 'eac21dc14e927c003d9c634fb019d04128f71f8529d2914b10a56b85289c2c11'
    }

    /**
     * Kill some items from storage.
     */
    get asV1500(): {keys: Uint8Array[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemRemarkCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.remark')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Make some on-chain remark.
     * 
     * # <weight>
     * - `O(1)`
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark.
     * 
     * # <weight>
     * - `O(1)`
     * # </weight>
     */
    get asV1500(): {remark: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemRemarkWithEventCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.remark_with_event')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Make some on-chain remark and emit event.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.remark_with_event') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark and emit event.
     */
    get asV1500(): {remark: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetCodeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_code')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the new runtime code.
     * 
     * # <weight>
     * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
     * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
     *   expensive).
     * - 1 storage write (codec `O(C)`).
     * - 1 digest item.
     * - 1 event.
     * The weight of this function is dependent on the runtime, but generally this is very
     * expensive. We will treat this as a full block.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.set_code') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * Set the new runtime code.
     * 
     * # <weight>
     * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
     * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
     *   expensive).
     * - 1 storage write (codec `O(C)`).
     * - 1 digest item.
     * - 1 event.
     * The weight of this function is dependent on the runtime, but generally this is very
     * expensive. We will treat this as a full block.
     * # </weight>
     */
    get asV1500(): {code: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetCodeWithoutChecksCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_code_without_checks')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the new runtime code without doing any checks of the given `code`.
     * 
     * # <weight>
     * - `O(C)` where `C` length of `code`
     * - 1 storage write (codec `O(C)`).
     * - 1 digest item.
     * - 1 event.
     * The weight of this function is dependent on the runtime. We will treat this as a full
     * block. # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.set_code_without_checks') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * Set the new runtime code without doing any checks of the given `code`.
     * 
     * # <weight>
     * - `O(C)` where `C` length of `code`
     * - 1 storage write (codec `O(C)`).
     * - 1 digest item.
     * - 1 event.
     * The weight of this function is dependent on the runtime. We will treat this as a full
     * block. # </weight>
     */
    get asV1500(): {code: Uint8Array} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetHeapPagesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_heap_pages')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the number of pages in the WebAssembly environment's heap.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.set_heap_pages') === '130172e47c5e517627712b4d084768b98489d920284223ea8ef9c462339b5808'
    }

    /**
     * Set the number of pages in the WebAssembly environment's heap.
     */
    get asV1500(): {pages: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set some items of storage.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     * Set some items of storage.
     */
    get asV1500(): {items: [Uint8Array, Uint8Array][]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class TimestampSetCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Timestamp.set')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Set the current time.
     * 
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     * 
     * The timestamp should be greater than the previous one by the amount specified by
     * `MinimumPeriod`.
     * 
     * The dispatch origin for this call must be `Inherent`.
     * 
     * # <weight>
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
     *   `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Timestamp.set') === '6a8b8ba2be107f0853b674eec0026cc440b314db44d0e2c59b36e353355aed14'
    }

    /**
     * Set the current time.
     * 
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     * 
     * The timestamp should be greater than the previous one by the amount specified by
     * `MinimumPeriod`.
     * 
     * The dispatch origin for this call must be `Inherent`.
     * 
     * # <weight>
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
     *   `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
     * # </weight>
     */
    get asV1500(): {now: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityAsDerivativeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.as_derivative')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Send a call through an indexed pseudonym of the sender.
     * 
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     * 
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     * 
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === '34c20bccee391c7e1ce10b2b9c6007a735162e0969a349af0ff8a70ffa902276'
    }

    /**
     * Send a call through an indexed pseudonym of the sender.
     * 
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     * 
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     * 
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    get asV1500(): {index: number, call: v1500.Call} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Send a call through an indexed pseudonym of the sender.
     * 
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     * 
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     * 
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === 'a11d236a1096f2863a4e178b201ef11234d4a7b97fe56f754e3c2e0092bd33da'
    }

    /**
     * Send a call through an indexed pseudonym of the sender.
     * 
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     * 
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     * 
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    get asV1501(): {index: number, call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityBatchCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.batch')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     * 
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Utility.batch') === '377db1655bd57a685a8b02046554207d3d40947d2f64d3bdc83ff8c624b98340'
    }

    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     * 
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    get asV1500(): {calls: v1500.Call[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     * 
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Utility.batch') === '2bece6a58ca643709d4ac76c6decbd1a13ff078fd8fe33f35bdbe1ca152c32f2'
    }

    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     * 
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    get asV1501(): {calls: v1501.Call[]} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityBatchAllCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.batch_all')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === '377db1655bd57a685a8b02046554207d3d40947d2f64d3bdc83ff8c624b98340'
    }

    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV1500(): {calls: v1500.Call[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === '2bece6a58ca643709d4ac76c6decbd1a13ff078fd8fe33f35bdbe1ca152c32f2'
    }

    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV1501(): {calls: v1501.Call[]} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityDispatchAsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.dispatch_as')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Dispatches a function call with a provided origin.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === '8c732b03649be616d96b41685561515f96d7fed115f6e439425feaa64253cdd7'
    }

    /**
     * Dispatches a function call with a provided origin.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
     * # </weight>
     */
    get asV1500(): {asOrigin: v1500.OriginCaller, call: v1500.Call} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Dispatches a function call with a provided origin.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === '77ceb6f7c705ece7c4c9714a46ec9b8704c1b6d11b83beaef0208a185fb874d2'
    }

    /**
     * Dispatches a function call with a provided origin.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * # <weight>
     * - O(1).
     * - Limited storage reads.
     * - One DB write (event).
     * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
     * # </weight>
     */
    get asV1501(): {asOrigin: v1501.OriginCaller, call: v1501.Call} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityForceBatchCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.force_batch')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === '377db1655bd57a685a8b02046554207d3d40947d2f64d3bdc83ff8c624b98340'
    }

    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV1500(): {calls: v1500.Call[]} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV1501(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === '2bece6a58ca643709d4ac76c6decbd1a13ff078fd8fe33f35bdbe1ca152c32f2'
    }

    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then call are dispatch without checking origin filter. (This includes
     * bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV1501(): {calls: v1501.Call[]} {
        assert(this.isV1501)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingForceVestedTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.force_vested_transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Force a vested transfer.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * - `source`: The account whose funds should be transferred.
     * - `target`: The account that should be transferred the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     * 
     * Emits `VestingCreated`.
     * 
     * NOTE: This will unlock all schedules through the current block.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 4 Reads, 4 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account, Source Account
     *     - Writes: Vesting Storage, Balances Locks, Target Account, Source Account
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Vesting.force_vested_transfer') === 'fcf875d71f02d4cc33d9f1e8fc540430de8155209696fe7c9996d5d479e3d5c3'
    }

    /**
     * Force a vested transfer.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * - `source`: The account whose funds should be transferred.
     * - `target`: The account that should be transferred the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     * 
     * Emits `VestingCreated`.
     * 
     * NOTE: This will unlock all schedules through the current block.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 4 Reads, 4 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account, Source Account
     *     - Writes: Vesting Storage, Balances Locks, Target Account, Source Account
     * # </weight>
     */
    get asV1500(): {source: v1500.MultiAddress, target: v1500.MultiAddress, schedule: v1500.VestingInfo} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingMergeSchedulesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.merge_schedules')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
     * the highest possible start and end blocks. If both schedules have already started the
     * current block will be used as the schedule start; with the caveat that if one schedule
     * is finished by the current block, the other will be treated as the new merged schedule,
     * unmodified.
     * 
     * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
     * NOTE: This will unlock all schedules through the current block prior to merging.
     * NOTE: If both schedules have ended by the current block, no new schedule will be created
     * and both will be removed.
     * 
     * Merged schedule attributes:
     * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
     *   current_block)`.
     * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
     * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `schedule1_index`: index of the first schedule to merge.
     * - `schedule2_index`: index of the second schedule to merge.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Vesting.merge_schedules') === 'fc0db27e3f68971976c0913a7fc03f1b8221d054fbbbca956c367c00c0639eea'
    }

    /**
     * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
     * the highest possible start and end blocks. If both schedules have already started the
     * current block will be used as the schedule start; with the caveat that if one schedule
     * is finished by the current block, the other will be treated as the new merged schedule,
     * unmodified.
     * 
     * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
     * NOTE: This will unlock all schedules through the current block prior to merging.
     * NOTE: If both schedules have ended by the current block, no new schedule will be created
     * and both will be removed.
     * 
     * Merged schedule attributes:
     * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
     *   current_block)`.
     * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
     * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `schedule1_index`: index of the first schedule to merge.
     * - `schedule2_index`: index of the second schedule to merge.
     */
    get asV1500(): {schedule1Index: number, schedule2Index: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingVestCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.vest')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unlock any vested funds of the sender account.
     * 
     * The dispatch origin for this call must be _Signed_ and the sender must have funds still
     * locked under this pallet.
     * 
     * Emits either `VestingCompleted` or `VestingUpdated`.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 2 Reads, 2 Writes
     *     - Reads: Vesting Storage, Balances Locks, [Sender Account]
     *     - Writes: Vesting Storage, Balances Locks, [Sender Account]
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Vesting.vest') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Unlock any vested funds of the sender account.
     * 
     * The dispatch origin for this call must be _Signed_ and the sender must have funds still
     * locked under this pallet.
     * 
     * Emits either `VestingCompleted` or `VestingUpdated`.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 2 Reads, 2 Writes
     *     - Reads: Vesting Storage, Balances Locks, [Sender Account]
     *     - Writes: Vesting Storage, Balances Locks, [Sender Account]
     * # </weight>
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingVestOtherCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.vest_other')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unlock any vested funds of a `target` account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `target`: The account whose vested funds should be unlocked. Must have funds still
     * locked under this pallet.
     * 
     * Emits either `VestingCompleted` or `VestingUpdated`.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 3 Reads, 3 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account
     *     - Writes: Vesting Storage, Balances Locks, Target Account
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Vesting.vest_other') === '8142da248a3023c20f65ce8f6287f9eaf75336ab8815cb15537149abcdd0c20c'
    }

    /**
     * Unlock any vested funds of a `target` account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `target`: The account whose vested funds should be unlocked. Must have funds still
     * locked under this pallet.
     * 
     * Emits either `VestingCompleted` or `VestingUpdated`.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 3 Reads, 3 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account
     *     - Writes: Vesting Storage, Balances Locks, Target Account
     * # </weight>
     */
    get asV1500(): {target: v1500.MultiAddress} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingVestedTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.vested_transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Create a vested transfer.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `target`: The account receiving the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     * 
     * Emits `VestingCreated`.
     * 
     * NOTE: This will unlock all schedules through the current block.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 3 Reads, 3 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account, [Sender Account]
     *     - Writes: Vesting Storage, Balances Locks, Target Account, [Sender Account]
     * # </weight>
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('Vesting.vested_transfer') === 'e10524b55ce1ea33d3b1d4a103e874a701990c6659bea3d0b8c94248699fe975'
    }

    /**
     * Create a vested transfer.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `target`: The account receiving the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     * 
     * Emits `VestingCreated`.
     * 
     * NOTE: This will unlock all schedules through the current block.
     * 
     * # <weight>
     * - `O(1)`.
     * - DbWeight: 3 Reads, 3 Writes
     *     - Reads: Vesting Storage, Balances Locks, Target Account, [Sender Account]
     *     - Writes: Vesting Storage, Balances Locks, Target Account, [Sender Account]
     * # </weight>
     */
    get asV1500(): {target: v1500.MultiAddress, schedule: v1500.VestingInfo} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueResumeXcmExecutionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.resume_xcm_execution')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Resumes all XCM executions for the XCMP queue.
     * 
     * Note that this function doesn't change the status of the in/out bound channels.
     * 
     * - `origin`: Must pass `ControllerOrigin`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.resume_xcm_execution') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Resumes all XCM executions for the XCMP queue.
     * 
     * Note that this function doesn't change the status of the in/out bound channels.
     * 
     * - `origin`: Must pass `ControllerOrigin`.
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueServiceOverweightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.service_overweight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Services a single overweight XCM.
     * 
     * - `origin`: Must pass `ExecuteOverweightOrigin`.
     * - `index`: The index of the overweight XCM to service
     * - `weight_limit`: The amount of weight that XCM execution may take.
     * 
     * Errors:
     * - `BadOverweightIndex`: XCM under `index` is not found in the `Overweight` storage map.
     * - `BadXcm`: XCM under `index` cannot be properly decoded into a valid XCM format.
     * - `WeightOverLimit`: XCM execution may use greater `weight_limit`.
     * 
     * Events:
     * - `OverweightServiced`: On success.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.service_overweight') === 'f6b281f58290b6af96ac2dda36163d81223f37d0a8a100877e2526969a57d772'
    }

    /**
     * Services a single overweight XCM.
     * 
     * - `origin`: Must pass `ExecuteOverweightOrigin`.
     * - `index`: The index of the overweight XCM to service
     * - `weight_limit`: The amount of weight that XCM execution may take.
     * 
     * Errors:
     * - `BadOverweightIndex`: XCM under `index` is not found in the `Overweight` storage map.
     * - `BadXcm`: XCM under `index` cannot be properly decoded into a valid XCM format.
     * - `WeightOverLimit`: XCM execution may use greater `weight_limit`.
     * 
     * Events:
     * - `OverweightServiced`: On success.
     */
    get asV1500(): {index: bigint, weightLimit: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueSuspendXcmExecutionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.suspend_xcm_execution')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
     * 
     * - `origin`: Must pass `ControllerOrigin`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.suspend_xcm_execution') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
     * 
     * - `origin`: Must pass `ControllerOrigin`.
     */
    get asV1500(): null {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateDropThresholdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_drop_threshold')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrites the number of pages of messages which must be in the queue after which we drop any further
     * messages from the channel.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.drop_threshold`
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_drop_threshold') === '56549a8e90ef70438b73ca659a6b72776495b4c60df84463168d148f5c52d05d'
    }

    /**
     * Overwrites the number of pages of messages which must be in the queue after which we drop any further
     * messages from the channel.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.drop_threshold`
     */
    get asV1500(): {new: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateResumeThresholdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_resume_threshold')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrites the number of pages of messages which the queue must be reduced to before it signals that
     * message sending may recommence after it has been suspended.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.resume_threshold`
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_resume_threshold') === '56549a8e90ef70438b73ca659a6b72776495b4c60df84463168d148f5c52d05d'
    }

    /**
     * Overwrites the number of pages of messages which the queue must be reduced to before it signals that
     * message sending may recommence after it has been suspended.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.resume_threshold`
     */
    get asV1500(): {new: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateSuspendThresholdCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_suspend_threshold')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrites the number of pages of messages which must be in the queue for the other side to be told to
     * suspend their sending.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.suspend_value`
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_suspend_threshold') === '56549a8e90ef70438b73ca659a6b72776495b4c60df84463168d148f5c52d05d'
    }

    /**
     * Overwrites the number of pages of messages which must be in the queue for the other side to be told to
     * suspend their sending.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.suspend_value`
     */
    get asV1500(): {new: number} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateThresholdWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_threshold_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrites the amount of remaining weight under which we stop processing messages.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.threshold_weight`
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_threshold_weight') === '8768ae636c927ffed8b3cb5f0df1e15afb0921835e5bc84b9495f4b39ea663b7'
    }

    /**
     * Overwrites the amount of remaining weight under which we stop processing messages.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.threshold_weight`
     */
    get asV1500(): {new: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateWeightRestrictDecayCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_weight_restrict_decay')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrites the speed to which the available weight approaches the maximum weight.
     * A lower number results in a faster progression. A value of 1 makes the entire weight available initially.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.weight_restrict_decay`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_weight_restrict_decay') === '8768ae636c927ffed8b3cb5f0df1e15afb0921835e5bc84b9495f4b39ea663b7'
    }

    /**
     * Overwrites the speed to which the available weight approaches the maximum weight.
     * A lower number results in a faster progression. A value of 1 makes the entire weight available initially.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.weight_restrict_decay`.
     */
    get asV1500(): {new: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}

export class XcmpQueueUpdateXcmpMaxIndividualWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'XcmpQueue.update_xcmp_max_individual_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Overwrite the maximum amount of weight any individual message may consume.
     * Messages above this weight go into the overweight queue and may only be serviced explicitly.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.xcmp_max_individual_weight`.
     */
    get isV1500(): boolean {
        return this._chain.getCallHash('XcmpQueue.update_xcmp_max_individual_weight') === '8768ae636c927ffed8b3cb5f0df1e15afb0921835e5bc84b9495f4b39ea663b7'
    }

    /**
     * Overwrite the maximum amount of weight any individual message may consume.
     * Messages above this weight go into the overweight queue and may only be serviced explicitly.
     * 
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.xcmp_max_individual_weight`.
     */
    get asV1500(): {new: bigint} {
        assert(this.isV1500)
        return this._chain.decodeCall(this.call)
    }
}