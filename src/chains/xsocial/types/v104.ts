import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        AccountFollows: AccountFollowsCall,
        Balances: BalancesCall,
        Energy: EnergyCall,
        EvmAccounts: EvmAccountsCall,
        Grandpa: GrandpaCall,
        Posts: PostsCall,
        Profiles: ProfilesCall,
        Proxy: ProxyCall,
        Reactions: ReactionsCall,
        ResourceDiscussions: ResourceDiscussionsCall,
        Roles: RolesCall,
        SpaceFollows: SpaceFollowsCall,
        SpaceOwnership: SpaceOwnershipCall,
        Spaces: SpacesCall,
        Sudo: SudoCall,
        System: SystemCall,
        Timestamp: TimestampCall,
        Utility: UtilityCall,
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const UtilityCall: sts.Type<UtilityCall> = sts.closedEnum(() => {
    return  {
        as_derivative: sts.enumStruct({
            index: sts.number(),
            call: Call,
        }),
        batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        batch_all: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        dispatch_as: sts.enumStruct({
            asOrigin: OriginCaller,
            call: Call,
        }),
        force_batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        with_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export const OriginCaller: sts.Type<OriginCaller> = sts.closedEnum(() => {
    return  {
        Void: Void,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId32,
    }
})

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId32
}

export type AccountId32 = Bytes

export const Void: sts.Type<Void> = sts.closedEnum(() => {
    return  {
    }
})

export type Void = never

export type OriginCaller = OriginCaller_Void | OriginCaller_system

export interface OriginCaller_Void {
    __kind: 'Void'
    value: Void
}

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type UtilityCall = UtilityCall_as_derivative | UtilityCall_batch | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

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
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
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
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
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
export interface UtilityCall_batch_all {
    __kind: 'batch_all'
    calls: Call[]
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
export interface UtilityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: OriginCaller
    call: Call
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
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * Dispatch a function call with a specified weight.
 * 
 * This function does not check the weight of the call, and instead allows the
 * Root origin to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Root_.
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const TimestampCall: sts.Type<TimestampCall> = sts.closedEnum(() => {
    return  {
        set: sts.enumStruct({
            now: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type TimestampCall = TimestampCall_set

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
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SystemCall: sts.Type<SystemCall> = sts.closedEnum(() => {
    return  {
        kill_prefix: sts.enumStruct({
            prefix: sts.bytes(),
            subkeys: sts.number(),
        }),
        kill_storage: sts.enumStruct({
            keys: sts.array(() => sts.bytes()),
        }),
        remark: sts.enumStruct({
            remark: sts.bytes(),
        }),
        remark_with_event: sts.enumStruct({
            remark: sts.bytes(),
        }),
        set_code: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_code_without_checks: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_heap_pages: sts.enumStruct({
            pages: sts.bigint(),
        }),
        set_storage: sts.enumStruct({
            items: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SystemCall = SystemCall_kill_prefix | SystemCall_kill_storage | SystemCall_remark | SystemCall_remark_with_event | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_heap_pages | SystemCall_set_storage

/**
 * Kill all storage items with a key that starts with the given prefix.
 * 
 * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 * the prefix we are removing to accurately calculate the weight of this function.
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Bytes
    subkeys: number
}

/**
 * Kill some items from storage.
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Bytes[]
}

/**
 * Make some on-chain remark.
 * 
 * # <weight>
 * - `O(1)`
 * # </weight>
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Bytes
}

/**
 * Make some on-chain remark and emit event.
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Bytes
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
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Bytes
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
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Bytes
}

/**
 * Set the number of pages in the WebAssembly environment's heap.
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * Set some items of storage.
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Bytes, Bytes][]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SudoCall: sts.Type<SudoCall> = sts.closedEnum(() => {
    return  {
        set_key: sts.enumStruct({
            new: MultiAddress,
        }),
        sudo: sts.enumStruct({
            call: Call,
        }),
        sudo_as: sts.enumStruct({
            who: MultiAddress,
            call: Call,
        }),
        sudo_unchecked_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SudoCall = SudoCall_set_key | SudoCall_sudo | SudoCall_sudo_as | SudoCall_sudo_unchecked_weight

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
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: MultiAddress
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
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
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
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: MultiAddress
    call: Call
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
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

export type MultiAddress = MultiAddress_Address20 | MultiAddress_Address32 | MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw

export interface MultiAddress_Address20 {
    __kind: 'Address20'
    value: Bytes
}

export interface MultiAddress_Address32 {
    __kind: 'Address32'
    value: Bytes
}

export interface MultiAddress_Id {
    __kind: 'Id'
    value: AccountId32
}

export interface MultiAddress_Index {
    __kind: 'Index'
}

export interface MultiAddress_Raw {
    __kind: 'Raw'
    value: Bytes
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SpacesCall: sts.Type<SpacesCall> = sts.closedEnum(() => {
    return  {
        create_space: sts.enumStruct({
            content: Content,
            permissionsOpt: sts.option(() => SpacePermissions),
        }),
        force_create_space: sts.enumStruct({
            spaceId: sts.bigint(),
            created: WhoAndWhen,
            owner: AccountId32,
            content: Content,
            hidden: sts.boolean(),
            permissionsOpt: sts.option(() => SpacePermissions),
        }),
        force_set_next_space_id: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
        update_space: sts.enumStruct({
            spaceId: sts.bigint(),
            update: SpaceUpdate,
        }),
    }
})

export const SpaceUpdate: sts.Type<SpaceUpdate> = sts.struct(() => {
    return  {
        content: sts.option(() => Content),
        hidden: sts.option(() => sts.boolean()),
        permissions: sts.enumOption(() => sts.option(() => SpacePermissions)),
    }
})

export interface SpaceUpdate {
    content?: (Content | undefined)
    hidden?: (boolean | undefined)
    permissions: Option<(SpacePermissions | undefined)>
}

export interface SpacePermissions {
    none?: (SpacePermission[] | undefined)
    everyone?: (SpacePermission[] | undefined)
    follower?: (SpacePermission[] | undefined)
    spaceOwner?: (SpacePermission[] | undefined)
}

export type SpacePermission = SpacePermission_CreateComments | SpacePermission_CreatePosts | SpacePermission_CreateSubspaces | SpacePermission_DeleteAnyPost | SpacePermission_DeleteAnySubspace | SpacePermission_DeleteOwnComments | SpacePermission_DeleteOwnPosts | SpacePermission_DeleteOwnSubspaces | SpacePermission_Downvote | SpacePermission_HideAnyComment | SpacePermission_HideAnyPost | SpacePermission_HideAnySubspace | SpacePermission_HideOwnComments | SpacePermission_HideOwnPosts | SpacePermission_HideOwnSubspaces | SpacePermission_ManageRoles | SpacePermission_OverridePostPermissions | SpacePermission_OverrideSubspacePermissions | SpacePermission_RepresentSpaceExternally | SpacePermission_RepresentSpaceInternally | SpacePermission_Share | SpacePermission_SuggestEntityStatus | SpacePermission_UpdateAnyPost | SpacePermission_UpdateAnySubspace | SpacePermission_UpdateEntityStatus | SpacePermission_UpdateOwnComments | SpacePermission_UpdateOwnPosts | SpacePermission_UpdateOwnSubspaces | SpacePermission_UpdateSpace | SpacePermission_UpdateSpaceSettings | SpacePermission_Upvote

export interface SpacePermission_CreateComments {
    __kind: 'CreateComments'
}

export interface SpacePermission_CreatePosts {
    __kind: 'CreatePosts'
}

export interface SpacePermission_CreateSubspaces {
    __kind: 'CreateSubspaces'
}

export interface SpacePermission_DeleteAnyPost {
    __kind: 'DeleteAnyPost'
}

export interface SpacePermission_DeleteAnySubspace {
    __kind: 'DeleteAnySubspace'
}

export interface SpacePermission_DeleteOwnComments {
    __kind: 'DeleteOwnComments'
}

export interface SpacePermission_DeleteOwnPosts {
    __kind: 'DeleteOwnPosts'
}

export interface SpacePermission_DeleteOwnSubspaces {
    __kind: 'DeleteOwnSubspaces'
}

export interface SpacePermission_Downvote {
    __kind: 'Downvote'
}

export interface SpacePermission_HideAnyComment {
    __kind: 'HideAnyComment'
}

export interface SpacePermission_HideAnyPost {
    __kind: 'HideAnyPost'
}

export interface SpacePermission_HideAnySubspace {
    __kind: 'HideAnySubspace'
}

export interface SpacePermission_HideOwnComments {
    __kind: 'HideOwnComments'
}

export interface SpacePermission_HideOwnPosts {
    __kind: 'HideOwnPosts'
}

export interface SpacePermission_HideOwnSubspaces {
    __kind: 'HideOwnSubspaces'
}

export interface SpacePermission_ManageRoles {
    __kind: 'ManageRoles'
}

export interface SpacePermission_OverridePostPermissions {
    __kind: 'OverridePostPermissions'
}

export interface SpacePermission_OverrideSubspacePermissions {
    __kind: 'OverrideSubspacePermissions'
}

export interface SpacePermission_RepresentSpaceExternally {
    __kind: 'RepresentSpaceExternally'
}

export interface SpacePermission_RepresentSpaceInternally {
    __kind: 'RepresentSpaceInternally'
}

export interface SpacePermission_Share {
    __kind: 'Share'
}

export interface SpacePermission_SuggestEntityStatus {
    __kind: 'SuggestEntityStatus'
}

export interface SpacePermission_UpdateAnyPost {
    __kind: 'UpdateAnyPost'
}

export interface SpacePermission_UpdateAnySubspace {
    __kind: 'UpdateAnySubspace'
}

export interface SpacePermission_UpdateEntityStatus {
    __kind: 'UpdateEntityStatus'
}

export interface SpacePermission_UpdateOwnComments {
    __kind: 'UpdateOwnComments'
}

export interface SpacePermission_UpdateOwnPosts {
    __kind: 'UpdateOwnPosts'
}

export interface SpacePermission_UpdateOwnSubspaces {
    __kind: 'UpdateOwnSubspaces'
}

export interface SpacePermission_UpdateSpace {
    __kind: 'UpdateSpace'
}

export interface SpacePermission_UpdateSpaceSettings {
    __kind: 'UpdateSpaceSettings'
}

export interface SpacePermission_Upvote {
    __kind: 'Upvote'
}

export type Content = Content_IPFS | Content_None | Content_Other

export interface Content_IPFS {
    __kind: 'IPFS'
    value: Bytes
}

export interface Content_None {
    __kind: 'None'
}

export interface Content_Other {
    __kind: 'Other'
    value: Bytes
}

export const WhoAndWhen: sts.Type<WhoAndWhen> = sts.struct(() => {
    return  {
        account: AccountId32,
        block: sts.number(),
        time: sts.bigint(),
    }
})

export interface WhoAndWhen {
    account: AccountId32
    block: number
    time: bigint
}

export const SpacePermissions: sts.Type<SpacePermissions> = sts.struct(() => {
    return  {
        none: sts.option(() => sts.array(() => SpacePermission)),
        everyone: sts.option(() => sts.array(() => SpacePermission)),
        follower: sts.option(() => sts.array(() => SpacePermission)),
        spaceOwner: sts.option(() => sts.array(() => SpacePermission)),
    }
})

export const SpacePermission: sts.Type<SpacePermission> = sts.closedEnum(() => {
    return  {
        CreateComments: sts.unit(),
        CreatePosts: sts.unit(),
        CreateSubspaces: sts.unit(),
        DeleteAnyPost: sts.unit(),
        DeleteAnySubspace: sts.unit(),
        DeleteOwnComments: sts.unit(),
        DeleteOwnPosts: sts.unit(),
        DeleteOwnSubspaces: sts.unit(),
        Downvote: sts.unit(),
        HideAnyComment: sts.unit(),
        HideAnyPost: sts.unit(),
        HideAnySubspace: sts.unit(),
        HideOwnComments: sts.unit(),
        HideOwnPosts: sts.unit(),
        HideOwnSubspaces: sts.unit(),
        ManageRoles: sts.unit(),
        OverridePostPermissions: sts.unit(),
        OverrideSubspacePermissions: sts.unit(),
        RepresentSpaceExternally: sts.unit(),
        RepresentSpaceInternally: sts.unit(),
        Share: sts.unit(),
        SuggestEntityStatus: sts.unit(),
        UpdateAnyPost: sts.unit(),
        UpdateAnySubspace: sts.unit(),
        UpdateEntityStatus: sts.unit(),
        UpdateOwnComments: sts.unit(),
        UpdateOwnPosts: sts.unit(),
        UpdateOwnSubspaces: sts.unit(),
        UpdateSpace: sts.unit(),
        UpdateSpaceSettings: sts.unit(),
        Upvote: sts.unit(),
    }
})

export const Content: sts.Type<Content> = sts.closedEnum(() => {
    return  {
        IPFS: sts.bytes(),
        None: sts.unit(),
        Other: sts.bytes(),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SpacesCall = SpacesCall_create_space | SpacesCall_force_create_space | SpacesCall_force_set_next_space_id | SpacesCall_update_space

export interface SpacesCall_create_space {
    __kind: 'create_space'
    content: Content
    permissionsOpt?: (SpacePermissions | undefined)
}

export interface SpacesCall_force_create_space {
    __kind: 'force_create_space'
    spaceId: bigint
    created: WhoAndWhen
    owner: AccountId32
    content: Content
    hidden: boolean
    permissionsOpt?: (SpacePermissions | undefined)
}

export interface SpacesCall_force_set_next_space_id {
    __kind: 'force_set_next_space_id'
    spaceId: bigint
}

export interface SpacesCall_update_space {
    __kind: 'update_space'
    spaceId: bigint
    update: SpaceUpdate
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SpaceOwnershipCall: sts.Type<SpaceOwnershipCall> = sts.closedEnum(() => {
    return  {
        accept_pending_ownership: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
        reject_pending_ownership: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
        transfer_space_ownership: sts.enumStruct({
            spaceId: sts.bigint(),
            transferTo: AccountId32,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SpaceOwnershipCall = SpaceOwnershipCall_accept_pending_ownership | SpaceOwnershipCall_reject_pending_ownership | SpaceOwnershipCall_transfer_space_ownership

export interface SpaceOwnershipCall_accept_pending_ownership {
    __kind: 'accept_pending_ownership'
    spaceId: bigint
}

export interface SpaceOwnershipCall_reject_pending_ownership {
    __kind: 'reject_pending_ownership'
    spaceId: bigint
}

export interface SpaceOwnershipCall_transfer_space_ownership {
    __kind: 'transfer_space_ownership'
    spaceId: bigint
    transferTo: AccountId32
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SpaceFollowsCall: sts.Type<SpaceFollowsCall> = sts.closedEnum(() => {
    return  {
        follow_space: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
        force_follow_space: sts.enumStruct({
            follower: AccountId32,
            spaceId: sts.bigint(),
        }),
        unfollow_space: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SpaceFollowsCall = SpaceFollowsCall_follow_space | SpaceFollowsCall_force_follow_space | SpaceFollowsCall_unfollow_space

export interface SpaceFollowsCall_follow_space {
    __kind: 'follow_space'
    spaceId: bigint
}

export interface SpaceFollowsCall_force_follow_space {
    __kind: 'force_follow_space'
    follower: AccountId32
    spaceId: bigint
}

export interface SpaceFollowsCall_unfollow_space {
    __kind: 'unfollow_space'
    spaceId: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const RolesCall: sts.Type<RolesCall> = sts.closedEnum(() => {
    return  {
        create_role: sts.enumStruct({
            spaceId: sts.bigint(),
            timeToLive: sts.option(() => sts.number()),
            content: Content,
            permissions: sts.array(() => SpacePermission),
        }),
        delete_role: sts.enumStruct({
            roleId: sts.bigint(),
            userCount: sts.number(),
        }),
        force_create_role: sts.enumStruct({
            created: WhoAndWhen,
            roleId: sts.bigint(),
            spaceId: sts.bigint(),
            disabled: sts.boolean(),
            content: Content,
            permissions: sts.array(() => SpacePermission),
        }),
        force_grant_role: sts.enumStruct({
            roleId: sts.bigint(),
            users: sts.array(() => User),
        }),
        force_set_next_role_id: sts.enumStruct({
            roleId: sts.bigint(),
        }),
        grant_role: sts.enumStruct({
            roleId: sts.bigint(),
            users: sts.array(() => User),
        }),
        revoke_role: sts.enumStruct({
            roleId: sts.bigint(),
            users: sts.array(() => User),
        }),
        update_role: sts.enumStruct({
            roleId: sts.bigint(),
            update: RoleUpdate,
        }),
    }
})

export const RoleUpdate: sts.Type<RoleUpdate> = sts.struct(() => {
    return  {
        disabled: sts.option(() => sts.boolean()),
        content: sts.option(() => Content),
        permissions: sts.option(() => sts.array(() => SpacePermission)),
    }
})

export interface RoleUpdate {
    disabled?: (boolean | undefined)
    content?: (Content | undefined)
    permissions?: (SpacePermission[] | undefined)
}

export const User: sts.Type<User> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        Space: sts.bigint(),
    }
})

export type User = User_Account | User_Space

export interface User_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface User_Space {
    __kind: 'Space'
    value: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type RolesCall = RolesCall_create_role | RolesCall_delete_role | RolesCall_force_create_role | RolesCall_force_grant_role | RolesCall_force_set_next_role_id | RolesCall_grant_role | RolesCall_revoke_role | RolesCall_update_role

/**
 * Create a new role, with a list of permissions, within a given space.
 * 
 * `content` can optionally contain additional information associated with a role,
 * such as a name, description, and image for a role. This may be useful for end users.
 * 
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_create_role {
    __kind: 'create_role'
    spaceId: bigint
    timeToLive?: (number | undefined)
    content: Content
    permissions: SpacePermission[]
}

/**
 * Delete a given role and clean all associated storage items.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_delete_role {
    __kind: 'delete_role'
    roleId: bigint
    userCount: number
}

export interface RolesCall_force_create_role {
    __kind: 'force_create_role'
    created: WhoAndWhen
    roleId: bigint
    spaceId: bigint
    disabled: boolean
    content: Content
    permissions: SpacePermission[]
}

export interface RolesCall_force_grant_role {
    __kind: 'force_grant_role'
    roleId: bigint
    users: User[]
}

export interface RolesCall_force_set_next_role_id {
    __kind: 'force_set_next_role_id'
    roleId: bigint
}

/**
 * Grant a given role to a list of users.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_grant_role {
    __kind: 'grant_role'
    roleId: bigint
    users: User[]
}

/**
 * Revoke a given role from a list of users.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_revoke_role {
    __kind: 'revoke_role'
    roleId: bigint
    users: User[]
}

/**
 * Update an existing role by a given id.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_update_role {
    __kind: 'update_role'
    roleId: bigint
    update: RoleUpdate
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ResourceDiscussionsCall: sts.Type<ResourceDiscussionsCall> = sts.closedEnum(() => {
    return  {
        create_resource_discussion: sts.enumStruct({
            resourceId: BoundedVec,
            spaceId: sts.bigint(),
            content: Content,
        }),
        link_post_to_resource: sts.enumStruct({
            resourceId: BoundedVec,
            postId: sts.bigint(),
        }),
    }
})

export const BoundedVec = sts.bytes()

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ResourceDiscussionsCall = ResourceDiscussionsCall_create_resource_discussion | ResourceDiscussionsCall_link_post_to_resource

export interface ResourceDiscussionsCall_create_resource_discussion {
    __kind: 'create_resource_discussion'
    resourceId: BoundedVec
    spaceId: bigint
    content: Content
}

export interface ResourceDiscussionsCall_link_post_to_resource {
    __kind: 'link_post_to_resource'
    resourceId: BoundedVec
    postId: bigint
}

export type BoundedVec = Bytes

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ReactionsCall: sts.Type<ReactionsCall> = sts.closedEnum(() => {
    return  {
        create_post_reaction: sts.enumStruct({
            postId: sts.bigint(),
            kind: ReactionKind,
        }),
        delete_post_reaction: sts.enumStruct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
        }),
        force_create_post_reaction: sts.enumStruct({
            who: AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            created: WhoAndWhen,
            reactionKind: ReactionKind,
        }),
        force_delete_post_reaction: sts.enumStruct({
            reactionId: sts.bigint(),
            postId: sts.bigint(),
            who: AccountId32,
        }),
        force_set_next_reaction_id: sts.enumStruct({
            reactionId: sts.bigint(),
        }),
        update_post_reaction: sts.enumStruct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            newKind: ReactionKind,
        }),
    }
})

export const ReactionKind: sts.Type<ReactionKind> = sts.closedEnum(() => {
    return  {
        Downvote: sts.unit(),
        Upvote: sts.unit(),
    }
})

export type ReactionKind = ReactionKind_Downvote | ReactionKind_Upvote

export interface ReactionKind_Downvote {
    __kind: 'Downvote'
}

export interface ReactionKind_Upvote {
    __kind: 'Upvote'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ReactionsCall = ReactionsCall_create_post_reaction | ReactionsCall_delete_post_reaction | ReactionsCall_force_create_post_reaction | ReactionsCall_force_delete_post_reaction | ReactionsCall_force_set_next_reaction_id | ReactionsCall_update_post_reaction

export interface ReactionsCall_create_post_reaction {
    __kind: 'create_post_reaction'
    postId: bigint
    kind: ReactionKind
}

export interface ReactionsCall_delete_post_reaction {
    __kind: 'delete_post_reaction'
    postId: bigint
    reactionId: bigint
}

export interface ReactionsCall_force_create_post_reaction {
    __kind: 'force_create_post_reaction'
    who: AccountId32
    postId: bigint
    reactionId: bigint
    created: WhoAndWhen
    reactionKind: ReactionKind
}

export interface ReactionsCall_force_delete_post_reaction {
    __kind: 'force_delete_post_reaction'
    reactionId: bigint
    postId: bigint
    who: AccountId32
}

export interface ReactionsCall_force_set_next_reaction_id {
    __kind: 'force_set_next_reaction_id'
    reactionId: bigint
}

export interface ReactionsCall_update_post_reaction {
    __kind: 'update_post_reaction'
    postId: bigint
    reactionId: bigint
    newKind: ReactionKind
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ProxyCall: sts.Type<ProxyCall> = sts.closedEnum(() => {
    return  {
        add_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
        announce: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        create_pure: sts.enumStruct({
            proxyType: ProxyType,
            delay: sts.number(),
            index: sts.number(),
        }),
        kill_pure: sts.enumStruct({
            spawner: MultiAddress,
            proxyType: ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        }),
        proxy: sts.enumStruct({
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        proxy_announced: sts.enumStruct({
            delegate: MultiAddress,
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        reject_announcement: sts.enumStruct({
            delegate: MultiAddress,
            callHash: H256,
        }),
        remove_announcement: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        remove_proxies: sts.unit(),
        remove_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
    }
})

export const H256 = sts.bytes()

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ProxyCall = ProxyCall_add_proxy | ProxyCall_announce | ProxyCall_create_pure | ProxyCall_kill_pure | ProxyCall_proxy | ProxyCall_proxy_announced | ProxyCall_reject_announcement | ProxyCall_remove_announcement | ProxyCall_remove_proxies | ProxyCall_remove_proxy

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
export interface ProxyCall_add_proxy {
    __kind: 'add_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
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
export interface ProxyCall_announce {
    __kind: 'announce'
    real: MultiAddress
    callHash: H256
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
export interface ProxyCall_create_pure {
    __kind: 'create_pure'
    proxyType: ProxyType
    delay: number
    index: number
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
export interface ProxyCall_kill_pure {
    __kind: 'kill_pure'
    spawner: MultiAddress
    proxyType: ProxyType
    index: number
    height: number
    extIndex: number
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
export interface ProxyCall_proxy {
    __kind: 'proxy'
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
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
export interface ProxyCall_proxy_announced {
    __kind: 'proxy_announced'
    delegate: MultiAddress
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
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
export interface ProxyCall_reject_announcement {
    __kind: 'reject_announcement'
    delegate: MultiAddress
    callHash: H256
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
export interface ProxyCall_remove_announcement {
    __kind: 'remove_announcement'
    real: MultiAddress
    callHash: H256
}

/**
 * Unregister all proxy accounts for the sender.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * WARNING: This may be called on accounts created by `pure`, however if done, then
 * the unreserved fees will be inaccessible. **All access to this account will be lost.**
 */
export interface ProxyCall_remove_proxies {
    __kind: 'remove_proxies'
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
export interface ProxyCall_remove_proxy {
    __kind: 'remove_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

export type H256 = Bytes

export type ProxyType = ProxyType_Any | ProxyType_DomainRegistrar | ProxyType_Management | ProxyType_SocialActions | ProxyType_SocialActionsProxy

export interface ProxyType_Any {
    __kind: 'Any'
}

export interface ProxyType_DomainRegistrar {
    __kind: 'DomainRegistrar'
}

export interface ProxyType_Management {
    __kind: 'Management'
}

export interface ProxyType_SocialActions {
    __kind: 'SocialActions'
}

export interface ProxyType_SocialActionsProxy {
    __kind: 'SocialActionsProxy'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ProfilesCall: sts.Type<ProfilesCall> = sts.closedEnum(() => {
    return  {
        create_space_as_profile: sts.enumStruct({
            content: Content,
        }),
        reset_profile: sts.unit(),
        set_profile: sts.enumStruct({
            spaceId: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ProfilesCall = ProfilesCall_create_space_as_profile | ProfilesCall_reset_profile | ProfilesCall_set_profile

export interface ProfilesCall_create_space_as_profile {
    __kind: 'create_space_as_profile'
    content: Content
}

export interface ProfilesCall_reset_profile {
    __kind: 'reset_profile'
}

export interface ProfilesCall_set_profile {
    __kind: 'set_profile'
    spaceId: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const PostsCall: sts.Type<PostsCall> = sts.closedEnum(() => {
    return  {
        create_post: sts.enumStruct({
            spaceIdOpt: sts.option(() => sts.bigint()),
            extension: PostExtension,
            content: Content,
        }),
        force_create_post: sts.enumStruct({
            postId: sts.bigint(),
            created: WhoAndWhen,
            owner: AccountId32,
            extension: PostExtension,
            spaceIdOpt: sts.option(() => sts.bigint()),
            content: Content,
            hidden: sts.boolean(),
            upvotesCount: sts.number(),
            downvotesCount: sts.number(),
        }),
        force_remove_post: sts.enumStruct({
            postId: sts.bigint(),
        }),
        force_set_next_post_id: sts.enumStruct({
            postId: sts.bigint(),
        }),
        move_post: sts.enumStruct({
            postId: sts.bigint(),
            newSpaceId: sts.option(() => sts.bigint()),
        }),
        update_post: sts.enumStruct({
            postId: sts.bigint(),
            update: PostUpdate,
        }),
    }
})

export const PostUpdate: sts.Type<PostUpdate> = sts.struct(() => {
    return  {
        spaceId: sts.option(() => sts.bigint()),
        content: sts.option(() => Content),
        hidden: sts.option(() => sts.boolean()),
    }
})

export interface PostUpdate {
    spaceId?: (bigint | undefined)
    content?: (Content | undefined)
    hidden?: (boolean | undefined)
}

export const PostExtension: sts.Type<PostExtension> = sts.closedEnum(() => {
    return  {
        Comment: Comment,
        RegularPost: sts.unit(),
        SharedPost: sts.bigint(),
    }
})

export const Comment: sts.Type<Comment> = sts.struct(() => {
    return  {
        rootPostId: sts.bigint(),
        parentId: sts.option(() => sts.bigint()),
    }
})

export interface Comment {
    rootPostId: bigint
    parentId?: (bigint | undefined)
}

export type PostExtension = PostExtension_Comment | PostExtension_RegularPost | PostExtension_SharedPost

export interface PostExtension_Comment {
    __kind: 'Comment'
    value: Comment
}

export interface PostExtension_RegularPost {
    __kind: 'RegularPost'
}

export interface PostExtension_SharedPost {
    __kind: 'SharedPost'
    value: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type PostsCall = PostsCall_create_post | PostsCall_force_create_post | PostsCall_force_remove_post | PostsCall_force_set_next_post_id | PostsCall_move_post | PostsCall_update_post

export interface PostsCall_create_post {
    __kind: 'create_post'
    spaceIdOpt?: (bigint | undefined)
    extension: PostExtension
    content: Content
}

export interface PostsCall_force_create_post {
    __kind: 'force_create_post'
    postId: bigint
    created: WhoAndWhen
    owner: AccountId32
    extension: PostExtension
    spaceIdOpt?: (bigint | undefined)
    content: Content
    hidden: boolean
    upvotesCount: number
    downvotesCount: number
}

export interface PostsCall_force_remove_post {
    __kind: 'force_remove_post'
    postId: bigint
}

export interface PostsCall_force_set_next_post_id {
    __kind: 'force_set_next_post_id'
    postId: bigint
}

export interface PostsCall_move_post {
    __kind: 'move_post'
    postId: bigint
    newSpaceId?: (bigint | undefined)
}

export interface PostsCall_update_post {
    __kind: 'update_post'
    postId: bigint
    update: PostUpdate
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const GrandpaCall: sts.Type<GrandpaCall> = sts.closedEnum(() => {
    return  {
        note_stalled: sts.enumStruct({
            delay: sts.number(),
            bestFinalizedBlockNumber: sts.number(),
        }),
        report_equivocation: sts.enumStruct({
            equivocationProof: EquivocationProof,
            keyOwnerProof: Void,
        }),
        report_equivocation_unsigned: sts.enumStruct({
            equivocationProof: EquivocationProof,
            keyOwnerProof: Void,
        }),
    }
})

export const EquivocationProof: sts.Type<EquivocationProof> = sts.struct(() => {
    return  {
        setId: sts.bigint(),
        equivocation: Equivocation,
    }
})

export const Equivocation: sts.Type<Equivocation> = sts.closedEnum(() => {
    return  {
        Precommit: Type_110,
        Prevote: Type_104,
    }
})

export const Type_104: sts.Type<Type_104> = sts.struct(() => {
    return  {
        roundNumber: sts.bigint(),
        identity: Public,
        first: sts.tuple(() => [Prevote, Signature]),
        second: sts.tuple(() => [Prevote, Signature]),
    }
})

export const Signature = sts.bytes()

export const Prevote: sts.Type<Prevote> = sts.struct(() => {
    return  {
        targetHash: H256,
        targetNumber: sts.number(),
    }
})

export interface Prevote {
    targetHash: H256
    targetNumber: number
}

export const Public = sts.bytes()

export interface Type_104 {
    roundNumber: bigint
    identity: Public
    first: [Prevote, Signature]
    second: [Prevote, Signature]
}

export type Signature = Bytes

export type Public = Bytes

export const Type_110: sts.Type<Type_110> = sts.struct(() => {
    return  {
        roundNumber: sts.bigint(),
        identity: Public,
        first: sts.tuple(() => [Precommit, Signature]),
        second: sts.tuple(() => [Precommit, Signature]),
    }
})

export const Precommit: sts.Type<Precommit> = sts.struct(() => {
    return  {
        targetHash: H256,
        targetNumber: sts.number(),
    }
})

export interface Precommit {
    targetHash: H256
    targetNumber: number
}

export interface Type_110 {
    roundNumber: bigint
    identity: Public
    first: [Precommit, Signature]
    second: [Precommit, Signature]
}

export type Equivocation = Equivocation_Precommit | Equivocation_Prevote

export interface Equivocation_Precommit {
    __kind: 'Precommit'
    value: Type_110
}

export interface Equivocation_Prevote {
    __kind: 'Prevote'
    value: Type_104
}

export interface EquivocationProof {
    setId: bigint
    equivocation: Equivocation
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type GrandpaCall = GrandpaCall_note_stalled | GrandpaCall_report_equivocation | GrandpaCall_report_equivocation_unsigned

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
export interface GrandpaCall_note_stalled {
    __kind: 'note_stalled'
    delay: number
    bestFinalizedBlockNumber: number
}

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 */
export interface GrandpaCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: EquivocationProof
    keyOwnerProof: Void
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
export interface GrandpaCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: EquivocationProof
    keyOwnerProof: Void
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const EvmAccountsCall: sts.Type<EvmAccountsCall> = sts.closedEnum(() => {
    return  {
        link_evm_address: sts.enumStruct({
            evmAddress: H160,
            evmSignature: sts.bytes(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EvmAccountsCall = EvmAccountsCall_link_evm_address

/**
 * Link substrate address to EVM address.
 */
export interface EvmAccountsCall_link_evm_address {
    __kind: 'link_evm_address'
    evmAddress: H160
    evmSignature: Bytes
}

export type H160 = Bytes

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const EnergyCall: sts.Type<EnergyCall> = sts.closedEnum(() => {
    return  {
        generate_energy: sts.enumStruct({
            target: MultiAddress,
            burnAmount: sts.bigint(),
        }),
        update_value_coefficient: sts.enumStruct({
            newCoefficient: FixedI64,
        }),
    }
})

export const FixedI64 = sts.bigint()

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EnergyCall = EnergyCall_generate_energy | EnergyCall_update_value_coefficient

/**
 * Generate energy for a target account by burning balance from the caller.
 */
export interface EnergyCall_generate_energy {
    __kind: 'generate_energy'
    target: MultiAddress
    burnAmount: bigint
}

/**
 * Updates the value coefficient. Only callable by the `UpdateOrigin`.
 */
export interface EnergyCall_update_value_coefficient {
    __kind: 'update_value_coefficient'
    newCoefficient: FixedI64
}

export type FixedI64 = bigint

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const BalancesCall: sts.Type<BalancesCall> = sts.closedEnum(() => {
    return  {
        force_transfer: sts.enumStruct({
            source: MultiAddress,
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: MultiAddress,
            amount: sts.bigint(),
        }),
        set_balance: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
            newReserved: sts.bigint(),
        }),
        transfer: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: MultiAddress,
            keepAlive: sts.boolean(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BalancesCall = BalancesCall_force_transfer | BalancesCall_force_unreserve | BalancesCall_set_balance | BalancesCall_transfer | BalancesCall_transfer_all | BalancesCall_transfer_keep_alive

/**
 * Exactly as `transfer`, except the origin must be root and the source account may be
 * specified.
 * # <weight>
 * - Same as transfer, but additional read and write because the source account is not
 *   assumed to be in the overlay.
 * # </weight>
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
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
export interface BalancesCall_set_balance {
    __kind: 'set_balance'
    who: MultiAddress
    newFree: bigint
    newReserved: bigint
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
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: MultiAddress
    value: bigint
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
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * Same as the [`transfer`] call, but with a check that the transfer will not kill the
 * origin account.
 * 
 * 99% of the time you want [`transfer`] instead.
 * 
 * [`transfer`]: struct.Pallet.html#method.transfer
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const AccountFollowsCall: sts.Type<AccountFollowsCall> = sts.closedEnum(() => {
    return  {
        follow_account: sts.enumStruct({
            account: AccountId32,
        }),
        force_follow_account: sts.enumStruct({
            follower: AccountId32,
            following: AccountId32,
        }),
        unfollow_account: sts.enumStruct({
            account: AccountId32,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type AccountFollowsCall = AccountFollowsCall_follow_account | AccountFollowsCall_force_follow_account | AccountFollowsCall_unfollow_account

export interface AccountFollowsCall_follow_account {
    __kind: 'follow_account'
    account: AccountId32
}

export interface AccountFollowsCall_force_follow_account {
    __kind: 'force_follow_account'
    follower: AccountId32
    following: AccountId32
}

export interface AccountFollowsCall_unfollow_account {
    __kind: 'unfollow_account'
    account: AccountId32
}

export type Call = Call_AccountFollows | Call_Balances | Call_Energy | Call_EvmAccounts | Call_Grandpa | Call_Posts | Call_Profiles | Call_Proxy | Call_Reactions | Call_ResourceDiscussions | Call_Roles | Call_SpaceFollows | Call_SpaceOwnership | Call_Spaces | Call_Sudo | Call_System | Call_Timestamp | Call_Utility

export interface Call_AccountFollows {
    __kind: 'AccountFollows'
    value: AccountFollowsCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Energy {
    __kind: 'Energy'
    value: EnergyCall
}

export interface Call_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsCall
}

export interface Call_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface Call_Posts {
    __kind: 'Posts'
    value: PostsCall
}

export interface Call_Profiles {
    __kind: 'Profiles'
    value: ProfilesCall
}

export interface Call_Proxy {
    __kind: 'Proxy'
    value: ProxyCall
}

export interface Call_Reactions {
    __kind: 'Reactions'
    value: ReactionsCall
}

export interface Call_ResourceDiscussions {
    __kind: 'ResourceDiscussions'
    value: ResourceDiscussionsCall
}

export interface Call_Roles {
    __kind: 'Roles'
    value: RolesCall
}

export interface Call_SpaceFollows {
    __kind: 'SpaceFollows'
    value: SpaceFollowsCall
}

export interface Call_SpaceOwnership {
    __kind: 'SpaceOwnership'
    value: SpaceOwnershipCall
}

export interface Call_Spaces {
    __kind: 'Spaces'
    value: SpacesCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
}

export const ProxyType: sts.Type<ProxyType> = sts.closedEnum(() => {
    return  {
        Any: sts.unit(),
        DomainRegistrar: sts.unit(),
        Management: sts.unit(),
        SocialActions: sts.unit(),
        SocialActionsProxy: sts.unit(),
    }
})

export const MultiAddress: sts.Type<MultiAddress> = sts.closedEnum(() => {
    return  {
        Address20: sts.bytes(),
        Address32: sts.bytes(),
        Id: AccountId32,
        Index: sts.unit(),
        Raw: sts.bytes(),
    }
})

export const AccountId32 = sts.bytes()

export const H160 = sts.bytes()
