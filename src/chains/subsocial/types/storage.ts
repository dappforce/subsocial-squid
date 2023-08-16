import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v7 from './v7'
import * as v13 from './v13'
import * as v27 from './v27'

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
    get isV7(): boolean {
        return this.getTypeHash() === '9567cabf419cb972d5a42c9a62c92c107f30d2a8ccfc2c74695671b5eed957b3'
    }

    /**
     *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
     */
    get asV7(): DomainsDomainByInnerValueStorageV7 {
        assert(this.isV7)
        return this as any
    }
}

/**
 *  TWOX-NOTE: Safe as `AccountId`s are crypto hashes anyway.
 */
export interface DomainsDomainByInnerValueStorageV7 {
    get(key1: Uint8Array, key2: v7.InnerValue): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, v7.InnerValue][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[Uint8Array, v7.InnerValue][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v7.InnerValue][]>
    getKeys(key1: Uint8Array, key2: v7.InnerValue): Promise<[Uint8Array, v7.InnerValue][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v7.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v7.InnerValue][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v7.InnerValue): AsyncIterable<[Uint8Array, v7.InnerValue][]>
    getPairs(): Promise<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
    getPairs(key1: Uint8Array, key2: v7.InnerValue): Promise<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v7.InnerValue): AsyncIterable<[k: [Uint8Array, v7.InnerValue], v: Uint8Array][]>
}

export class DomainsRegisteredDomainsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'RegisteredDomains'
    }

    get isV7(): boolean {
        return this.getTypeHash() === 'f308dae103f1b242c473b5d7740850c24120b1b5eda9c106cd9b6672bf2c13c3'
    }

    get asV7(): DomainsRegisteredDomainsStorageV7 {
        assert(this.isV7)
        return this as any
    }

    /**
     *  Metadata associated per domain.
     */
    get isV13(): boolean {
        return this.getTypeHash() === 'be78e341092f66766e2cb8c347e1a4866b6921cbee315613644993e196406046'
    }

    /**
     *  Metadata associated per domain.
     */
    get asV13(): DomainsRegisteredDomainsStorageV13 {
        assert(this.isV13)
        return this as any
    }

    /**
     *  Metadata associated per domain.
     */
    get isV27(): boolean {
        return this.getTypeHash() === '75df0877b9b25fdc62b9c03ca7890295e0a46ad67c32c1687d7989e154d41fcb'
    }

    /**
     *  Metadata associated per domain.
     */
    get asV27(): DomainsRegisteredDomainsStorageV27 {
        assert(this.isV27)
        return this as any
    }
}

export interface DomainsRegisteredDomainsStorageV7 {
    get(key: Uint8Array): Promise<(v7.DomainMeta | undefined)>
    getAll(): Promise<v7.DomainMeta[]>
    getMany(keys: Uint8Array[]): Promise<(v7.DomainMeta | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v7.DomainMeta][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v7.DomainMeta][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v7.DomainMeta][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v7.DomainMeta][]>
}

/**
 *  Metadata associated per domain.
 */
export interface DomainsRegisteredDomainsStorageV13 {
    get(key: Uint8Array): Promise<(v13.DomainMeta | undefined)>
    getAll(): Promise<v13.DomainMeta[]>
    getMany(keys: Uint8Array[]): Promise<(v13.DomainMeta | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v13.DomainMeta][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v13.DomainMeta][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v13.DomainMeta][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v13.DomainMeta][]>
}

/**
 *  Metadata associated per domain.
 */
export interface DomainsRegisteredDomainsStorageV27 {
    get(key: Uint8Array): Promise<(v27.DomainMeta | undefined)>
    getAll(): Promise<v27.DomainMeta[]>
    getMany(keys: Uint8Array[]): Promise<(v27.DomainMeta | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v27.DomainMeta][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v27.DomainMeta][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v27.DomainMeta][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v27.DomainMeta][]>
}
