import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ContentExtensionSchemaId} from "./_contentExtensionSchemaId"
import {Post} from "./post.model"
import {Account} from "./account.model"
import {EvmAccount} from "./evmAccount.model"

@Entity_()
export class ContentExtension {
    constructor(props?: Partial<ContentExtension>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 19, nullable: false})
    extensionSchemaId!: ContentExtensionSchemaId

    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    parentPost!: Post

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    createdBy!: Account

    @Column_("text", {nullable: true})
    chain!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    fromSubstrate!: Account | undefined | null

    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    fromEvm!: EvmAccount | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    toSubstrate!: Account | undefined | null

    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    toEvm!: EvmAccount | undefined | null

    @Column_("text", {nullable: true})
    token!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Column_("int4", {nullable: true})
    decimals!: number | undefined | null

    @Column_("text", {nullable: true})
    txHash!: string | undefined | null

    @Column_("text", {nullable: true})
    collectionId!: string | undefined | null

    @Column_("text", {nullable: true})
    nftId!: string | undefined | null

    @Column_("text", {nullable: true})
    url!: string | undefined | null
}
