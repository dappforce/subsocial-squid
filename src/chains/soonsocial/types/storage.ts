import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v1500 from './v1500'

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
