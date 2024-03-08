import {sts, Result, Option, Bytes, BitSequence} from './support'

export type BoundedVec = Bytes

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

export type AccountId32 = Bytes

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

export const InnerValue: sts.Type<InnerValue> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        Post: sts.bigint(),
        Space: sts.bigint(),
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

export const WhoAndWhen: sts.Type<WhoAndWhen> = sts.struct(() => {
    return  {
        account: AccountId32,
        block: sts.number(),
        time: sts.bigint(),
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
        IPFS: sts.bytes(),
        None: sts.unit(),
        Other: sts.bytes(),
    }
})

export const BoundedVec = sts.bytes()

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

export const AccountId32 = sts.bytes()
