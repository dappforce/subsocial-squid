import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ContentExtensionSchemaId} from "./_contentExtensionSchemaId"
import {Post} from "./post.model"
import {Account} from "./account.model"
import {EvmAccount} from "./evmAccount.model"

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
     * Consists of parent post ID + index in extensions list, which are attached to the Post.
     * (e.g. "4940-0")
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The ContentExtension properties schema ID.
     */
    @Column_("varchar", {length: 19, nullable: false})
    extensionSchemaId!: ContentExtensionSchemaId

    /**
     * The Post where extensions was published.
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
     * The sender Substrate Account of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    fromSubstrate!: Account | undefined | null

    /**
     * The sender Evm Account of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    fromEvm!: EvmAccount | undefined | null

    /**
     * The target (recipient) Substrate Account of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    toSubstrate!: Account | undefined | null

    /**
     * The target (recipient) Evm Account of the Donation transaction (actual for 'subsocial-donations")
     */
    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    toEvm!: EvmAccount | undefined | null

    /**
     * The token name of the Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("text", {nullable: true})
    token!: string | undefined | null

    /**
     * The amount of the Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    /**
     * The decimals value of transferred token in Donation transaction (actual for 'subsocial-donations")
     */
    @Column_("int4", {nullable: true})
    decimals!: number | undefined | null

    /**
     * The transaction hash of the Donation transfer (actual for 'subsocial-donations")
     */
    @Column_("text", {nullable: true})
    txHash!: string | undefined | null

    /**
     * The chain name of attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    chain!: string | undefined | null

    /**
     * The collection ID of attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    collectionId!: string | undefined | null

    /**
     * The ID of attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    nftId!: string | undefined | null

    /**
     * The URL of attached NFT (actual for 'subsocial-evm-nft")
     */
    @Column_("text", {nullable: true})
    url!: string | undefined | null
}
