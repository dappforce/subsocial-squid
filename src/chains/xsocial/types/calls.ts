import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v100 from './v100'
import * as v101 from './v101'
import * as v102 from './v102'

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

    get isV102(): boolean {
        return this._chain.getCallHash('AccountFollows.follow_account') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    get asV102(): {account: Uint8Array} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('AccountFollows.force_follow_account') === '9f1ddc744dbfea01361fbbdbc972ecb2b13eee16d23418408dc945e350942bf2'
    }

    get asV102(): {follower: Uint8Array, following: Uint8Array} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('AccountFollows.unfollow_account') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
    }

    get asV102(): {account: Uint8Array} {
        assert(this.isV102)
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
    get isV100(): boolean {
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
    get asV100(): {source: v100.MultiAddress, dest: v100.MultiAddress, value: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Balances.force_unreserve') === '30bc48977e2a7ad3fc8ac014948ded50fc54886bad9a1f65b02bb64f27d8a6be'
    }

    /**
     * Unreserve some balance from a user by force.
     * 
     * Can only be called by ROOT.
     */
    get asV100(): {who: v100.MultiAddress, amount: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {who: v100.MultiAddress, newFree: bigint, newReserved: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {dest: v100.MultiAddress, value: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {dest: v100.MultiAddress, keepAlive: boolean} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {dest: v100.MultiAddress, value: bigint} {
        assert(this.isV100)
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
    get isV101(): boolean {
        return this._chain.getCallHash('Energy.generate_energy') === '2833b65231d93e24c30a1c2d95575c516c313c659d6944bcf91e8f8383765b45'
    }

    /**
     * Generate energy for a target account by burning balance from the caller.
     */
    get asV101(): {target: v101.MultiAddress, burnAmount: bigint} {
        assert(this.isV101)
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
    get isV101(): boolean {
        return this._chain.getCallHash('Energy.update_value_coefficient') === '3b55813576cf0de13f000ad3b579f0b56d77b7272a2c0061924dd13b08bab909'
    }

    /**
     * Updates the value coefficient. Only callable by the `UpdateOrigin`.
     */
    get asV101(): {newCoefficient: bigint} {
        assert(this.isV101)
        return this._chain.decodeCall(this.call)
    }
}

export class EvmAccountsLinkEthAddressCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'EvmAccounts.link_eth_address')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Link substrate address to ethereum address.
     */
    get isV102(): boolean {
        return this._chain.getCallHash('EvmAccounts.link_eth_address') === '6b4b8c10495f26dbfdf518b55244487380af51675be587eb64599f5ccb3862a0'
    }

    /**
     * Link substrate address to ethereum address.
     */
    get asV102(): {ethAddress: Uint8Array, ethSignature: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeCall(this.call)
    }
}

export class GrandpaNoteStalledCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Grandpa.note_stalled')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Note that the current authority set of the GRANDPA finality gadget has stalled.
     * 
     * This will trigger a forced authority set change at the beginning of the next session, to
     * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
     * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
     * The block production rate (which may be slowed down because of finality lagging) should
     * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
     * authority will start voting on top of `best_finalized_block_number` for new finalized
     * blocks. `best_finalized_block_number` should be the highest of the latest finalized
     * block of all validators of the new authority set.
     * 
     * Only callable by root.
     */
    get isV100(): boolean {
        return this._chain.getCallHash('Grandpa.note_stalled') === '6bb454c2ae9db6ee64dc7f433f0fd3b839727f70c6c835943383346896272c40'
    }

    /**
     * Note that the current authority set of the GRANDPA finality gadget has stalled.
     * 
     * This will trigger a forced authority set change at the beginning of the next session, to
     * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
     * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
     * The block production rate (which may be slowed down because of finality lagging) should
     * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
     * authority will start voting on top of `best_finalized_block_number` for new finalized
     * blocks. `best_finalized_block_number` should be the highest of the latest finalized
     * block of all validators of the new authority set.
     * 
     * Only callable by root.
     */
    get asV100(): {delay: number, bestFinalizedBlockNumber: number} {
        assert(this.isV100)
        return this._chain.decodeCall(this.call)
    }
}

export class GrandpaReportEquivocationCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Grandpa.report_equivocation')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     */
    get isV100(): boolean {
        return this._chain.getCallHash('Grandpa.report_equivocation') === 'c013519536bd18b242d3dd1699b5d15a8ae1fccf0dd04c12f721418f3b34a23b'
    }

    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     */
    get asV100(): {equivocationProof: v100.EquivocationProof, keyOwnerProof: v100.Void} {
        assert(this.isV100)
        return this._chain.decodeCall(this.call)
    }
}

export class GrandpaReportEquivocationUnsignedCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Grandpa.report_equivocation_unsigned')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     * 
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    get isV100(): boolean {
        return this._chain.getCallHash('Grandpa.report_equivocation_unsigned') === 'c013519536bd18b242d3dd1699b5d15a8ae1fccf0dd04c12f721418f3b34a23b'
    }

    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     * 
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    get asV100(): {equivocationProof: v100.EquivocationProof, keyOwnerProof: v100.Void} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.create_post') === '13cf8f56f66250567e65ce0c2f684f94aac1d468477a4bc95459f9e824a0ccd8'
    }

    get asV100(): {spaceIdOpt: (bigint | undefined), extension: v100.PostExtension, content: v100.Content} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.force_create_post') === '8e71c94b3f7776c4af6b23fe4dc8ca2bb1de4d193c2a4dd0802d6b55d85eafed'
    }

    get asV100(): {postId: bigint, created: v100.WhoAndWhen, owner: Uint8Array, extension: v100.PostExtension, spaceIdOpt: (bigint | undefined), content: v100.Content, hidden: boolean, upvotesCount: number, downvotesCount: number} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.force_remove_post') === 'f9262d9dba5799cc2473a7efe96fe103847ca3105b849986ffed47775c8580cb'
    }

    get asV100(): {postId: bigint} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.force_set_next_post_id') === 'f9262d9dba5799cc2473a7efe96fe103847ca3105b849986ffed47775c8580cb'
    }

    get asV100(): {postId: bigint} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.move_post') === '478dc9b8210ec3e52e94f9e8c5066f483455585059d77f7021e5766e761f7513'
    }

    get asV100(): {postId: bigint, newSpaceId: (bigint | undefined)} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Posts.update_post') === '40b76a48c2a2c8c219b90e1a6b9507d6201436a9c87cff94f849f9fdfd477341'
    }

    get asV100(): {postId: bigint, update: v100.PostUpdate} {
        assert(this.isV100)
        return this._chain.decodeCall(this.call)
    }
}

export class ProfilesCreateSpaceAsProfileCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Profiles.create_space_as_profile')
        this._chain = ctx._chain
        this.call = call
    }

    get isV102(): boolean {
        return this._chain.getCallHash('Profiles.create_space_as_profile') === 'cd3b518518ee060df50f2e98ce0c5229289071ba2569a13fb368fda555347514'
    }

    get asV102(): {content: v102.Content} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Profiles.reset_profile') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    get asV102(): null {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Profiles.set_profile') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV102(): {spaceId: bigint} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.add_proxy') === '36931ac47efe90589bd72bbdc30667cce430a05eb7a07ed892312f2d111b35d6'
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
     */
    get asV102(): {delegate: v102.MultiAddress, proxyType: v102.ProxyType, delay: number} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.announce') === '1e2ba1b130bab29ab148202fefa1b526f6d362ed3f3d2aaf35cc706821c5cd49'
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
     */
    get asV102(): {real: v102.MultiAddress, callHash: Uint8Array} {
        assert(this.isV102)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyCreatePureCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.create_pure')
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.create_pure') === '30a767c8adaa34d0ec5b6cb1f54807f9edb23a2229dc1b5cc6bd1e48c9fa76ea'
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
     */
    get asV102(): {proxyType: v102.ProxyType, delay: number, index: number} {
        assert(this.isV102)
        return this._chain.decodeCall(this.call)
    }
}

export class ProxyKillPureCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Proxy.kill_pure')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Removes a previously spawned pure proxy.
     * 
     * WARNING: **All access to this account will be lost.** Any funds held in it will be
     * inaccessible.
     * 
     * Requires a `Signed` origin, and the sender account must have been created by a call to
     * `pure` with corresponding parameters.
     * 
     * - `spawner`: The account that originally called `pure` to create this account.
     * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
     * - `proxy_type`: The proxy type originally passed to `pure`.
     * - `height`: The height of the chain when the call to `pure` was processed.
     * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
     * 
     * Fails with `NoPermission` in case the caller is not a previously created pure
     * account whose `pure` call has corresponding parameters.
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.kill_pure') === '1dc1bacba651926e1249f182206e484d1902aaa86e08143b5b11d85e14f070bd'
    }

    /**
     * Removes a previously spawned pure proxy.
     * 
     * WARNING: **All access to this account will be lost.** Any funds held in it will be
     * inaccessible.
     * 
     * Requires a `Signed` origin, and the sender account must have been created by a call to
     * `pure` with corresponding parameters.
     * 
     * - `spawner`: The account that originally called `pure` to create this account.
     * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
     * - `proxy_type`: The proxy type originally passed to `pure`.
     * - `height`: The height of the chain when the call to `pure` was processed.
     * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
     * 
     * Fails with `NoPermission` in case the caller is not a previously created pure
     * account whose `pure` call has corresponding parameters.
     */
    get asV102(): {spawner: v102.MultiAddress, proxyType: v102.ProxyType, index: number, height: number, extIndex: number} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.proxy') === '9d76ab7e108e69947a62549517bb8c3b81758df77de1147b565164923a319ad9'
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
     */
    get asV102(): {real: v102.MultiAddress, forceProxyType: (v102.ProxyType | undefined), call: v102.Call} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.proxy_announced') === '3162b56b5fd077f90461cb0cd751dbdec7f254313df8e48816fd4b78889131d3'
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
     */
    get asV102(): {delegate: v102.MultiAddress, real: v102.MultiAddress, forceProxyType: (v102.ProxyType | undefined), call: v102.Call} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.reject_announcement') === 'a1d7c3959dec3e3a68a4ea7b541568e066bd95b7007b052c43ff4736abe9b06b'
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
     */
    get asV102(): {delegate: v102.MultiAddress, callHash: Uint8Array} {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.remove_announcement') === '1e2ba1b130bab29ab148202fefa1b526f6d362ed3f3d2aaf35cc706821c5cd49'
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
     */
    get asV102(): {real: v102.MultiAddress, callHash: Uint8Array} {
        assert(this.isV102)
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
     * WARNING: This may be called on accounts created by `pure`, however if done, then
     * the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.remove_proxies') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Unregister all proxy accounts for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * WARNING: This may be called on accounts created by `pure`, however if done, then
     * the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    get asV102(): null {
        assert(this.isV102)
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
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Proxy.remove_proxy') === '36931ac47efe90589bd72bbdc30667cce430a05eb7a07ed892312f2d111b35d6'
    }

    /**
     * Unregister a proxy account for the sender.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * Parameters:
     * - `proxy`: The account that the `caller` would like to remove as a proxy.
     * - `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    get asV102(): {delegate: v102.MultiAddress, proxyType: v102.ProxyType, delay: number} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.create_post_reaction') === '40a2068cedc002bd126a60b2fdfd6a8420e987d189f9789df116abe34a019b23'
    }

    get asV102(): {postId: bigint, kind: v102.ReactionKind} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.delete_post_reaction') === '970bcbf9af644b51607abf67a12d6a45b84829829490c3b7c746fa56c52c9dba'
    }

    get asV102(): {postId: bigint, reactionId: bigint} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.force_create_post_reaction') === '987e04781798f9eb9511d6f8c626f296534b1b5bc939350db59d7b0814dbeaa8'
    }

    get asV102(): {who: Uint8Array, postId: bigint, reactionId: bigint, created: v102.WhoAndWhen, reactionKind: v102.ReactionKind} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.force_delete_post_reaction') === '1c248fa4683beb8fcf7a5517d2a9175a5ce4e77b7d643e286f7b69593964166b'
    }

    get asV102(): {reactionId: bigint, postId: bigint, who: Uint8Array} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.force_set_next_reaction_id') === '3682d4a0db85e4ed6fb7152656bf4a3ff65ad9abfa07d49b27047be1e1212af6'
    }

    get asV102(): {reactionId: bigint} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('Reactions.update_post_reaction') === 'd06582c6fcf18f040305ce7b19db3c68689a72d1b24731900e8960ed4d399dfe'
    }

    get asV102(): {postId: bigint, reactionId: bigint, newKind: v102.ReactionKind} {
        assert(this.isV102)
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
    get isV100(): boolean {
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
    get asV100(): {spaceId: bigint, timeToLive: (number | undefined), content: v100.Content, permissions: v100.SpacePermission[]} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Roles.delete_role') === '25935778477c968340882c1d53d63cf984032f5d05690d8f3e0f4982db0fb23b'
    }

    /**
     * Delete a given role and clean all associated storage items.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV100(): {roleId: bigint, userCount: number} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Roles.force_create_role') === '5f8992f6708549c4fbecbef7078c4b2c200c22baac08ad94e397ce8ef1439433'
    }

    get asV100(): {created: v100.WhoAndWhen, roleId: bigint, spaceId: bigint, disabled: boolean, content: v100.Content, permissions: v100.SpacePermission[]} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Roles.force_grant_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    get asV100(): {roleId: bigint, users: v100.User[]} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Roles.force_set_next_role_id') === '09b6dc7d2cec09d896cbbfc31ed6aada6bbc3cb117f4e68806e7dfa396c75a01'
    }

    get asV100(): {roleId: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Roles.grant_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    /**
     * Grant a given role to a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV100(): {roleId: bigint, users: v100.User[]} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Roles.revoke_role') === '0004e6e8a85e3c06e60cd359a388b818e652be4f325b9f672f466cd6b326e9d7'
    }

    /**
     * Revoke a given role from a list of users.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV100(): {roleId: bigint, users: v100.User[]} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Roles.update_role') === '0808dd95aaddb72acd705e907cc373e859edbb31ebada4870e17bbd630e7f7d7'
    }

    /**
     * Update an existing role by a given id.
     * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
     */
    get asV100(): {roleId: bigint, update: v100.RoleUpdate} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('SpaceFollows.follow_space') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV100(): {spaceId: bigint} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('SpaceFollows.force_follow_space') === '39e28a03c48825c8d41a5f418096625711ab9709891a6cabc9f50fec5f113023'
    }

    get asV100(): {follower: Uint8Array, spaceId: bigint} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('SpaceFollows.unfollow_space') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV100(): {spaceId: bigint} {
        assert(this.isV100)
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

    get isV102(): boolean {
        return this._chain.getCallHash('SpaceOwnership.accept_pending_ownership') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV102(): {spaceId: bigint} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('SpaceOwnership.reject_pending_ownership') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV102(): {spaceId: bigint} {
        assert(this.isV102)
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

    get isV102(): boolean {
        return this._chain.getCallHash('SpaceOwnership.transfer_space_ownership') === '0be1c8da7bce1c1d4b72a908cc1e82a8c163a5dae025f1fa840794a99d326abb'
    }

    get asV102(): {spaceId: bigint, transferTo: Uint8Array} {
        assert(this.isV102)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Spaces.create_space') === '9936dd5ea2c6a85521dd6da6a820bc2d33e354de26ec4a3cd0edd14b4262ebcb'
    }

    get asV100(): {content: v100.Content, permissionsOpt: (v100.SpacePermissions | undefined)} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Spaces.force_create_space') === '7ead14491fa15ebba109062af6eab61b693d1536644c07041915443aa76c179c'
    }

    get asV100(): {spaceId: bigint, created: v100.WhoAndWhen, owner: Uint8Array, content: v100.Content, hidden: boolean, permissionsOpt: (v100.SpacePermissions | undefined)} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Spaces.force_set_next_space_id') === '33c9415d6a5c975586b23ea7e0f40695559ce765217fad61b099023f284dae20'
    }

    get asV100(): {spaceId: bigint} {
        assert(this.isV100)
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

    get isV100(): boolean {
        return this._chain.getCallHash('Spaces.update_space') === '27a261800f7e184fb6ef58e09df3f9264fb8c2497e3011f84bdabfd750b7348c'
    }

    get asV100(): {spaceId: bigint, update: v100.SpaceUpdate} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {new: v100.MultiAddress} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === 'dc52f07cb39a0788f342673c9a1c29e09613e092a7844c8518283b14e4f62ea3'
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
    get asV100(): {call: v100.Call} {
        assert(this.isV100)
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
    get isV101(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '92f8b3bd61c6ced0b61bd4bff00f651f541e8387904e107ce5f7b713fcef1527'
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
    get asV101(): {call: v101.Call} {
        assert(this.isV101)
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
    get isV102(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === 'f887516c91151f54066de5779aa1053746d9430234c51b4af323b3a7de6dec2e'
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
    get asV102(): {call: v102.Call} {
        assert(this.isV102)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '7acd6dc9ea59ba59b9c66a7efbeee2e797eaa8ac4f9f3e38d9ca5da5bd1de717'
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
    get asV100(): {who: v100.MultiAddress, call: v100.Call} {
        assert(this.isV100)
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
    get isV101(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '9f6beb281defa5b8fe1e178983df9ce8b2c8aad4805d6cfd2443dd1042275f83'
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
    get asV101(): {who: v101.MultiAddress, call: v101.Call} {
        assert(this.isV101)
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
    get isV102(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '315412e588acb509a877788a3b27532424afc135157b35212ebbf2c98f07c154'
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
    get asV102(): {who: v102.MultiAddress, call: v102.Call} {
        assert(this.isV102)
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
    get isV100(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '500d9a17e50217ccee5813091ce9db9a1d12a291463051f33437bfdfe8497838'
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
    get asV100(): {call: v100.Call, weight: v100.Weight} {
        assert(this.isV100)
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
    get isV101(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '3500f85b6422fcc69d11537b254a3ec04d357e8476973278015af7351a0f9c88'
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
    get asV101(): {call: v101.Call, weight: v101.Weight} {
        assert(this.isV101)
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
    get isV102(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === 'c1efcc21573da118d56fddc179d90675a36be52c376f2dcd90eeb8cd8c066dc0'
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
    get asV102(): {call: v102.Call, weight: v102.Weight} {
        assert(this.isV102)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.kill_prefix') === 'dfbadd42bee8b18fc81cf78683511061181cffbf7a8ebfd3e5719c389b373d93'
    }

    /**
     * Kill all storage items with a key that starts with the given prefix.
     * 
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    get asV100(): {prefix: Uint8Array, subkeys: number} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.kill_storage') === 'eac21dc14e927c003d9c634fb019d04128f71f8529d2914b10a56b85289c2c11'
    }

    /**
     * Kill some items from storage.
     */
    get asV100(): {keys: Uint8Array[]} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark.
     * 
     * # <weight>
     * - `O(1)`
     * # </weight>
     */
    get asV100(): {remark: Uint8Array} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.remark_with_event') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark and emit event.
     */
    get asV100(): {remark: Uint8Array} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {code: Uint8Array} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {code: Uint8Array} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.set_heap_pages') === '130172e47c5e517627712b4d084768b98489d920284223ea8ef9c462339b5808'
    }

    /**
     * Set the number of pages in the WebAssembly environment's heap.
     */
    get asV100(): {pages: bigint} {
        assert(this.isV100)
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
    get isV100(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     * Set some items of storage.
     */
    get asV100(): {items: [Uint8Array, Uint8Array][]} {
        assert(this.isV100)
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
    get isV100(): boolean {
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
    get asV100(): {now: bigint} {
        assert(this.isV100)
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
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === '302f98568e7e5e46fe9bdabb4a6a5175647ee951a4a9cc365137ef4b65065392'
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
    get asV102(): {index: number, call: v102.Call} {
        assert(this.isV102)
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
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
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
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.batch') === '73bd506dbcb956a912353db4667213849493917dac519197d8a7a091f60a167a'
    }

    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
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
    get asV102(): {calls: v102.Call[]} {
        assert(this.isV102)
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
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === '73bd506dbcb956a912353db4667213849493917dac519197d8a7a091f60a167a'
    }

    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV102(): {calls: v102.Call[]} {
        assert(this.isV102)
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
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === '7d82b30ee2c5412860db1370c234d6fbbabdafd13a20f763d01faea4a9e49a25'
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
    get asV102(): {asOrigin: v102.OriginCaller, call: v102.Call} {
        assert(this.isV102)
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
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatch without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === '73bd506dbcb956a912353db4667213849493917dac519197d8a7a091f60a167a'
    }

    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatch without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * # <weight>
     * - Complexity: O(C) where C is the number of calls to be batched.
     * # </weight>
     */
    get asV102(): {calls: v102.Call[]} {
        assert(this.isV102)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityWithWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.with_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Dispatch a function call with a specified weight.
     * 
     * This function does not check the weight of the call, and instead allows the
     * Root origin to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Root_.
     */
    get isV102(): boolean {
        return this._chain.getCallHash('Utility.with_weight') === 'c1efcc21573da118d56fddc179d90675a36be52c376f2dcd90eeb8cd8c066dc0'
    }

    /**
     * Dispatch a function call with a specified weight.
     * 
     * This function does not check the weight of the call, and instead allows the
     * Root origin to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Root_.
     */
    get asV102(): {call: v102.Call, weight: v102.Weight} {
        assert(this.isV102)
        return this._chain.decodeCall(this.call)
    }
}
