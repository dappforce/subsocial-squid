import {sts, Result, Option, Bytes, BitSequence} from './support'

export type InnerValue = InnerValue_Account | InnerValue_Post | InnerValue_Space

export interface InnerValue_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface InnerValue_Post {
    __kind: 'Post'
    value: bigint
}

export interface InnerValue_Space {
    __kind: 'Space'
    value: bigint
}

export type AccountId32 = Bytes

export interface DomainMeta {
    created: WhoAndWhen
    updated?: (WhoAndWhen | undefined)
    expiresAt: number
    owner: AccountId32
    content: Content
    innerValue?: (InnerValue | undefined)
    outerValue?: (Bytes | undefined)
    domainDeposit: bigint
    outerValueDeposit: bigint
}

export type Content = Content_Hyper | Content_IPFS | Content_None | Content_Raw

export interface Content_Hyper {
    __kind: 'Hyper'
    value: Bytes
}

export interface Content_IPFS {
    __kind: 'IPFS'
    value: Bytes
}

export interface Content_None {
    __kind: 'None'
}

export interface Content_Raw {
    __kind: 'Raw'
    value: Bytes
}

export interface WhoAndWhen {
    account: AccountId32
    block: number
    time: bigint
}

export const DomainMeta: sts.Type<DomainMeta> = sts.struct(() => {
    return  {
        created: WhoAndWhen,
        updated: sts.option(() => WhoAndWhen),
        expiresAt: sts.number(),
        owner: AccountId32,
        content: Content,
        innerValue: sts.option(() => InnerValue),
        outerValue: sts.option(() => sts.bytes()),
        domainDeposit: sts.bigint(),
        outerValueDeposit: sts.bigint(),
    }
})

export const WhoAndWhen: sts.Type<WhoAndWhen> = sts.struct(() => {
    return  {
        account: AccountId32,
        block: sts.number(),
        time: sts.bigint(),
    }
})

export type BoundedVec = Bytes

export const InnerValue: sts.Type<InnerValue> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        Post: sts.bigint(),
        Space: sts.bigint(),
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

export const Content: sts.Type<Content> = sts.closedEnum(() => {
    return  {
        Hyper: sts.bytes(),
        IPFS: sts.bytes(),
        None: sts.unit(),
        Raw: sts.bytes(),
    }
})

export const BoundedVec = sts.bytes()

export const AccountId32 = sts.bytes()
