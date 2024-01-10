import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v7 from '../v7'
import * as v13 from '../v13'
import * as v27 from '../v27'

export const reservedWords =  {
    v7: new StorageType('Domains.ReservedWords', 'Default', [v7.BoundedVec], sts.boolean()) as ReservedWordsV7,
}

export interface ReservedWordsV7  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block, key: v7.BoundedVec): Promise<(boolean | undefined)>
    getMany(block: Block, keys: v7.BoundedVec[]): Promise<(boolean | undefined)[]>
    getKeys(block: Block): Promise<v7.BoundedVec[]>
    getKeys(block: Block, key: v7.BoundedVec): Promise<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<v7.BoundedVec[]>
    getPairs(block: Block): Promise<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairs(block: Block, key: v7.BoundedVec): Promise<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<[k: v7.BoundedVec, v: (boolean | undefined)][]>
}

export const registeredDomains =  {
    v7: new StorageType('Domains.RegisteredDomains', 'Optional', [v7.BoundedVec], v7.DomainMeta) as RegisteredDomainsV7,
    /**
     *  Metadata associated per domain.
     */
    v13: new StorageType('Domains.RegisteredDomains', 'Optional', [v13.BoundedVec], v13.DomainMeta) as RegisteredDomainsV13,
    /**
     *  Metadata associated per domain.
     */
    v27: new StorageType('Domains.RegisteredDomains', 'Optional', [v27.BoundedVec], v27.DomainMeta) as RegisteredDomainsV27,
}

export interface RegisteredDomainsV7  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v7.BoundedVec): Promise<(v7.DomainMeta | undefined)>
    getMany(block: Block, keys: v7.BoundedVec[]): Promise<(v7.DomainMeta | undefined)[]>
    getKeys(block: Block): Promise<v7.BoundedVec[]>
    getKeys(block: Block, key: v7.BoundedVec): Promise<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<v7.BoundedVec[]>
    getPairs(block: Block): Promise<[k: v7.BoundedVec, v: (v7.DomainMeta | undefined)][]>
    getPairs(block: Block, key: v7.BoundedVec): Promise<[k: v7.BoundedVec, v: (v7.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v7.BoundedVec, v: (v7.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<[k: v7.BoundedVec, v: (v7.DomainMeta | undefined)][]>
}

/**
 *  Metadata associated per domain.
 */
export interface RegisteredDomainsV13  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v13.BoundedVec): Promise<(v13.DomainMeta | undefined)>
    getMany(block: Block, keys: v13.BoundedVec[]): Promise<(v13.DomainMeta | undefined)[]>
    getKeys(block: Block): Promise<v13.BoundedVec[]>
    getKeys(block: Block, key: v13.BoundedVec): Promise<v13.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v13.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block, key: v13.BoundedVec): AsyncIterable<v13.BoundedVec[]>
    getPairs(block: Block): Promise<[k: v13.BoundedVec, v: (v13.DomainMeta | undefined)][]>
    getPairs(block: Block, key: v13.BoundedVec): Promise<[k: v13.BoundedVec, v: (v13.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v13.BoundedVec, v: (v13.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v13.BoundedVec): AsyncIterable<[k: v13.BoundedVec, v: (v13.DomainMeta | undefined)][]>
}

/**
 *  Metadata associated per domain.
 */
export interface RegisteredDomainsV27  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v27.BoundedVec): Promise<(v27.DomainMeta | undefined)>
    getMany(block: Block, keys: v27.BoundedVec[]): Promise<(v27.DomainMeta | undefined)[]>
    getKeys(block: Block): Promise<v27.BoundedVec[]>
    getKeys(block: Block, key: v27.BoundedVec): Promise<v27.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v27.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block, key: v27.BoundedVec): AsyncIterable<v27.BoundedVec[]>
    getPairs(block: Block): Promise<[k: v27.BoundedVec, v: (v27.DomainMeta | undefined)][]>
    getPairs(block: Block, key: v27.BoundedVec): Promise<[k: v27.BoundedVec, v: (v27.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v27.BoundedVec, v: (v27.DomainMeta | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v27.BoundedVec): AsyncIterable<[k: v27.BoundedVec, v: (v27.DomainMeta | undefined)][]>
}

export const domainsByOwner =  {
    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    v7: new StorageType('Domains.DomainsByOwner', 'Default', [v7.AccountId32], sts.array(() => v7.BoundedVec)) as DomainsByOwnerV7,
}

/**
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainsByOwnerV7  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v7.BoundedVec[]
    get(block: Block, key: v7.AccountId32): Promise<(v7.BoundedVec[] | undefined)>
    getMany(block: Block, keys: v7.AccountId32[]): Promise<(v7.BoundedVec[] | undefined)[]>
    getKeys(block: Block): Promise<v7.AccountId32[]>
    getKeys(block: Block, key: v7.AccountId32): Promise<v7.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v7.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block, key: v7.AccountId32): AsyncIterable<v7.AccountId32[]>
    getPairs(block: Block): Promise<[k: v7.AccountId32, v: (v7.BoundedVec[] | undefined)][]>
    getPairs(block: Block, key: v7.AccountId32): Promise<[k: v7.AccountId32, v: (v7.BoundedVec[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v7.AccountId32, v: (v7.BoundedVec[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v7.AccountId32): AsyncIterable<[k: v7.AccountId32, v: (v7.BoundedVec[] | undefined)][]>
}

export const domainByInnerValue =  {
    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    v7: new StorageType('Domains.DomainByInnerValue', 'Optional', [v7.AccountId32, v7.InnerValue], v7.BoundedVec) as DomainByInnerValueV7,
}

/**
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainByInnerValueV7  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v7.AccountId32, key2: v7.InnerValue): Promise<(v7.BoundedVec | undefined)>
    getMany(block: Block, keys: [v7.AccountId32, v7.InnerValue][]): Promise<(v7.BoundedVec | undefined)[]>
    getKeys(block: Block): Promise<[v7.AccountId32, v7.InnerValue][]>
    getKeys(block: Block, key1: v7.AccountId32): Promise<[v7.AccountId32, v7.InnerValue][]>
    getKeys(block: Block, key1: v7.AccountId32, key2: v7.InnerValue): Promise<[v7.AccountId32, v7.InnerValue][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v7.AccountId32, v7.InnerValue][]>
    getKeysPaged(pageSize: number, block: Block, key1: v7.AccountId32): AsyncIterable<[v7.AccountId32, v7.InnerValue][]>
    getKeysPaged(pageSize: number, block: Block, key1: v7.AccountId32, key2: v7.InnerValue): AsyncIterable<[v7.AccountId32, v7.InnerValue][]>
    getPairs(block: Block): Promise<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
    getPairs(block: Block, key1: v7.AccountId32): Promise<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
    getPairs(block: Block, key1: v7.AccountId32, key2: v7.InnerValue): Promise<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v7.AccountId32): AsyncIterable<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v7.AccountId32, key2: v7.InnerValue): AsyncIterable<[k: [v7.AccountId32, v7.InnerValue], v: (v7.BoundedVec | undefined)][]>
}

export const supportedTlds =  {
    v7: new StorageType('Domains.SupportedTlds', 'Default', [v7.BoundedVec], sts.boolean()) as SupportedTldsV7,
}

export interface SupportedTldsV7  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block, key: v7.BoundedVec): Promise<(boolean | undefined)>
    getMany(block: Block, keys: v7.BoundedVec[]): Promise<(boolean | undefined)[]>
    getKeys(block: Block): Promise<v7.BoundedVec[]>
    getKeys(block: Block, key: v7.BoundedVec): Promise<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v7.BoundedVec[]>
    getKeysPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<v7.BoundedVec[]>
    getPairs(block: Block): Promise<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairs(block: Block, key: v7.BoundedVec): Promise<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v7.BoundedVec, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v7.BoundedVec): AsyncIterable<[k: v7.BoundedVec, v: (boolean | undefined)][]>
}

export const pricesConfig =  {
    v27: new StorageType('Domains.PricesConfig', 'Default', [], sts.array(() => sts.tuple(() => [sts.number(), sts.bigint()]))) as PricesConfigV27,
}

export interface PricesConfigV27  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, bigint][]
    get(block: Block): Promise<([number, bigint][] | undefined)>
}

export const paymentBeneficiary =  {
    /**
     *  An account that receives payment for domain registration.
     */
    v27: new StorageType('Domains.PaymentBeneficiary', 'Default', [], v27.AccountId32) as PaymentBeneficiaryV27,
}

/**
 *  An account that receives payment for domain registration.
 */
export interface PaymentBeneficiaryV27  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v27.AccountId32
    get(block: Block): Promise<(v27.AccountId32 | undefined)>
}
