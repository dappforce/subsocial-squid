import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Space} from "./space.model"
import {AccountFollowers} from "./accountFollowers.model"
import {Post} from "./post.model"
import {SpaceFollowers} from "./spaceFollowers.model"
import {NewsFeed} from "./newsFeed.model"
import {Notification} from "./notification.model"
import {Activity} from "./activity.model"
import {Reaction} from "./reaction.model"
import {EvmSubstrateAccountLink} from "./evmSubstrateAccountLink.model"
import {ContentExtension} from "./contentExtension.model"

/**
 * The Account entity
 */
@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * The account's public key converted to ss58 format for the Subsocial chain (prefix "28")
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A One-To-One relationship with the particular Space entity which is defined as the Account Profile
     */
    @Index_()
    @ManyToOne_(() => Space, {nullable: true})
    profileSpace!: Space | undefined | null

    /**
     * A One-To-Many relationship between the current Account and a follower Account through AccountFollowers (foreign key - "followingAccount")
     */
    @OneToMany_(() => AccountFollowers, e => e.followingAccount)
    followers!: AccountFollowers[]

    /**
     * The total number of followers that an Account has (followers.length)
     */
    @Column_("int4", {nullable: false})
    followersCount!: number

    /**
     * A One-To-Many relationship between the current Account and an Account being followed through AccountFollowers (foreign key - "followerAccount")
     */
    @OneToMany_(() => AccountFollowers, e => e.followerAccount)
    followingAccounts!: AccountFollowers[]

    /**
     * The total number of all accounts being followed by the current Account (followingAccounts.length)
     */
    @Column_("int4", {nullable: false})
    followingAccountsCount!: number

    /**
     * A One-To-Many relationship with the Posts which are created by an Account (foreign key - "createdByAccount")
     */
    @OneToMany_(() => Post, e => e.createdByAccount)
    posts!: Post[]

    /**
     * A One-To-Many relationship with the Posts which are owned by an Account (foreign key - "ownedByAccount")
     */
    @OneToMany_(() => Post, e => e.ownedByAccount)
    ownedPosts!: Post[]

    /**
     * The total number of Posts owned by an Account (ownedPosts.length)
     */
    @Column_("int4", {nullable: false})
    ownedPostsCount!: number

    /**
     * The total number of Posts that an Account is following (currently, a post is only followed by its creator)
     */
    @Column_("int4", {nullable: false})
    followingPostsCount!: number

    /**
     * A One-To-Many relationship with the Spaces that have been created by an Account (foreign key - "createdByAccount")
     */
    @OneToMany_(() => Space, e => e.createdByAccount)
    spacesCreated!: Space[]

    /**
     * A One-To-Many relationship with the Spaces that are currently owned by an Account  (foreign key - "ownedByAccount")
     */
    @OneToMany_(() => Space, e => e.ownedByAccount)
    spacesOwned!: Space[]

    /**
     * A One-To-Many relationship between an Account and the Spaces that it follows through SpaceFollowers (foreign key - "followerAccount")
     */
    @OneToMany_(() => SpaceFollowers, e => e.followerAccount)
    spacesFollowed!: SpaceFollowers[]

    /**
     * The total number of Spaces that an Account is following
     */
    @Column_("int4", {nullable: false})
    followingSpacesCount!: number

    /**
     * A One-To-Many relationship between an Account and the Activities it has performed in the network through NewsFeed (foreign key - "account").
     * Each Activity has the "event<EventName>" and "post" fields, which can be used for adding created Posts to a user's Feed.
     */
    @OneToMany_(() => NewsFeed, e => e.account)
    feeds!: NewsFeed[]

    /**
     * A Many-To-Many relationship between an Account and Activities done in the network through Notification (foreign key - "account").
     */
    @OneToMany_(() => Notification, e => e.account)
    notifications!: Notification[]

    /**
     * A One-To-Many relationship with the Activities which have been performed by an Account (foreign key - "account")
     */
    @OneToMany_(() => Activity, e => e.account)
    activities!: Activity[]

    /**
     * A One-To-Many relationship with the Reactions that are made by an Account (foreign key - "account")
     */
    @OneToMany_(() => Reaction, e => e.account)
    reactions!: Reaction[]

    /**
     * The DateTime when an Account was updated by the Profiles.ProfileUpdated event
     */
    @Column_("timestamp with time zone", {nullable: true})
    updatedAtTime!: Date | undefined | null

    /**
     * The block height when an Account was updated by the Profiles.ProfileUpdated event
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    updatedAtBlock!: bigint | undefined | null

    /**
     * A list of the usernames that an Account owns.
     */
    @Column_("text", {array: true, nullable: true})
    usernames!: (string | undefined | null)[] | undefined | null

    /**
     * A list of linked Evm Accounts
     */
    @OneToMany_(() => EvmSubstrateAccountLink, e => e.substrateAccount)
    linkedEvmAccounts!: EvmSubstrateAccountLink[]

    /**
     * A list of extensions created by the account.
     */
    @OneToMany_(() => ContentExtension, e => e.createdBy)
    extensions!: ContentExtension[]
}
