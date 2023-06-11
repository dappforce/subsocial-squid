import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v2300 from './v2300'

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
    get isV2300(): boolean {
        return this.getTypeHash() === '9567cabf419cb972d5a42c9a62c92c107f30d2a8ccfc2c74695671b5eed957b3'
    }

    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get asV2300(): DomainsDomainByInnerValueStorageV2300 {
        assert(this.isV2300)
        return this as any
    }
}

/**
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainsDomainByInnerValueStorageV2300 {
    get(key1: Uint8Array, key2: v2300.InnerValue): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, v2300.InnerValue][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[Uint8Array, v2300.InnerValue][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v2300.InnerValue][]>
    getKeys(key1: Uint8Array, key2: v2300.InnerValue): Promise<[Uint8Array, v2300.InnerValue][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v2300.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v2300.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v2300.InnerValue): AsyncIterable<[Uint8Array, v2300.InnerValue][]>
    getPairs(): Promise<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array, key2: v2300.InnerValue): Promise<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v2300.InnerValue): AsyncIterable<[k: [Uint8Array, v2300.InnerValue], v: Uint8Array][]>
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
    get isV2300(): boolean {
        return this.getTypeHash() === 'be78e341092f66766e2cb8c347e1a4866b6921cbee315613644993e196406046'
    }

    /**
     *  Metadata associated per domain.
     */
    get asV2300(): DomainsRegisteredDomainsStorageV2300 {
        assert(this.isV2300)
        return this as any
    }
}

/**
 *  Metadata associated per domain.
 */
export interface DomainsRegisteredDomainsStorageV2300 {
    get(key: Uint8Array): Promise<(v2300.DomainMeta | undefined)>
    getAll(): Promise<v2300.DomainMeta[]>
    getMany(keys: Uint8Array[]): Promise<(v2300.DomainMeta | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v2300.DomainMeta][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v2300.DomainMeta][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v2300.DomainMeta][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v2300.DomainMeta][]>
}
