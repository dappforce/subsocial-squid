import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {EventName} from "./_eventName"
import {Space} from "./space.model"
import {Post} from "./post.model"
import {Reaction} from "./reaction.model"

/**
 * The Activity entity, which represents any activity on the blockchain (within the list of tracked events).
 */
@Entity_()
export class Activity {
    constructor(props?: Partial<Activity>) {
        Object.assign(this, props)
    }

    /**
     * The ID of an Activity. It has the following structure: <blockNumber>-<indexInBlock>-<md5Hash(eventName)>` (e.g. 1093209-1001-1ee8fd8482c322254acff29a8f52f5e1)
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A One-To-One relationship with the Account that initiated the current activity (it's usually a caller Account)
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    /**
     * The block height when an activity was done
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    /**
     * The event's index in the block
     */
    @Column_("int4", {nullable: false})
    eventIndex!: number

    /**
     * The event's name
     */
    @Index_()
    @Column_("varchar", {length: 30, nullable: false})
    event!: EventName

    /**
     * A One-to-One relationship with the following Account if the event is `AccountFollowed` or `AccountUnfollowed`.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    followingAccount!: Account | undefined | null

    /**
     * A One-to-One relationship with the Space that is involved in the current Activity
     */
    @Index_()
    @ManyToOne_(() => Space, {nullable: true})
    space!: Space | undefined | null

    /**
     * A One-to-One relationship with the previous Space if the event is `PostMoved` or `DomainMetaUpdated`
     */
    @Index_()
    @ManyToOne_(() => Space, {nullable: true})
    spacePrev!: Space | undefined | null

    /**
     * A One-to-One relationship with the previous owner's Account if the event is "SpaceOwnershipTransferAccepted"
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    newOwner!: Account | undefined | null

    /**
     * A One-to-One relationship with the new owner's Account if the event is "SpaceOwnershipTransferAccepted"
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    oldOwner!: Account | undefined | null

    /**
     * A One-to-One relationship with the Post that is involved in the current Activity
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    post!: Post | undefined | null

    /**
     * A One-to-One relationship with the Reaction that is involved in the current Activity
     */
    @Index_()
    @ManyToOne_(() => Reaction, {nullable: true})
    reaction!: Reaction | undefined | null

    /**
     * The DateTime when the current activity was done
     */
    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    /**
     * Is this Activity the most recent in the list of Activities of this type (same event) from this account?
     */
    @Index_()
    @Column_("bool", {nullable: true})
    aggregated!: boolean | undefined | null

    /**
     * The total number of Activities of the same event type for a specific Account.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    aggCount!: bigint

    /**
     * The username of Space or Account which was registered or updated in this particular Activity.
     */
    @Column_("text", {nullable: true})
    username!: string | undefined | null
}
