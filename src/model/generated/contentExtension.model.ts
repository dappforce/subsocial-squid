import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {ContentExtensionSchemaId} from "./_contentExtensionSchemaId"
import {Post} from "./post.model"
import {Account} from "./account.model"
import {EvmAccount} from "./evmAccount.model"
import {ExtensionPinnedResource} from "./extensionPinnedResource.model"

/**
 * Detailed information about the Tweet attached to a Post
 */
@Entity_()
export class ContentExtension {
    constructor(props?: Partial<ContentExtension>) {
        Object.assign(this, props)
    }

    /**
     * The ContentExtension ID.
     * Consists of the parent post ID plus the index in the extensions list, which are attached to the Post.
     * (e.g. "4940-0")
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The ContentExtension properties schema ID.
     */
    @Column_("varchar", {length: 23, nullable: false})
    extensionSchemaId!: ContentExtensionSchemaId

    /**
     * The Post where the extension was published.
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    parentPost!: Post

    /**
     * A One-To-One relationship with the Account entity of a ContentExtension's creator.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    createdBy!: Account

    /**
     * The Substrate Account of the sender of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    fromSubstrate!: Account | undefined | null

    /**
     * The Evm Account of the sender of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    fromEvm!: EvmAccount | undefined | null

    /**
     * The Substrate Account of the target (recipient) of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    toSubstrate!: Account | undefined | null

    /**
     * The Evm Account of the target (recipient) of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    toEvm!: EvmAccount | undefined | null

    /**
     * The name of the token transferred in the Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("text", {nullable: true})
    token!: string | undefined | null

    /**
     * The amount of tokens transferred in the Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    /**
     * The decimals value of token transferred in the Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("int4", {nullable: true})
    decimals!: number | undefined | null

    /**
     * The transaction hash of the Donation transfer (actual for 'subsocial-donations")
     */
    @Column_("text", {nullable: true})
    txHash!: string | undefined | null

    /**
     * The name of the blockchain that contains the attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    chain!: string | undefined | null

    /**
     * The collection ID of the attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    collectionId!: string | undefined | null

    /**
     * The ID of the attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    nftId!: string | undefined | null

    /**
     * The URL of the attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    url!: string | undefined | null

    /**
     * The URL or CID of attached image (actual for 'subsocial-image")
     */
    @Column_("text", {nullable: true})
    image!: string | undefined | null

    /**
     * The message of secret Secret box (actual for 'subsocial-secret-box")
     */
    @Column_("text", {nullable: true})
    message!: string | undefined | null

    /**
     * The nonce of encrypted Secret box (actual for 'subsocial-secret-box")
     */
    @Column_("text", {nullable: true})
    nonce!: string | undefined | null

    /**
     * The recipient Account of Secret box message (actual for 'subsocial-secret-box")
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    recipient!: Account | undefined | null

    /**
     * The pinned posts list (actual for 'subsocial-pinned-posts")
     */
    @OneToMany_(() => ExtensionPinnedResource, e => e.contentExtension)
    pinnedResources!: ExtensionPinnedResource[]
}
