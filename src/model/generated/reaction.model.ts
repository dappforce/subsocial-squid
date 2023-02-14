import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Post} from "./post.model"
import {Account} from "./account.model"
import {ReactionKind} from "./_reactionKind"
import {Status} from "./_status"

/**
 * The Post Reaction entity
 */
@Entity_()
export class Reaction {
    constructor(props?: Partial<Reaction>) {
        Object.assign(this, props)
    }

    /**
     * The ID of a Reaction, which will have the same value and reaction ID on the blockchain.
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A One-to-One relationship with the Post that the current reaction has been made for.
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    post!: Post

    /**
     * A One-to-One relationship with the Account that created the Reaction.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    /**
     * The type of Reaction (Upvote, Downvote).
     */
    @Index_()
    @Column_("varchar", {length: 8, nullable: false})
    kind!: ReactionKind

    /**
     * The status of a Reaction (Active, Deleted). This is a synthetic value.
     * It does not exist on the blockchain and is only used in the squid.
     */
    @Index_()
    @Column_("varchar", {length: 7, nullable: false})
    status!: Status

    /**
     * The block height when a Reaction was created.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAtBlock!: bigint

    /**
     * The DateTime when a Reaction was created.
     */
    @Column_("timestamp with time zone", {nullable: false})
    createdAtTime!: Date

    /**
     * The Block height when a Reaction was updated.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    updatedAtBlock!: bigint | undefined | null

    /**
     * The DateTime when a Reaction was updated.
     */
    @Column_("timestamp with time zone", {nullable: true})
    updatedAtTime!: Date | undefined | null
}
