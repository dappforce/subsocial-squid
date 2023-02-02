import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v1500 from './v1500'
import * as v1501 from './v1501'

export class AccountFollowsAccountFollowedByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'AccountFollows'
    }

    protected getName() {
        return 'AccountFollowedByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '1b9f3c1aa97ebb13d3f6550639395187ac833f02c0fe4d006c73b767ecbb863e'
    }

    get asV1500(): AccountFollowsAccountFollowedByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface AccountFollowsAccountFollowedByAccountStorageV1500 {
    get(key: [Uint8Array, Uint8Array]): Promise<boolean>
    getAll(): Promise<boolean[]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<boolean[]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key: [Uint8Array, Uint8Array]): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key: [Uint8Array, Uint8Array]): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: boolean][]>
    getPairs(key: [Uint8Array, Uint8Array]): Promise<[k: [Uint8Array, Uint8Array], v: boolean][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: boolean][]>
    getPairsPaged(pageSize: number, key: [Uint8Array, Uint8Array]): AsyncIterable<[k: [Uint8Array, Uint8Array], v: boolean][]>
}

export class AccountFollowsAccountFollowersStorage extends StorageBase {
    protected getPrefix() {
        return 'AccountFollows'
    }

    protected getName() {
        return 'AccountFollowers'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'ad7e5187ae060fec07b1929f558af1374198afab9d21e08b23028f5c02a1b279'
    }

    get asV1500(): AccountFollowsAccountFollowersStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface AccountFollowsAccountFollowersStorageV1500 {
    get(key: Uint8Array): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
}

export class AccountFollowsAccountsFollowedByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'AccountFollows'
    }

    protected getName() {
        return 'AccountsFollowedByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'ad7e5187ae060fec07b1929f558af1374198afab9d21e08b23028f5c02a1b279'
    }

    get asV1500(): AccountFollowsAccountsFollowedByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface AccountFollowsAccountsFollowedByAccountStorageV1500 {
    get(key: Uint8Array): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
}

export class AuraAuthoritiesStorage extends StorageBase {
    protected getPrefix() {
        return 'Aura'
    }

    protected getName() {
        return 'Authorities'
    }

    /**
     *  The current authority set.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current authority set.
     */
    get asV1500(): AuraAuthoritiesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current authority set.
 */
export interface AuraAuthoritiesStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class AuraCurrentSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Aura'
    }

    protected getName() {
        return 'CurrentSlot'
    }

    /**
     *  The current slot of this block.
     * 
     *  This will be set in `on_initialize`.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The current slot of this block.
     * 
     *  This will be set in `on_initialize`.
     */
    get asV1500(): AuraCurrentSlotStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current slot of this block.
 * 
 *  This will be set in `on_initialize`.
 */
export interface AuraCurrentSlotStorageV1500 {
    get(): Promise<bigint>
}

export class AuraExtAuthoritiesStorage extends StorageBase {
    protected getPrefix() {
        return 'AuraExt'
    }

    protected getName() {
        return 'Authorities'
    }

    /**
     *  Serves as cache for the authorities.
     * 
     *  The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
     *  but we require the old authorities to verify the seal when validating a PoV. This will always
     *  be updated to the latest AuRa authorities in `on_finalize`.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  Serves as cache for the authorities.
     * 
     *  The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
     *  but we require the old authorities to verify the seal when validating a PoV. This will always
     *  be updated to the latest AuRa authorities in `on_finalize`.
     */
    get asV1500(): AuraExtAuthoritiesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Serves as cache for the authorities.
 * 
 *  The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
 *  but we require the old authorities to verify the seal when validating a PoV. This will always
 *  be updated to the latest AuRa authorities in `on_finalize`.
 */
export interface AuraExtAuthoritiesStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class AuthorshipAuthorStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'Author'
    }

    /**
     *  Author of current block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Author of current block.
     */
    get asV1500(): AuthorshipAuthorStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Author of current block.
 */
export interface AuthorshipAuthorStorageV1500 {
    get(): Promise<(Uint8Array | undefined)>
}

export class AuthorshipDidSetUnclesStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'DidSetUncles'
    }

    /**
     *  Whether uncles were already set in this block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether uncles were already set in this block.
     */
    get asV1500(): AuthorshipDidSetUnclesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Whether uncles were already set in this block.
 */
export interface AuthorshipDidSetUnclesStorageV1500 {
    get(): Promise<boolean>
}

export class AuthorshipUnclesStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'Uncles'
    }

    /**
     *  Uncles
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '320be201dc467df78c8912d3a5ad0cb57cd9b25ab8bff2e738597ffc0a83b551'
    }

    /**
     *  Uncles
     */
    get asV1500(): AuthorshipUnclesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Uncles
 */
export interface AuthorshipUnclesStorageV1500 {
    get(): Promise<v1500.UncleEntryItem[]>
}

export class BalancesAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The Balances pallet example of storing the balance of an account.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *   }
     *  ```
     * 
     *  You can also store the balance of an account in the `System` pallet.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *    type AccountStore = System
     *   }
     *  ```
     * 
     *  But this comes with tradeoffs, storing account balances in the system pallet stores
     *  `frame_system` data alongside the account data contrary to storing account balances in the
     *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The Balances pallet example of storing the balance of an account.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *   }
     *  ```
     * 
     *  You can also store the balance of an account in the `System` pallet.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *    type AccountStore = System
     *   }
     *  ```
     * 
     *  But this comes with tradeoffs, storing account balances in the system pallet stores
     *  `frame_system` data alongside the account data contrary to storing account balances in the
     *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get asV1500(): BalancesAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The Balances pallet example of storing the balance of an account.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
 *   }
 *  ```
 * 
 *  You can also store the balance of an account in the `System` pallet.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *    type AccountStore = System
 *   }
 *  ```
 * 
 *  But this comes with tradeoffs, storing account balances in the system pallet stores
 *  `frame_system` data alongside the account data contrary to storing account balances in the
 *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface BalancesAccountStorageV1500 {
    get(key: Uint8Array): Promise<v1500.AccountData>
    getAll(): Promise<v1500.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v1500.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.AccountData][]>
}

export class BalancesLocksStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Locks'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get asV1500(): BalancesLocksStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface BalancesLocksStorageV1500 {
    get(key: Uint8Array): Promise<v1500.BalanceLock[]>
    getAll(): Promise<v1500.BalanceLock[][]>
    getMany(keys: Uint8Array[]): Promise<v1500.BalanceLock[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.BalanceLock[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.BalanceLock[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.BalanceLock[]][]>
}

export class BalancesReservesStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Reserves'
    }

    /**
     *  Named reserves on some account balances.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
    }

    /**
     *  Named reserves on some account balances.
     */
    get asV1500(): BalancesReservesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Named reserves on some account balances.
 */
export interface BalancesReservesStorageV1500 {
    get(key: Uint8Array): Promise<v1500.ReserveData[]>
    getAll(): Promise<v1500.ReserveData[][]>
    getMany(keys: Uint8Array[]): Promise<v1500.ReserveData[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.ReserveData[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.ReserveData[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.ReserveData[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.ReserveData[]][]>
}

export class BalancesStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1431e80ffaa4d10a7fe714faa381ada05c3baae7e12aa80f24f8728a41ba57c4'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get asV1500(): BalancesStorageVersionStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Storage version of the pallet.
 * 
 *  This is set to v2.0.0 for new networks.
 */
export interface BalancesStorageVersionStorageV1500 {
    get(): Promise<v1500.Releases>
}

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV1500(): BalancesTotalIssuanceStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV1500 {
    get(): Promise<bigint>
}

export class CollatorSelectionCandidacyBondStorage extends StorageBase {
    protected getPrefix() {
        return 'CollatorSelection'
    }

    protected getName() {
        return 'CandidacyBond'
    }

    /**
     *  Fixed amount to deposit to become a collator.
     * 
     *  When a collator calls `leave_intent` they immediately receive the deposit back.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  Fixed amount to deposit to become a collator.
     * 
     *  When a collator calls `leave_intent` they immediately receive the deposit back.
     */
    get asV1500(): CollatorSelectionCandidacyBondStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Fixed amount to deposit to become a collator.
 * 
 *  When a collator calls `leave_intent` they immediately receive the deposit back.
 */
export interface CollatorSelectionCandidacyBondStorageV1500 {
    get(): Promise<bigint>
}

export class CollatorSelectionCandidatesStorage extends StorageBase {
    protected getPrefix() {
        return 'CollatorSelection'
    }

    protected getName() {
        return 'Candidates'
    }

    /**
     *  The (community, limited) collation candidates.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '239ae5a83674078569642b29549b6d89d616b5748799fde8f01f3356f32141fd'
    }

    /**
     *  The (community, limited) collation candidates.
     */
    get asV1500(): CollatorSelectionCandidatesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The (community, limited) collation candidates.
 */
export interface CollatorSelectionCandidatesStorageV1500 {
    get(): Promise<v1500.CandidateInfo[]>
}

export class CollatorSelectionDesiredCandidatesStorage extends StorageBase {
    protected getPrefix() {
        return 'CollatorSelection'
    }

    protected getName() {
        return 'DesiredCandidates'
    }

    /**
     *  Desired number of candidates.
     * 
     *  This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Desired number of candidates.
     * 
     *  This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
     */
    get asV1500(): CollatorSelectionDesiredCandidatesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Desired number of candidates.
 * 
 *  This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
 */
export interface CollatorSelectionDesiredCandidatesStorageV1500 {
    get(): Promise<number>
}

export class CollatorSelectionInvulnerablesStorage extends StorageBase {
    protected getPrefix() {
        return 'CollatorSelection'
    }

    protected getName() {
        return 'Invulnerables'
    }

    /**
     *  The invulnerable, fixed collators.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The invulnerable, fixed collators.
     */
    get asV1500(): CollatorSelectionInvulnerablesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The invulnerable, fixed collators.
 */
export interface CollatorSelectionInvulnerablesStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class CollatorSelectionLastAuthoredBlockStorage extends StorageBase {
    protected getPrefix() {
        return 'CollatorSelection'
    }

    protected getName() {
        return 'LastAuthoredBlock'
    }

    /**
     *  Last block authored by collator.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd'
    }

    /**
     *  Last block authored by collator.
     */
    get asV1500(): CollatorSelectionLastAuthoredBlockStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Last block authored by collator.
 */
export interface CollatorSelectionLastAuthoredBlockStorageV1500 {
    get(key: Uint8Array): Promise<number>
    getAll(): Promise<number[]>
    getMany(keys: Uint8Array[]): Promise<number[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: number][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: number][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: number][]>
}

export class DmpQueueConfigurationStorage extends StorageBase {
    protected getPrefix() {
        return 'DmpQueue'
    }

    protected getName() {
        return 'Configuration'
    }

    /**
     *  The configuration.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'de2fc633d896ffed21e1f630f0a1bfe710ecfa69921c58a4a758e7fd49d0b5a4'
    }

    /**
     *  The configuration.
     */
    get asV1500(): DmpQueueConfigurationStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The configuration.
 */
export interface DmpQueueConfigurationStorageV1500 {
    get(): Promise<v1500.ConfigData>
}

export class DmpQueueOverweightStorage extends StorageBase {
    protected getPrefix() {
        return 'DmpQueue'
    }

    protected getName() {
        return 'Overweight'
    }

    /**
     *  The overweight messages.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '02b70c9350fc19f8edcf45c5eb6332933141453267579d97f6eece480cbaa4d4'
    }

    /**
     *  The overweight messages.
     */
    get asV1500(): DmpQueueOverweightStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The overweight messages.
 */
export interface DmpQueueOverweightStorageV1500 {
    get(key: bigint): Promise<([number, Uint8Array] | undefined)>
    getAll(): Promise<[number, Uint8Array][]>
    getMany(keys: bigint[]): Promise<([number, Uint8Array] | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [number, Uint8Array]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [number, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [number, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [number, Uint8Array]][]>
}

export class DmpQueuePageIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'DmpQueue'
    }

    protected getName() {
        return 'PageIndex'
    }

    /**
     *  The page index.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'cad43146ccd742f66da886b2f77b13d96d2c4de637fbb965a7493a2f16c99189'
    }

    /**
     *  The page index.
     */
    get asV1500(): DmpQueuePageIndexStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The page index.
 */
export interface DmpQueuePageIndexStorageV1500 {
    get(): Promise<v1500.PageIndexData>
}

export class DmpQueuePagesStorage extends StorageBase {
    protected getPrefix() {
        return 'DmpQueue'
    }

    protected getName() {
        return 'Pages'
    }

    /**
     *  The queue pages.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0b9460c8234ca1e6341c95066d20ac8d7e79e3a9b2def20c9450f88ef0ab1b1d'
    }

    /**
     *  The queue pages.
     */
    get asV1500(): DmpQueuePagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The queue pages.
 */
export interface DmpQueuePagesStorageV1500 {
    get(key: number): Promise<[number, Uint8Array][]>
    getAll(): Promise<[number, Uint8Array][][]>
    getMany(keys: number[]): Promise<[number, Uint8Array][][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: [number, Uint8Array][]][]>
    getPairs(key: number): Promise<[k: number, v: [number, Uint8Array][]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: [number, Uint8Array][]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: [number, Uint8Array][]][]>
}

export class DomainsDomainByInnerValueStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'DomainByInnerValue'
    }

    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '9567cabf419cb972d5a42c9a62c92c107f30d2a8ccfc2c74695671b5eed957b3'
    }

    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get asV1500(): DomainsDomainByInnerValueStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainsDomainByInnerValueStorageV1500 {
    get(key1: Uint8Array, key2: v1500.InnerValue): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, v1500.InnerValue][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[Uint8Array, v1500.InnerValue][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v1500.InnerValue][]>
    getKeys(key1: Uint8Array, key2: v1500.InnerValue): Promise<[Uint8Array, v1500.InnerValue][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v1500.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v1500.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v1500.InnerValue): AsyncIterable<[Uint8Array, v1500.InnerValue][]>
    getPairs(): Promise<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array, key2: v1500.InnerValue): Promise<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v1500.InnerValue): AsyncIterable<[k: [Uint8Array, v1500.InnerValue], v: Uint8Array][]>
}

export class DomainsDomainsByOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'DomainsByOwner'
    }

    /**
     *  Domains owned per account.
     * 
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '46a288862bbf45be8ea8df419f742aba93624d0f567542a8d476bcea78e59e22'
    }

    /**
     *  Domains owned per account.
     * 
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get asV1500(): DomainsDomainsByOwnerStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Domains owned per account.
 * 
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainsDomainsByOwnerStorageV1500 {
    get(key: Uint8Array): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array[]][]>
}

export class DomainsRegisteredDomainsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'RegisteredDomains'
    }

    /**
     *  Metadata associated per domain.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'be78e341092f66766e2cb8c347e1a4866b6921cbee315613644993e196406046'
    }

    /**
     *  Metadata associated per domain.
     */
    get asV1500(): DomainsRegisteredDomainsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Metadata associated per domain.
 */
export interface DomainsRegisteredDomainsStorageV1500 {
    get(key: Uint8Array): Promise<(v1500.DomainMeta | undefined)>
    getAll(): Promise<v1500.DomainMeta[]>
    getMany(keys: Uint8Array[]): Promise<(v1500.DomainMeta | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.DomainMeta][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.DomainMeta][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.DomainMeta][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.DomainMeta][]>
}

export class DomainsReservedWordsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'ReservedWords'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '66f595a69be861a7ae876f1faab7fab701c8b9ef12c6e69d769fe069d00a5d08'
    }

    get asV1500(): DomainsReservedWordsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface DomainsReservedWordsStorageV1500 {
    get(key: Uint8Array): Promise<boolean>
    getAll(): Promise<boolean[]>
    getMany(keys: Uint8Array[]): Promise<boolean[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: boolean][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: boolean][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: boolean][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: boolean][]>
}

export class DomainsSupportedTldsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'SupportedTlds'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '66f595a69be861a7ae876f1faab7fab701c8b9ef12c6e69d769fe069d00a5d08'
    }

    get asV1500(): DomainsSupportedTldsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface DomainsSupportedTldsStorageV1500 {
    get(key: Uint8Array): Promise<boolean>
    getAll(): Promise<boolean[]>
    getMany(keys: Uint8Array[]): Promise<boolean[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: boolean][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: boolean][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: boolean][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: boolean][]>
}

export class EnergyEnergyBalanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Energy'
    }

    protected getName() {
        return 'EnergyBalance'
    }

    /**
     *  Energy credited to each account.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0'
    }

    /**
     *  Energy credited to each account.
     */
    get asV1500(): EnergyEnergyBalanceStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Energy credited to each account.
 */
export interface EnergyEnergyBalanceStorageV1500 {
    get(key: Uint8Array): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<bigint[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint][]>
}

export class EnergyTotalEnergyStorage extends StorageBase {
    protected getPrefix() {
        return 'Energy'
    }

    protected getName() {
        return 'TotalEnergy'
    }

    /**
     *  Total energy generated.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  Total energy generated.
     */
    get asV1500(): EnergyTotalEnergyStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Total energy generated.
 */
export interface EnergyTotalEnergyStorageV1500 {
    get(): Promise<bigint>
}

export class EnergyValueCoefficientStorage extends StorageBase {
    protected getPrefix() {
        return 'Energy'
    }

    protected getName() {
        return 'ValueCoefficient'
    }

    /**
     *  The current value coefficient.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '3c9260c078e57deb94e3d10dca1995a3263c48d53634c311a3537412486bb35e'
    }

    /**
     *  The current value coefficient.
     */
    get asV1500(): EnergyValueCoefficientStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current value coefficient.
 */
export interface EnergyValueCoefficientStorageV1500 {
    get(): Promise<bigint>
}

export class ParachainInfoParachainIdStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainInfo'
    }

    protected getName() {
        return 'ParachainId'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    get asV1500(): ParachainInfoParachainIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface ParachainInfoParachainIdStorageV1500 {
    get(): Promise<number>
}

export class ParachainSystemAnnouncedHrmpMessagesPerCandidateStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'AnnouncedHrmpMessagesPerCandidate'
    }

    /**
     *  The number of HRMP messages we observed in `on_initialize` and thus used that number for
     *  announcing the weight of `on_initialize` and `on_finalize`.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of HRMP messages we observed in `on_initialize` and thus used that number for
     *  announcing the weight of `on_initialize` and `on_finalize`.
     */
    get asV1500(): ParachainSystemAnnouncedHrmpMessagesPerCandidateStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The number of HRMP messages we observed in `on_initialize` and thus used that number for
 *  announcing the weight of `on_initialize` and `on_finalize`.
 */
export interface ParachainSystemAnnouncedHrmpMessagesPerCandidateStorageV1500 {
    get(): Promise<number>
}

export class ParachainSystemAuthorizedUpgradeStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'AuthorizedUpgrade'
    }

    /**
     *  The next authorized upgrade, if there is one.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The next authorized upgrade, if there is one.
     */
    get asV1500(): ParachainSystemAuthorizedUpgradeStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next authorized upgrade, if there is one.
 */
export interface ParachainSystemAuthorizedUpgradeStorageV1500 {
    get(): Promise<(Uint8Array | undefined)>
}

export class ParachainSystemCustomValidationHeadDataStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'CustomValidationHeadData'
    }

    /**
     *  A custom head data that should be returned as result of `validate_block`.
     * 
     *  See [`Pallet::set_custom_validation_head_data`] for more information.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '9d37db61fb40fc6c377391f52a7b349395407634d45b47a8943ab5ccf47e31e4'
    }

    /**
     *  A custom head data that should be returned as result of `validate_block`.
     * 
     *  See [`Pallet::set_custom_validation_head_data`] for more information.
     */
    get asV1500(): ParachainSystemCustomValidationHeadDataStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  A custom head data that should be returned as result of `validate_block`.
 * 
 *  See [`Pallet::set_custom_validation_head_data`] for more information.
 */
export interface ParachainSystemCustomValidationHeadDataStorageV1500 {
    get(): Promise<(Uint8Array | undefined)>
}

export class ParachainSystemDidSetValidationCodeStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'DidSetValidationCode'
    }

    /**
     *  Were the validation data set to notify the relay chain?
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Were the validation data set to notify the relay chain?
     */
    get asV1500(): ParachainSystemDidSetValidationCodeStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Were the validation data set to notify the relay chain?
 */
export interface ParachainSystemDidSetValidationCodeStorageV1500 {
    get(): Promise<boolean>
}

export class ParachainSystemHostConfigurationStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'HostConfiguration'
    }

    /**
     *  The parachain host configuration that was obtained from the relay parent.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '76792d33ff147d490bc5f8e4454e476c4ef71aae7021fd1a44f96974f263af9b'
    }

    /**
     *  The parachain host configuration that was obtained from the relay parent.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get asV1500(): ParachainSystemHostConfigurationStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The parachain host configuration that was obtained from the relay parent.
 * 
 *  This field is meant to be updated each block with the validation data inherent. Therefore,
 *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
 * 
 *  This data is also absent from the genesis.
 */
export interface ParachainSystemHostConfigurationStorageV1500 {
    get(): Promise<(v1500.V2AbridgedHostConfiguration | undefined)>
}

export class ParachainSystemHrmpOutboundMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'HrmpOutboundMessages'
    }

    /**
     *  HRMP messages that were sent in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0330a7423804895204dc06607d196d45bbec59edfd3f4f38c868daa9e880928c'
    }

    /**
     *  HRMP messages that were sent in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get asV1500(): ParachainSystemHrmpOutboundMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  HRMP messages that were sent in a block.
 * 
 *  This will be cleared in `on_initialize` of each new block.
 */
export interface ParachainSystemHrmpOutboundMessagesStorageV1500 {
    get(): Promise<v1500.OutboundHrmpMessage[]>
}

export class ParachainSystemHrmpWatermarkStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'HrmpWatermark'
    }

    /**
     *  HRMP watermark that was set in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  HRMP watermark that was set in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get asV1500(): ParachainSystemHrmpWatermarkStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  HRMP watermark that was set in a block.
 * 
 *  This will be cleared in `on_initialize` of each new block.
 */
export interface ParachainSystemHrmpWatermarkStorageV1500 {
    get(): Promise<number>
}

export class ParachainSystemLastDmqMqcHeadStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'LastDmqMqcHead'
    }

    /**
     *  The last downward message queue chain head we have observed.
     * 
     *  This value is loaded before and saved after processing inbound downward messages carried
     *  by the system inherent.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  The last downward message queue chain head we have observed.
     * 
     *  This value is loaded before and saved after processing inbound downward messages carried
     *  by the system inherent.
     */
    get asV1500(): ParachainSystemLastDmqMqcHeadStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The last downward message queue chain head we have observed.
 * 
 *  This value is loaded before and saved after processing inbound downward messages carried
 *  by the system inherent.
 */
export interface ParachainSystemLastDmqMqcHeadStorageV1500 {
    get(): Promise<Uint8Array>
}

export class ParachainSystemLastHrmpMqcHeadsStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'LastHrmpMqcHeads'
    }

    /**
     *  The message queue chain heads we have observed per each channel incoming channel.
     * 
     *  This value is loaded before and saved after processing inbound downward messages carried
     *  by the system inherent.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '26057692e067e44d8eec686a8711f8b87a11679701c3afa133f7b9da8f327999'
    }

    /**
     *  The message queue chain heads we have observed per each channel incoming channel.
     * 
     *  This value is loaded before and saved after processing inbound downward messages carried
     *  by the system inherent.
     */
    get asV1500(): ParachainSystemLastHrmpMqcHeadsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The message queue chain heads we have observed per each channel incoming channel.
 * 
 *  This value is loaded before and saved after processing inbound downward messages carried
 *  by the system inherent.
 */
export interface ParachainSystemLastHrmpMqcHeadsStorageV1500 {
    get(): Promise<[number, Uint8Array][]>
}

export class ParachainSystemNewValidationCodeStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'NewValidationCode'
    }

    /**
     *  Validation code that is set by the parachain and is to be communicated to collator and
     *  consequently the relay-chain.
     * 
     *  This will be cleared in `on_initialize` of each new block if no other pallet already set
     *  the value.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '9d37db61fb40fc6c377391f52a7b349395407634d45b47a8943ab5ccf47e31e4'
    }

    /**
     *  Validation code that is set by the parachain and is to be communicated to collator and
     *  consequently the relay-chain.
     * 
     *  This will be cleared in `on_initialize` of each new block if no other pallet already set
     *  the value.
     */
    get asV1500(): ParachainSystemNewValidationCodeStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Validation code that is set by the parachain and is to be communicated to collator and
 *  consequently the relay-chain.
 * 
 *  This will be cleared in `on_initialize` of each new block if no other pallet already set
 *  the value.
 */
export interface ParachainSystemNewValidationCodeStorageV1500 {
    get(): Promise<(Uint8Array | undefined)>
}

export class ParachainSystemPendingUpwardMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'PendingUpwardMessages'
    }

    /**
     *  Upward messages that are still pending and not yet send to the relay chain.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '69b64a98b95b35e85f746389396240a8c70e1dca686229dc8d8a0812c030037a'
    }

    /**
     *  Upward messages that are still pending and not yet send to the relay chain.
     */
    get asV1500(): ParachainSystemPendingUpwardMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Upward messages that are still pending and not yet send to the relay chain.
 */
export interface ParachainSystemPendingUpwardMessagesStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class ParachainSystemPendingValidationCodeStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'PendingValidationCode'
    }

    /**
     *  In case of a scheduled upgrade, this storage field contains the validation code to be applied.
     * 
     *  As soon as the relay chain gives us the go-ahead signal, we will overwrite the [`:code`][well_known_keys::CODE]
     *  which will result the next block process with the new validation code. This concludes the upgrade process.
     * 
     *  [well_known_keys::CODE]: sp_core::storage::well_known_keys::CODE
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '8199405308c9981e32f632f64a8758ba69af0e625da26ff6d6670b81cc1f1647'
    }

    /**
     *  In case of a scheduled upgrade, this storage field contains the validation code to be applied.
     * 
     *  As soon as the relay chain gives us the go-ahead signal, we will overwrite the [`:code`][well_known_keys::CODE]
     *  which will result the next block process with the new validation code. This concludes the upgrade process.
     * 
     *  [well_known_keys::CODE]: sp_core::storage::well_known_keys::CODE
     */
    get asV1500(): ParachainSystemPendingValidationCodeStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  In case of a scheduled upgrade, this storage field contains the validation code to be applied.
 * 
 *  As soon as the relay chain gives us the go-ahead signal, we will overwrite the [`:code`][well_known_keys::CODE]
 *  which will result the next block process with the new validation code. This concludes the upgrade process.
 * 
 *  [well_known_keys::CODE]: sp_core::storage::well_known_keys::CODE
 */
export interface ParachainSystemPendingValidationCodeStorageV1500 {
    get(): Promise<Uint8Array>
}

export class ParachainSystemProcessedDownwardMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'ProcessedDownwardMessages'
    }

    /**
     *  Number of downward messages processed in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Number of downward messages processed in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get asV1500(): ParachainSystemProcessedDownwardMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Number of downward messages processed in a block.
 * 
 *  This will be cleared in `on_initialize` of each new block.
 */
export interface ParachainSystemProcessedDownwardMessagesStorageV1500 {
    get(): Promise<number>
}

export class ParachainSystemRelayStateProofStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'RelayStateProof'
    }

    /**
     *  The state proof for the last relay parent block.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '38f79414b788123884c7cc1e6c6ca89331d3264f4bdcf6dff4501d6b20966908'
    }

    /**
     *  The state proof for the last relay parent block.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get asV1500(): ParachainSystemRelayStateProofStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The state proof for the last relay parent block.
 * 
 *  This field is meant to be updated each block with the validation data inherent. Therefore,
 *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
 * 
 *  This data is also absent from the genesis.
 */
export interface ParachainSystemRelayStateProofStorageV1500 {
    get(): Promise<(v1500.StorageProof | undefined)>
}

export class ParachainSystemRelevantMessagingStateStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'RelevantMessagingState'
    }

    /**
     *  The snapshot of some state related to messaging relevant to the current parachain as per
     *  the relay parent.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '24e0311e0ec9634d6acff6e06aa83b4bd4c57957b8f7525bf0dd22f0a73d7b09'
    }

    /**
     *  The snapshot of some state related to messaging relevant to the current parachain as per
     *  the relay parent.
     * 
     *  This field is meant to be updated each block with the validation data inherent. Therefore,
     *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
     * 
     *  This data is also absent from the genesis.
     */
    get asV1500(): ParachainSystemRelevantMessagingStateStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The snapshot of some state related to messaging relevant to the current parachain as per
 *  the relay parent.
 * 
 *  This field is meant to be updated each block with the validation data inherent. Therefore,
 *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
 * 
 *  This data is also absent from the genesis.
 */
export interface ParachainSystemRelevantMessagingStateStorageV1500 {
    get(): Promise<(v1500.MessagingStateSnapshot | undefined)>
}

export class ParachainSystemReservedDmpWeightOverrideStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'ReservedDmpWeightOverride'
    }

    /**
     *  The weight we reserve at the beginning of the block for processing DMP messages. This
     *  overrides the amount set in the Config trait.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
    }

    /**
     *  The weight we reserve at the beginning of the block for processing DMP messages. This
     *  overrides the amount set in the Config trait.
     */
    get asV1500(): ParachainSystemReservedDmpWeightOverrideStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The weight we reserve at the beginning of the block for processing DMP messages. This
 *  overrides the amount set in the Config trait.
 */
export interface ParachainSystemReservedDmpWeightOverrideStorageV1500 {
    get(): Promise<(bigint | undefined)>
}

export class ParachainSystemReservedXcmpWeightOverrideStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'ReservedXcmpWeightOverride'
    }

    /**
     *  The weight we reserve at the beginning of the block for processing XCMP messages. This
     *  overrides the amount set in the Config trait.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
    }

    /**
     *  The weight we reserve at the beginning of the block for processing XCMP messages. This
     *  overrides the amount set in the Config trait.
     */
    get asV1500(): ParachainSystemReservedXcmpWeightOverrideStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The weight we reserve at the beginning of the block for processing XCMP messages. This
 *  overrides the amount set in the Config trait.
 */
export interface ParachainSystemReservedXcmpWeightOverrideStorageV1500 {
    get(): Promise<(bigint | undefined)>
}

export class ParachainSystemUpgradeRestrictionSignalStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'UpgradeRestrictionSignal'
    }

    /**
     *  An option which indicates if the relay-chain restricts signalling a validation code upgrade.
     *  In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
     *  candidate will be invalid.
     * 
     *  This storage item is a mirror of the corresponding value for the current parachain from the
     *  relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
     *  set after the inherent.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '2236db14165f1386be95c2e72a22524bdd6b93f6d64e4b0b39d54e03f1f1bee2'
    }

    /**
     *  An option which indicates if the relay-chain restricts signalling a validation code upgrade.
     *  In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
     *  candidate will be invalid.
     * 
     *  This storage item is a mirror of the corresponding value for the current parachain from the
     *  relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
     *  set after the inherent.
     */
    get asV1500(): ParachainSystemUpgradeRestrictionSignalStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  An option which indicates if the relay-chain restricts signalling a validation code upgrade.
 *  In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
 *  candidate will be invalid.
 * 
 *  This storage item is a mirror of the corresponding value for the current parachain from the
 *  relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
 *  set after the inherent.
 */
export interface ParachainSystemUpgradeRestrictionSignalStorageV1500 {
    get(): Promise<(v1500.V2UpgradeRestriction | undefined)>
}

export class ParachainSystemUpwardMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'UpwardMessages'
    }

    /**
     *  Upward messages that were sent in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '69b64a98b95b35e85f746389396240a8c70e1dca686229dc8d8a0812c030037a'
    }

    /**
     *  Upward messages that were sent in a block.
     * 
     *  This will be cleared in `on_initialize` of each new block.
     */
    get asV1500(): ParachainSystemUpwardMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Upward messages that were sent in a block.
 * 
 *  This will be cleared in `on_initialize` of each new block.
 */
export interface ParachainSystemUpwardMessagesStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class ParachainSystemValidationDataStorage extends StorageBase {
    protected getPrefix() {
        return 'ParachainSystem'
    }

    protected getName() {
        return 'ValidationData'
    }

    /**
     *  The [`PersistedValidationData`] set for this block.
     *  This value is expected to be set only once per block and it's never stored
     *  in the trie.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'fb37759067a991bce599d3fbe39ee38b99d63716a96357c3a39bf04c66e2579d'
    }

    /**
     *  The [`PersistedValidationData`] set for this block.
     *  This value is expected to be set only once per block and it's never stored
     *  in the trie.
     */
    get asV1500(): ParachainSystemValidationDataStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The [`PersistedValidationData`] set for this block.
 *  This value is expected to be set only once per block and it's never stored
 *  in the trie.
 */
export interface ParachainSystemValidationDataStorageV1500 {
    get(): Promise<(v1500.V2PersistedValidationData | undefined)>
}

export class PostsNextPostIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Posts'
    }

    protected getName() {
        return 'NextPostId'
    }

    /**
     *  The next post id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The next post id.
     */
    get asV1500(): PostsNextPostIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next post id.
 */
export interface PostsNextPostIdStorageV1500 {
    get(): Promise<bigint>
}

export class PostsPostByIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Posts'
    }

    protected getName() {
        return 'PostById'
    }

    /**
     *  Get the details of a post by its' id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1ee9e6bab61d7f8dadfe55ad1fd6e16929efcdd28544e6678c7664f42f5bc217'
    }

    /**
     *  Get the details of a post by its' id.
     */
    get asV1500(): PostsPostByIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the details of a post by its' id.
 */
export interface PostsPostByIdStorageV1500 {
    get(key: bigint): Promise<(v1500.Post | undefined)>
    getAll(): Promise<v1500.Post[]>
    getMany(keys: bigint[]): Promise<(v1500.Post | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v1500.Post][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v1500.Post][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v1500.Post][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v1500.Post][]>
}

export class PostsPostIdsBySpaceIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Posts'
    }

    protected getName() {
        return 'PostIdsBySpaceId'
    }

    /**
     *  Get the ids of all posts in a given space, by the space's id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '200cefb60e4444365f0a4848cd45df373a5776ad748fb7e8ec6c12564846bcf2'
    }

    /**
     *  Get the ids of all posts in a given space, by the space's id.
     */
    get asV1500(): PostsPostIdsBySpaceIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the ids of all posts in a given space, by the space's id.
 */
export interface PostsPostIdsBySpaceIdStorageV1500 {
    get(key: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: bigint[]): Promise<bigint[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: bigint[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: bigint[]][]>
}

export class PostsReplyIdsByPostIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Posts'
    }

    protected getName() {
        return 'ReplyIdsByPostId'
    }

    /**
     *  Get the ids of all direct replies by their parent's post id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '200cefb60e4444365f0a4848cd45df373a5776ad748fb7e8ec6c12564846bcf2'
    }

    /**
     *  Get the ids of all direct replies by their parent's post id.
     */
    get asV1500(): PostsReplyIdsByPostIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the ids of all direct replies by their parent's post id.
 */
export interface PostsReplyIdsByPostIdStorageV1500 {
    get(key: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: bigint[]): Promise<bigint[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: bigint[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: bigint[]][]>
}

export class PostsSharedPostIdsByOriginalPostIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Posts'
    }

    protected getName() {
        return 'SharedPostIdsByOriginalPostId'
    }

    /**
     *  Get the ids of all posts that have shared a given original post id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '200cefb60e4444365f0a4848cd45df373a5776ad748fb7e8ec6c12564846bcf2'
    }

    /**
     *  Get the ids of all posts that have shared a given original post id.
     */
    get asV1500(): PostsSharedPostIdsByOriginalPostIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the ids of all posts that have shared a given original post id.
 */
export interface PostsSharedPostIdsByOriginalPostIdStorageV1500 {
    get(key: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: bigint[]): Promise<bigint[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: bigint[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: bigint[]][]>
}

export class ProfilesProfileSpaceIdByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Profiles'
    }

    protected getName() {
        return 'ProfileSpaceIdByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'fc96d6750297129d4ff884dffc4742fe833e9be687fa34e80679655014942975'
    }

    get asV1500(): ProfilesProfileSpaceIdByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface ProfilesProfileSpaceIdByAccountStorageV1500 {
    get(key: Uint8Array): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint][]>
}

export class ProxyAnnouncementsStorage extends StorageBase {
    protected getPrefix() {
        return 'Proxy'
    }

    protected getName() {
        return 'Announcements'
    }

    /**
     *  The announcements made by the proxy (key).
     */
    get isV1501(): boolean {
        return this.getTypeHash() === 'b93d53c53a308d910b0304bf5593bd71084bcf177629ea67da68b9026f4b417c'
    }

    /**
     *  The announcements made by the proxy (key).
     */
    get asV1501(): ProxyAnnouncementsStorageV1501 {
        assert(this.isV1501)
        return this as any
    }
}

/**
 *  The announcements made by the proxy (key).
 */
export interface ProxyAnnouncementsStorageV1501 {
    get(key: Uint8Array): Promise<[v1501.Announcement[], bigint]>
    getAll(): Promise<[v1501.Announcement[], bigint][]>
    getMany(keys: Uint8Array[]): Promise<[v1501.Announcement[], bigint][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [v1501.Announcement[], bigint]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [v1501.Announcement[], bigint]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [v1501.Announcement[], bigint]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [v1501.Announcement[], bigint]][]>
}

export class ProxyProxiesStorage extends StorageBase {
    protected getPrefix() {
        return 'Proxy'
    }

    protected getName() {
        return 'Proxies'
    }

    /**
     *  The set of account proxies. Maps the account which has delegated to the accounts
     *  which are being delegated to, together with the amount held on deposit.
     */
    get isV1501(): boolean {
        return this.getTypeHash() === 'a18f4a259027142644e1877eae0e366efc4bbd35836c68749fc243d68528ec16'
    }

    /**
     *  The set of account proxies. Maps the account which has delegated to the accounts
     *  which are being delegated to, together with the amount held on deposit.
     */
    get asV1501(): ProxyProxiesStorageV1501 {
        assert(this.isV1501)
        return this as any
    }
}

/**
 *  The set of account proxies. Maps the account which has delegated to the accounts
 *  which are being delegated to, together with the amount held on deposit.
 */
export interface ProxyProxiesStorageV1501 {
    get(key: Uint8Array): Promise<[v1501.ProxyDefinition[], bigint]>
    getAll(): Promise<[v1501.ProxyDefinition[], bigint][]>
    getMany(keys: Uint8Array[]): Promise<[v1501.ProxyDefinition[], bigint][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [v1501.ProxyDefinition[], bigint]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [v1501.ProxyDefinition[], bigint]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [v1501.ProxyDefinition[], bigint]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [v1501.ProxyDefinition[], bigint]][]>
}

export class RandomnessCollectiveFlipRandomMaterialStorage extends StorageBase {
    protected getPrefix() {
        return 'RandomnessCollectiveFlip'
    }

    protected getName() {
        return 'RandomMaterial'
    }

    /**
     *  Series of block headers from the last 81 blocks that acts as random seed material. This
     *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     *  the oldest hash.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  Series of block headers from the last 81 blocks that acts as random seed material. This
     *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     *  the oldest hash.
     */
    get asV1500(): RandomnessCollectiveFlipRandomMaterialStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Series of block headers from the last 81 blocks that acts as random seed material. This
 *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
 *  the oldest hash.
 */
export interface RandomnessCollectiveFlipRandomMaterialStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class ReactionsNextReactionIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Reactions'
    }

    protected getName() {
        return 'NextReactionId'
    }

    /**
     *  The next reaction id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The next reaction id.
     */
    get asV1500(): ReactionsNextReactionIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next reaction id.
 */
export interface ReactionsNextReactionIdStorageV1500 {
    get(): Promise<bigint>
}

export class ReactionsPostReactionIdByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Reactions'
    }

    protected getName() {
        return 'PostReactionIdByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '8144dc7f229be2a2b7ad84301180f82ed529c901b96b8a3be5af39aeb8207dae'
    }

    get asV1500(): ReactionsPostReactionIdByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface ReactionsPostReactionIdByAccountStorageV1500 {
    get(key: [Uint8Array, bigint]): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: [Uint8Array, bigint][]): Promise<bigint[]>
    getKeys(): Promise<[Uint8Array, bigint][]>
    getKeys(key: [Uint8Array, bigint]): Promise<[Uint8Array, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, bigint][]>
    getKeysPaged(pageSize: number, key: [Uint8Array, bigint]): AsyncIterable<[Uint8Array, bigint][]>
    getPairs(): Promise<[k: [Uint8Array, bigint], v: bigint][]>
    getPairs(key: [Uint8Array, bigint]): Promise<[k: [Uint8Array, bigint], v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, bigint], v: bigint][]>
    getPairsPaged(pageSize: number, key: [Uint8Array, bigint]): AsyncIterable<[k: [Uint8Array, bigint], v: bigint][]>
}

export class ReactionsReactionByIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Reactions'
    }

    protected getName() {
        return 'ReactionById'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'd8add7455b8771ab21475ce6b7f17bec38df6e9c3b647cf42d2693b2021af789'
    }

    get asV1500(): ReactionsReactionByIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface ReactionsReactionByIdStorageV1500 {
    get(key: bigint): Promise<(v1500.Reaction | undefined)>
    getAll(): Promise<v1500.Reaction[]>
    getMany(keys: bigint[]): Promise<(v1500.Reaction | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v1500.Reaction][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v1500.Reaction][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v1500.Reaction][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v1500.Reaction][]>
}

export class ReactionsReactionIdsByPostIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Reactions'
    }

    protected getName() {
        return 'ReactionIdsByPostId'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '200cefb60e4444365f0a4848cd45df373a5776ad748fb7e8ec6c12564846bcf2'
    }

    get asV1500(): ReactionsReactionIdsByPostIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface ReactionsReactionIdsByPostIdStorageV1500 {
    get(key: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: bigint[]): Promise<bigint[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: bigint[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: bigint[]][]>
}

export class RolesNextRoleIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Roles'
    }

    protected getName() {
        return 'NextRoleId'
    }

    /**
     *  The next role id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The next role id.
     */
    get asV1500(): RolesNextRoleIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next role id.
 */
export interface RolesNextRoleIdStorageV1500 {
    get(): Promise<bigint>
}

export class RolesRoleByIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Roles'
    }

    protected getName() {
        return 'RoleById'
    }

    /**
     *  Get the details of a role by its' id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '52d8945a8d7eda950a92c734807fed9b6c47f38eedd45ab1dbc67a1a469e9df4'
    }

    /**
     *  Get the details of a role by its' id.
     */
    get asV1500(): RolesRoleByIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the details of a role by its' id.
 */
export interface RolesRoleByIdStorageV1500 {
    get(key: bigint): Promise<(v1500.Role | undefined)>
    getAll(): Promise<v1500.Role[]>
    getMany(keys: bigint[]): Promise<(v1500.Role | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v1500.Role][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v1500.Role][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v1500.Role][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v1500.Role][]>
}

export class RolesRoleIdsBySpaceIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Roles'
    }

    protected getName() {
        return 'RoleIdsBySpaceId'
    }

    /**
     *  Get a list of all role ids available in a given space.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '200cefb60e4444365f0a4848cd45df373a5776ad748fb7e8ec6c12564846bcf2'
    }

    /**
     *  Get a list of all role ids available in a given space.
     */
    get asV1500(): RolesRoleIdsBySpaceIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get a list of all role ids available in a given space.
 */
export interface RolesRoleIdsBySpaceIdStorageV1500 {
    get(key: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: bigint[]): Promise<bigint[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: bigint[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: bigint[]][]>
}

export class RolesRoleIdsByUserInSpaceStorage extends StorageBase {
    protected getPrefix() {
        return 'Roles'
    }

    protected getName() {
        return 'RoleIdsByUserInSpace'
    }

    /**
     *  Get a list of all role ids owned by a given user (account or space id)
     *  within a given space.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '07eff41ac3e5f3de8d983340d2fbd2bbfbab6f310e86801875c972003cf7740d'
    }

    /**
     *  Get a list of all role ids owned by a given user (account or space id)
     *  within a given space.
     */
    get asV1500(): RolesRoleIdsByUserInSpaceStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get a list of all role ids owned by a given user (account or space id)
 *  within a given space.
 */
export interface RolesRoleIdsByUserInSpaceStorageV1500 {
    get(key1: v1500.User, key2: bigint): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: [v1500.User, bigint][]): Promise<bigint[][]>
    getKeys(): Promise<[v1500.User, bigint][]>
    getKeys(key1: v1500.User): Promise<[v1500.User, bigint][]>
    getKeys(key1: v1500.User, key2: bigint): Promise<[v1500.User, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v1500.User, bigint][]>
    getKeysPaged(pageSize: number, key1: v1500.User): AsyncIterable<[v1500.User, bigint][]>
    getKeysPaged(pageSize: number, key1: v1500.User, key2: bigint): AsyncIterable<[v1500.User, bigint][]>
    getPairs(): Promise<[k: [v1500.User, bigint], v: bigint[]][]>
    getPairs(key1: v1500.User): Promise<[k: [v1500.User, bigint], v: bigint[]][]>
    getPairs(key1: v1500.User, key2: bigint): Promise<[k: [v1500.User, bigint], v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v1500.User, bigint], v: bigint[]][]>
    getPairsPaged(pageSize: number, key1: v1500.User): AsyncIterable<[k: [v1500.User, bigint], v: bigint[]][]>
    getPairsPaged(pageSize: number, key1: v1500.User, key2: bigint): AsyncIterable<[k: [v1500.User, bigint], v: bigint[]][]>
}

export class RolesUsersByRoleIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Roles'
    }

    protected getName() {
        return 'UsersByRoleId'
    }

    /**
     *  Get a list of all users (account or space ids) that a given role has been granted to.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '26eb09317a74682c87f42efadb0a67ef01ec4e647cf12aa9e1e90dffa453e367'
    }

    /**
     *  Get a list of all users (account or space ids) that a given role has been granted to.
     */
    get asV1500(): RolesUsersByRoleIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get a list of all users (account or space ids) that a given role has been granted to.
 */
export interface RolesUsersByRoleIdStorageV1500 {
    get(key: bigint): Promise<v1500.User[]>
    getAll(): Promise<v1500.User[][]>
    getMany(keys: bigint[]): Promise<v1500.User[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v1500.User[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v1500.User[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v1500.User[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v1500.User[]][]>
}

export class SessionCurrentIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'CurrentIndex'
    }

    /**
     *  Current index of the session.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Current index of the session.
     */
    get asV1500(): SessionCurrentIndexStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Current index of the session.
 */
export interface SessionCurrentIndexStorageV1500 {
    get(): Promise<number>
}

export class SessionDisabledValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'DisabledValidators'
    }

    /**
     *  Indices of disabled validators.
     * 
     *  The vec is always kept sorted so that we can find whether a given validator is
     *  disabled using binary search. It gets cleared when `on_session_ending` returns
     *  a new set of identities.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
    }

    /**
     *  Indices of disabled validators.
     * 
     *  The vec is always kept sorted so that we can find whether a given validator is
     *  disabled using binary search. It gets cleared when `on_session_ending` returns
     *  a new set of identities.
     */
    get asV1500(): SessionDisabledValidatorsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Indices of disabled validators.
 * 
 *  The vec is always kept sorted so that we can find whether a given validator is
 *  disabled using binary search. It gets cleared when `on_session_ending` returns
 *  a new set of identities.
 */
export interface SessionDisabledValidatorsStorageV1500 {
    get(): Promise<number[]>
}

export class SessionKeyOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'KeyOwner'
    }

    /**
     *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '20cf09ea865a34d19d79cca4e3df7a5a719547bdf984f5ab8eb811d55da822e5'
    }

    /**
     *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
     */
    get asV1500(): SessionKeyOwnerStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
 */
export interface SessionKeyOwnerStorageV1500 {
    get(key: [Uint8Array, Uint8Array]): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key: [Uint8Array, Uint8Array]): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key: [Uint8Array, Uint8Array]): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairs(key: [Uint8Array, Uint8Array]): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: [Uint8Array, Uint8Array]): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
}

export class SessionNextKeysStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'NextKeys'
    }

    /**
     *  The next session keys for a validator.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '631bdf50943dc1aa6eef0e538bc5f8db41fca7120b2bae11b9c7ad84ada29964'
    }

    /**
     *  The next session keys for a validator.
     */
    get asV1500(): SessionNextKeysStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next session keys for a validator.
 */
export interface SessionNextKeysStorageV1500 {
    get(key: Uint8Array): Promise<(v1500.SessionKeys | undefined)>
    getAll(): Promise<v1500.SessionKeys[]>
    getMany(keys: Uint8Array[]): Promise<(v1500.SessionKeys | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.SessionKeys][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.SessionKeys][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.SessionKeys][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.SessionKeys][]>
}

export class SessionQueuedChangedStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'QueuedChanged'
    }

    /**
     *  True if the underlying economic identities or weighting behind the validators
     *  has changed in the queued validator set.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if the underlying economic identities or weighting behind the validators
     *  has changed in the queued validator set.
     */
    get asV1500(): SessionQueuedChangedStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  True if the underlying economic identities or weighting behind the validators
 *  has changed in the queued validator set.
 */
export interface SessionQueuedChangedStorageV1500 {
    get(): Promise<boolean>
}

export class SessionQueuedKeysStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'QueuedKeys'
    }

    /**
     *  The queued keys for the next session. When the next session begins, these keys
     *  will be used to determine the validator's session keys.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '88cd205a98ff7b5562f0d030266b07e3566fdf283e05e6bd4c2405710a6a3b90'
    }

    /**
     *  The queued keys for the next session. When the next session begins, these keys
     *  will be used to determine the validator's session keys.
     */
    get asV1500(): SessionQueuedKeysStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The queued keys for the next session. When the next session begins, these keys
 *  will be used to determine the validator's session keys.
 */
export interface SessionQueuedKeysStorageV1500 {
    get(): Promise<[Uint8Array, v1500.SessionKeys][]>
}

export class SessionValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'Validators'
    }

    /**
     *  The current set of validators.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current set of validators.
     */
    get asV1500(): SessionValidatorsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current set of validators.
 */
export interface SessionValidatorsStorageV1500 {
    get(): Promise<Uint8Array[]>
}

export class SpaceFollowsSpaceFollowedByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'SpaceFollows'
    }

    protected getName() {
        return 'SpaceFollowedByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '3a5c068f0bee8f999fe4380eacc83b4955d448567a61570077100c6012e77833'
    }

    get asV1500(): SpaceFollowsSpaceFollowedByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface SpaceFollowsSpaceFollowedByAccountStorageV1500 {
    get(key: [Uint8Array, bigint]): Promise<boolean>
    getAll(): Promise<boolean[]>
    getMany(keys: [Uint8Array, bigint][]): Promise<boolean[]>
    getKeys(): Promise<[Uint8Array, bigint][]>
    getKeys(key: [Uint8Array, bigint]): Promise<[Uint8Array, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, bigint][]>
    getKeysPaged(pageSize: number, key: [Uint8Array, bigint]): AsyncIterable<[Uint8Array, bigint][]>
    getPairs(): Promise<[k: [Uint8Array, bigint], v: boolean][]>
    getPairs(key: [Uint8Array, bigint]): Promise<[k: [Uint8Array, bigint], v: boolean][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, bigint], v: boolean][]>
    getPairsPaged(pageSize: number, key: [Uint8Array, bigint]): AsyncIterable<[k: [Uint8Array, bigint], v: boolean][]>
}

export class SpaceFollowsSpaceFollowersStorage extends StorageBase {
    protected getPrefix() {
        return 'SpaceFollows'
    }

    protected getName() {
        return 'SpaceFollowers'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '184c47acb077e001b902021115493ba301fa2ec030dc0b1d5f2f5d836be22e29'
    }

    get asV1500(): SpaceFollowsSpaceFollowersStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface SpaceFollowsSpaceFollowersStorageV1500 {
    get(key: bigint): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: bigint[]): Promise<Uint8Array[][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: Uint8Array[]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: Uint8Array[]][]>
}

export class SpaceFollowsSpacesFollowedByAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'SpaceFollows'
    }

    protected getName() {
        return 'SpacesFollowedByAccount'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'f43f17495ab14bf2b34cb5b8bdaf9729aaba8bafa8592e7c09f6213ac3464821'
    }

    get asV1500(): SpaceFollowsSpacesFollowedByAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface SpaceFollowsSpacesFollowedByAccountStorageV1500 {
    get(key: Uint8Array): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: Uint8Array[]): Promise<bigint[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
}

export class SpaceOwnershipPendingSpaceOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'SpaceOwnership'
    }

    protected getName() {
        return 'PendingSpaceOwner'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'ffc087e1323413e73a9729e444bf115bb89bc74cab9f4347c9dc890a14ae8d68'
    }

    get asV1500(): SpaceOwnershipPendingSpaceOwnerStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface SpaceOwnershipPendingSpaceOwnerStorageV1500 {
    get(key: bigint): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: bigint[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: Uint8Array][]>
    getPairs(key: bigint): Promise<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: Uint8Array][]>
}

export class SpacesNextSpaceIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Spaces'
    }

    protected getName() {
        return 'NextSpaceId'
    }

    /**
     *  The next space id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The next space id.
     */
    get asV1500(): SpacesNextSpaceIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The next space id.
 */
export interface SpacesNextSpaceIdStorageV1500 {
    get(): Promise<bigint>
}

export class SpacesSpaceByIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Spaces'
    }

    protected getName() {
        return 'SpaceById'
    }

    /**
     *  Get the details of a space by its' id.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'ca7e1fe6a557d0d46aca0a24cbce813c2a7a0587a57ea47ecc9b233cadbe235f'
    }

    /**
     *  Get the details of a space by its' id.
     */
    get asV1500(): SpacesSpaceByIdStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Get the details of a space by its' id.
 */
export interface SpacesSpaceByIdStorageV1500 {
    get(key: bigint): Promise<(v1500.Space | undefined)>
    getAll(): Promise<v1500.Space[]>
    getMany(keys: bigint[]): Promise<(v1500.Space | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v1500.Space][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v1500.Space][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v1500.Space][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v1500.Space][]>
}

export class SpacesSpaceIdsByOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'Spaces'
    }

    protected getName() {
        return 'SpaceIdsByOwner'
    }

    /**
     *  Find the ids of all spaces owned, by a given account.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f43f17495ab14bf2b34cb5b8bdaf9729aaba8bafa8592e7c09f6213ac3464821'
    }

    /**
     *  Find the ids of all spaces owned, by a given account.
     */
    get asV1500(): SpacesSpaceIdsByOwnerStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Find the ids of all spaces owned, by a given account.
 */
export interface SpacesSpaceIdsByOwnerStorageV1500 {
    get(key: Uint8Array): Promise<bigint[]>
    getAll(): Promise<bigint[][]>
    getMany(keys: Uint8Array[]): Promise<bigint[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
}

export class SudoKeyStorage extends StorageBase {
    protected getPrefix() {
        return 'Sudo'
    }

    protected getName() {
        return 'Key'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get asV1500(): SudoKeyStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The `AccountId` of the sudo key.
 */
export interface SudoKeyStorageV1500 {
    get(): Promise<(Uint8Array | undefined)>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV1500(): SystemAccountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV1500 {
    get(key: Uint8Array): Promise<v1500.AccountInfo>
    getAll(): Promise<v1500.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v1500.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.AccountInfo][]>
}

export class SystemAllExtrinsicsLenStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'AllExtrinsicsLen'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get asV1500(): SystemAllExtrinsicsLenStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface SystemAllExtrinsicsLenStorageV1500 {
    get(): Promise<(number | undefined)>
}

export class SystemBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV1500(): SystemBlockHashStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV1500 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemBlockWeightStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockWeight'
    }

    /**
     *  The current weight for the block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
    }

    /**
     *  The current weight for the block.
     */
    get asV1500(): SystemBlockWeightStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current weight for the block.
 */
export interface SystemBlockWeightStorageV1500 {
    get(): Promise<v1500.PerDispatchClass>
}

export class SystemDigestStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Digest'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get asV1500(): SystemDigestStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface SystemDigestStorageV1500 {
    get(): Promise<v1500.Digest>
}

export class SystemEventCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventCount'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get asV1500(): SystemEventCountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface SystemEventCountStorageV1500 {
    get(): Promise<number>
}

export class SystemEventTopicsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventTopics'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get asV1500(): SystemEventTopicsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Mapping between a topic (represented by T::Hash) and a vector of indexes
 *  of events in the `<Events<T>>` list.
 * 
 *  All topic vectors have deterministic storage locations depending on the topic. This
 *  allows light-clients to leverage the changes trie storage tracking mechanism and
 *  in case of changes fetch the list of events of interest.
 * 
 *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
 *  the `EventIndex` then in case if the topic has the same contents on the next block
 *  no notification will be triggered thus the event might be lost.
 */
export interface SystemEventTopicsStorageV1500 {
    get(key: Uint8Array): Promise<[number, number][]>
    getAll(): Promise<[number, number][][]>
    getMany(keys: Uint8Array[]): Promise<[number, number][][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
}

export class SystemEventsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Events'
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'a243aec30c8875c009e742fa4d81e746ca65ca2dd5ca8f62cffa8810a622aedc'
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get asV1500(): SystemEventsStorageV1500 {
        assert(this.isV1500)
        return this as any
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get isV1501(): boolean {
        return this.getTypeHash() === 'b8ff83c04f4b1e5f6a2f5cf475a4ab22ed7e9692f0150269da5ffc4b7fc8f955'
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get asV1501(): SystemEventsStorageV1501 {
        assert(this.isV1501)
        return this as any
    }
}

/**
 *  Events deposited for the current block.
 * 
 *  NOTE: The item is unbound and should therefore never be read on chain.
 *  It could otherwise inflate the PoV size of a block.
 * 
 *  Events have a large in-memory size. Box the events to not go out-of-memory
 *  just in case someone still reads them from within the runtime.
 */
export interface SystemEventsStorageV1500 {
    get(): Promise<v1500.EventRecord[]>
}

/**
 *  Events deposited for the current block.
 * 
 *  NOTE: The item is unbound and should therefore never be read on chain.
 *  It could otherwise inflate the PoV size of a block.
 * 
 *  Events have a large in-memory size. Box the events to not go out-of-memory
 *  just in case someone still reads them from within the runtime.
 */
export interface SystemEventsStorageV1501 {
    get(): Promise<v1501.EventRecord[]>
}

export class SystemExecutionPhaseStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExecutionPhase'
    }

    /**
     *  The execution phase of the block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
    }

    /**
     *  The execution phase of the block.
     */
    get asV1500(): SystemExecutionPhaseStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The execution phase of the block.
 */
export interface SystemExecutionPhaseStorageV1500 {
    get(): Promise<(v1500.Phase | undefined)>
}

export class SystemExtrinsicCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicCount'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get asV1500(): SystemExtrinsicCountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Total extrinsics count for the current block.
 */
export interface SystemExtrinsicCountStorageV1500 {
    get(): Promise<(number | undefined)>
}

export class SystemExtrinsicDataStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicData'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get asV1500(): SystemExtrinsicDataStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface SystemExtrinsicDataStorageV1500 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemLastRuntimeUpgradeStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'LastRuntimeUpgrade'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get asV1500(): SystemLastRuntimeUpgradeStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface SystemLastRuntimeUpgradeStorageV1500 {
    get(): Promise<(v1500.LastRuntimeUpgradeInfo | undefined)>
}

export class SystemNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Number'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get asV1500(): SystemNumberStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface SystemNumberStorageV1500 {
    get(): Promise<number>
}

export class SystemParentHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ParentHash'
    }

    /**
     *  Hash of the previous block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Hash of the previous block.
     */
    get asV1500(): SystemParentHashStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Hash of the previous block.
 */
export interface SystemParentHashStorageV1500 {
    get(): Promise<Uint8Array>
}

export class SystemUpgradedToTripleRefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToTripleRefCount'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get asV1500(): SystemUpgradedToTripleRefCountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
 *  (default) if not.
 */
export interface SystemUpgradedToTripleRefCountStorageV1500 {
    get(): Promise<boolean>
}

export class SystemUpgradedToU32RefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToU32RefCount'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get asV1500(): SystemUpgradedToU32RefCountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface SystemUpgradedToU32RefCountStorageV1500 {
    get(): Promise<boolean>
}

export class TimestampDidUpdateStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'DidUpdate'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get asV1500(): TimestampDidUpdateStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Did the timestamp get updated in this block?
 */
export interface TimestampDidUpdateStorageV1500 {
    get(): Promise<boolean>
}

export class TimestampNowStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'Now'
    }

    /**
     *  Current time for the current block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV1500(): TimestampNowStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV1500 {
    get(): Promise<bigint>
}

export class TransactionPaymentNextFeeMultiplierStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'NextFeeMultiplier'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    get asV1500(): TransactionPaymentNextFeeMultiplierStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface TransactionPaymentNextFeeMultiplierStorageV1500 {
    get(): Promise<bigint>
}

export class TransactionPaymentStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'StorageVersion'
    }

    get isV1500(): boolean {
        return this.getTypeHash() === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
    }

    get asV1500(): TransactionPaymentStorageVersionStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

export interface TransactionPaymentStorageVersionStorageV1500 {
    get(): Promise<v1500.Type_167>
}

export class VestingStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Vesting'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  New networks start with latest version, as determined by the genesis build.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '5370c514276f3735e13df7db1f1bbacaba918c365a3ed949597f7ce091eeb77e'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  New networks start with latest version, as determined by the genesis build.
     */
    get asV1500(): VestingStorageVersionStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Storage version of the pallet.
 * 
 *  New networks start with latest version, as determined by the genesis build.
 */
export interface VestingStorageVersionStorageV1500 {
    get(): Promise<v1500.Type_195>
}

export class VestingVestingStorage extends StorageBase {
    protected getPrefix() {
        return 'Vesting'
    }

    protected getName() {
        return 'Vesting'
    }

    /**
     *  Information regarding the vesting of a given account.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '22ac0db91087ba9b3f5dee769d5e3398f8c8c045cabf7f6585992df66dba74db'
    }

    /**
     *  Information regarding the vesting of a given account.
     */
    get asV1500(): VestingVestingStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Information regarding the vesting of a given account.
 */
export interface VestingVestingStorageV1500 {
    get(key: Uint8Array): Promise<(v1500.VestingInfo[] | undefined)>
    getAll(): Promise<v1500.VestingInfo[][]>
    getMany(keys: Uint8Array[]): Promise<(v1500.VestingInfo[] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1500.VestingInfo[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1500.VestingInfo[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1500.VestingInfo[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1500.VestingInfo[]][]>
}

export class XcmpQueueInboundXcmpMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'InboundXcmpMessages'
    }

    /**
     *  Inbound aggregate XCMP messages. It can only be one per ParaId/block.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '7bf0d83d361216e18f7bca971cbf4fbd433158d3be6ac33fe278fb6d9bfb0469'
    }

    /**
     *  Inbound aggregate XCMP messages. It can only be one per ParaId/block.
     */
    get asV1500(): XcmpQueueInboundXcmpMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Inbound aggregate XCMP messages. It can only be one per ParaId/block.
 */
export interface XcmpQueueInboundXcmpMessagesStorageV1500 {
    get(key1: number, key2: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number][]): Promise<Uint8Array[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
}

export class XcmpQueueInboundXcmpStatusStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'InboundXcmpStatus'
    }

    /**
     *  Status of the inbound XCMP channels.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '9463adeec55c62de9270b726721d07d1258e861fc23bcadc753e06286f1e9d94'
    }

    /**
     *  Status of the inbound XCMP channels.
     */
    get asV1500(): XcmpQueueInboundXcmpStatusStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Status of the inbound XCMP channels.
 */
export interface XcmpQueueInboundXcmpStatusStorageV1500 {
    get(): Promise<v1500.InboundChannelDetails[]>
}

export class XcmpQueueOutboundXcmpMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'OutboundXcmpMessages'
    }

    /**
     *  The messages outbound in a given XCMP channel.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f8f791196403322746e9b911cdffc1dfb7880ff624b4765b5515d8264f7df7b2'
    }

    /**
     *  The messages outbound in a given XCMP channel.
     */
    get asV1500(): XcmpQueueOutboundXcmpMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The messages outbound in a given XCMP channel.
 */
export interface XcmpQueueOutboundXcmpMessagesStorageV1500 {
    get(key1: number, key2: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number][]): Promise<Uint8Array[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
}

export class XcmpQueueOutboundXcmpStatusStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'OutboundXcmpStatus'
    }

    /**
     *  The non-empty XCMP channels in order of becoming non-empty, and the index of the first
     *  and last outbound message. If the two indices are equal, then it indicates an empty
     *  queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
     *  than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
     *  case of the need to send a high-priority signal message this block.
     *  The bool is true if there is a signal message waiting to be sent.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '0803a0634571a8cfdaa8b16757a06e235664ceb84c144cf0d5953fd2dd0f7f3a'
    }

    /**
     *  The non-empty XCMP channels in order of becoming non-empty, and the index of the first
     *  and last outbound message. If the two indices are equal, then it indicates an empty
     *  queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
     *  than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
     *  case of the need to send a high-priority signal message this block.
     *  The bool is true if there is a signal message waiting to be sent.
     */
    get asV1500(): XcmpQueueOutboundXcmpStatusStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The non-empty XCMP channels in order of becoming non-empty, and the index of the first
 *  and last outbound message. If the two indices are equal, then it indicates an empty
 *  queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
 *  than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
 *  case of the need to send a high-priority signal message this block.
 *  The bool is true if there is a signal message waiting to be sent.
 */
export interface XcmpQueueOutboundXcmpStatusStorageV1500 {
    get(): Promise<v1500.OutboundChannelDetails[]>
}

export class XcmpQueueOverweightStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'Overweight'
    }

    /**
     *  The messages that exceeded max individual message weight budget.
     * 
     *  These message stay in this storage map until they are manually dispatched via
     *  `service_overweight`.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '2eb096a3f66cc2d3a7f63f9f097c63bad7d960c4949a759a34865c7919f65122'
    }

    /**
     *  The messages that exceeded max individual message weight budget.
     * 
     *  These message stay in this storage map until they are manually dispatched via
     *  `service_overweight`.
     */
    get asV1500(): XcmpQueueOverweightStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The messages that exceeded max individual message weight budget.
 * 
 *  These message stay in this storage map until they are manually dispatched via
 *  `service_overweight`.
 */
export interface XcmpQueueOverweightStorageV1500 {
    get(key: bigint): Promise<([number, number, Uint8Array] | undefined)>
    getAll(): Promise<[number, number, Uint8Array][]>
    getMany(keys: bigint[]): Promise<([number, number, Uint8Array] | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [number, number, Uint8Array]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [number, number, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [number, number, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [number, number, Uint8Array]][]>
}

export class XcmpQueueOverweightCountStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'OverweightCount'
    }

    /**
     *  The number of overweight messages ever recorded in `Overweight`. Also doubles as the next
     *  available free overweight index.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The number of overweight messages ever recorded in `Overweight`. Also doubles as the next
     *  available free overweight index.
     */
    get asV1500(): XcmpQueueOverweightCountStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The number of overweight messages ever recorded in `Overweight`. Also doubles as the next
 *  available free overweight index.
 */
export interface XcmpQueueOverweightCountStorageV1500 {
    get(): Promise<bigint>
}

export class XcmpQueueQueueConfigStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'QueueConfig'
    }

    /**
     *  The configuration which controls the dynamics of the outbound queue.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'bc17b84c06c7e0df3f2684c76020e6d76ff231be948076edbe6751b00937b0b1'
    }

    /**
     *  The configuration which controls the dynamics of the outbound queue.
     */
    get asV1500(): XcmpQueueQueueConfigStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  The configuration which controls the dynamics of the outbound queue.
 */
export interface XcmpQueueQueueConfigStorageV1500 {
    get(): Promise<v1500.QueueConfigData>
}

export class XcmpQueueQueueSuspendedStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'QueueSuspended'
    }

    /**
     *  Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
     */
    get asV1500(): XcmpQueueQueueSuspendedStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
 */
export interface XcmpQueueQueueSuspendedStorageV1500 {
    get(): Promise<boolean>
}

export class XcmpQueueSignalMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'XcmpQueue'
    }

    protected getName() {
        return 'SignalMessages'
    }

    /**
     *  Any signal messages waiting to be sent.
     */
    get isV1500(): boolean {
        return this.getTypeHash() === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
    }

    /**
     *  Any signal messages waiting to be sent.
     */
    get asV1500(): XcmpQueueSignalMessagesStorageV1500 {
        assert(this.isV1500)
        return this as any
    }
}

/**
 *  Any signal messages waiting to be sent.
 */
export interface XcmpQueueSignalMessagesStorageV1500 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}
