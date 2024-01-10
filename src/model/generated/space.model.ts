import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Post} from "./post.model"
import {SpacePermissions} from "./_spacePermissions"
import {SpaceFollowers} from "./spaceFollowers.model"
import {ExtensionPinnedResource} from "./extensionPinnedResource.model"

/**
 * The Space entity
 */
@Entity_()
export class Space {
    constructor(props?: Partial<Space>) {
        Object.assign(this, props)
    }

    /**
     * The ID of a Space, which will have the same value and Space ID on the blockchain.
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A One-To-One relationship with the Account entity that created a Space.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    createdByAccount!: Account

    /**
     * A One-To-One relationship with the Account entity that owns a Space.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    ownedByAccount!: Account

    /**
     * A One-To-One relationship with the Account which uses the current Space as its profile.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    profileSpace!: Account | undefined | null

    /**
     * A source of profile data.
     */
    @Column_("text", {nullable: true})
    profileSource!: string | undefined | null

    /**
     * The block height when a Space was created.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    createdAtBlock!: bigint | undefined | null

    /**
     * The DateTime when a Space was created.
     */
    @Index_()
    @Column_("timestamp with time zone", {nullable: true})
    createdAtTime!: Date | undefined | null

    /**
     * The day when a Space was created.
     */
    @Column_("timestamp with time zone", {nullable: true})
    createdOnDay!: Date | undefined | null

    /**
     * The DateTime when a Space was updated.
     */
    @Column_("timestamp with time zone", {nullable: true})
    updatedAtTime!: Date | undefined | null

    /**
     * The block height when a Space was updated.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    updatedAtBlock!: bigint | undefined | null

    /**
     * A One-To-Many relationship with the Posts created within the current Space (foreign key - "space")
     */
    @OneToMany_(() => Post, e => e.space)
    posts!: Post[]

    /**
     * The total number of all Posts (public and hidden) in the current Space (post.length)
     */
    @Column_("int4", {nullable: false})
    postsCount!: number

    /**
     * The total number of public (non-hidden) Posts in the current Space (post.length)
     */
    @Index_()
    @Column_("int4", {nullable: false})
    publicPostsCount!: number

    /**
     * The total number of hidden Posts in the current Space (post.length)
     */
    @Column_("int4", {nullable: false})
    hiddenPostsCount!: number

    /**
     * Is the Space hidden?
     */
    @Index_()
    @Column_("bool", {nullable: false})
    hidden!: boolean

    /**
     * The CID of the content on IPFS
     */
    @Column_("text", {nullable: true})
    content!: string | undefined | null

    /**
     * The name of a Space (IPFS content)
     */
    @Column_("text", {nullable: true})
    name!: string | undefined | null

    /**
     * The URL of the Space's image (IPFS content)
     */
    @Column_("text", {nullable: true})
    image!: string | undefined | null

    /**
     * The about text (bio) of a Space (IPFS content)
     */
    @Column_("text", {nullable: true})
    about!: string | undefined | null

    /**
     * The summary of the content of a Space (IPFS content)
     */
    @Column_("text", {nullable: true})
    summary!: string | undefined | null

    /**
     * Is the Space's "About" section longer than its summary?
     */
    @Column_("bool", {nullable: true})
    isShowMore!: boolean | undefined | null

    /**
     * The email address of a Space (IPFS content)
     */
    @Column_("text", {nullable: true})
    email!: string | undefined | null

    /**
     * A list of a Space's tags, converted to a string with "comma" as a separator (IPFS content)
     */
    @Column_("text", {nullable: true})
    tagsOriginal!: string | undefined | null

    /**
     * A list of the Space's links converted to a string with "comma" as a separator (IPFS content)
     */
    @Column_("text", {nullable: true})
    linksOriginal!: string | undefined | null

    /**
     * A list of a Space's interests converted to a string with "comma" as a separator (IPFS content)
     */
    @Column_("text", {nullable: true})
    interestsOriginal!: string | undefined | null

    /**
     * Space format (IPFS content)
     */
    @Column_("text", {nullable: true})
    format!: string | undefined | null

    /**
     * The username of a Space (will be removed in further versions as it is deprecated. You should use the username field instead.) (IPFS content)
     */
    @Index_()
    @Column_("text", {nullable: true})
    handle!: string | undefined | null

    /**
     * The properties of a Space from its IPFS content which are not supported by the current squid's DB schema.
     */
    @Column_("jsonb", {nullable: true})
    experimental!: unknown | undefined | null

    /**
     * Are followers allowed to post in the Space?
     */
    @Column_("bool", {nullable: true})
    canFollowerCreatePosts!: boolean | undefined | null

    /**
     * Is this a public space where anyone can post?
     */
    @Column_("bool", {nullable: true})
    canEveryoneCreatePosts!: boolean | undefined | null

    /**
     * Space permissions rule
     */
    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new SpacePermissions(undefined, obj)}, nullable: true})
    nonePermissions!: SpacePermissions | undefined | null

    /**
     * Space permissions rule
     */
    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new SpacePermissions(undefined, obj)}, nullable: true})
    everyonePermissions!: SpacePermissions | undefined | null

    /**
     * Space permissions rule
     */
    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new SpacePermissions(undefined, obj)}, nullable: true})
    followerPermissions!: SpacePermissions | undefined | null

    /**
     * Space permissions rule
     */
    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new SpacePermissions(undefined, obj)}, nullable: true})
    spaceOwnerPermissions!: SpacePermissions | undefined | null

    /**
     * A Many-To-Many relationship between a Space and the Accounts that follow it through SpaceFollowers (foreign key - "followingSpace")
     */
    @OneToMany_(() => SpaceFollowers, e => e.followingSpace)
    followers!: SpaceFollowers[]

    /**
     * The total number of Accounts following a Space
     */
    @Index_()
    @Column_("int4", {nullable: false})
    followersCount!: number

    /**
     * The username of a Space (IPFS content)
     */
    @Index_()
    @Column_("text", {nullable: true})
    username!: string | undefined | null

    @OneToMany_(() => ExtensionPinnedResource, e => e.space)
    pinnedByExtensions!: ExtensionPinnedResource[]
}
