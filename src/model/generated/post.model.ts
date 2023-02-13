import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Space} from "./space.model"
import {PostKind} from "./_postKind"
import {PostFollowers} from "./postFollowers.model"
import {CommentFollowers} from "./commentFollowers.model"
import {Reaction} from "./reaction.model"
import {TweetDetails} from "./_tweetDetails"

/**
 * The Post entity
 */
@Entity_()
export class Post {
    constructor(props?: Partial<Post>) {
        Object.assign(this, props)
    }

    /**
     * The Post ID, the same as it is on the blockchain.
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A One-to-One relationship with a Post. This field only has a value if the current Post is a Comment or a Reply to a Comment, and contains a relationship with a top level Regular Post.
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    rootPost!: Post | undefined | null

    /**
     * A One-to-One relationship with a Post. This field only has a value if the current Post is a Reply to a Comment and contains a relationship with a Comment Post or another Reply (in case there is discussion within context of some Comment).
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    parentPost!: Post | undefined | null

    /**
     * A One-to-One relationship with a Post which has been shared. The Current Post is a new Post which has been created as a result of the sharing action, and can contain an additional body as a comment on the shared Post. "sharedPost" is relationhip with the Post that was shared.
     */
    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    sharedPost!: Post | undefined | null

    /**
     * Is the current Post a Comment to a Regular Post or a Comment Post?
     */
    @Index_()
    @Column_("bool", {nullable: false})
    isComment!: boolean

    /**
     * Is the current post hidden?
     */
    @Index_()
    @Column_("bool", {nullable: false})
    hidden!: boolean

    /**
     * A One-To-One relationship with the Account entity of a Post's owner. Currently we do not have Post transfer functionality.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    ownedByAccount!: Account

    /**
     * A One-To-One relationship with the Account entity of a Post's creator.
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    createdByAccount!: Account

    /**
     * The block height when a Post was created.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    createdAtBlock!: bigint | undefined | null

    /**
     * The DateTime when a Post was created.
     */
    @Index_()
    @Column_("timestamp with time zone", {nullable: true})
    createdAtTime!: Date | undefined | null

    /**
     * The day when a Post was created.
     */
    @Column_("timestamp with time zone", {nullable: true})
    createdOnDay!: Date | undefined | null

    /**
     * The time when a Post was created.
     */
    @Column_("timestamp with time zone", {nullable: true})
    updatedAtTime!: Date | undefined | null

    /**
     * A One-To-One relationship with a Space that the current Post has been created in. It can be null if the Post is deleted (moved to Space with ID === null)
     */
    @Index_()
    @ManyToOne_(() => Space, {nullable: true})
    space!: Space | undefined | null

    /**
     * The type of Post (Comment, SharedPost, or RegularPost)
     */
    @Index_()
    @Column_("varchar", {length: 11, nullable: true})
    kind!: PostKind | undefined | null

    /**
     * A One-To-Many relationship between a Regular Post and the Accounts that follow the post through PostFollowers (foreign key - "followingPost")
     * (currently, a post is only followed by its creator)
     */
    @OneToMany_(() => PostFollowers, e => e.followingPost)
    postFollowers!: PostFollowers[]

    /**
     * A One-To-Many relationship between a Comment Post or Comment Reply and the Accounts that follow the Comment through CommentFollowers (foreign key - "followingComment")
     * (currently, a post is only followed by its creator)
     */
    @OneToMany_(() => CommentFollowers, e => e.followingComment)
    commentFollowers!: CommentFollowers[]

    /**
     * The total number of followers that a Post has.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    followersCount!: number

    /**
     * The total number of replies to the current Post.
     */
    @Column_("int4", {nullable: false})
    repliesCount!: number

    /**
     * The total number of public (non-hidden) replies to the current Post.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    publicRepliesCount!: number

    /**
     * The total number of hidden replies to the current Post.
     */
    @Column_("int4", {nullable: false})
    hiddenRepliesCount!: number

    /**
     * How many times the current Post has been shared.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    sharesCount!: number

    /**
     * The total number of UpVote reactions to the current Post.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    upvotesCount!: number

    /**
     * The total number of DownVote reactions to the current Post.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    downvotesCount!: number

    /**
     * The total number of all reactions to the current Post.
     */
    @Index_()
    @Column_("int4", {nullable: false})
    reactionsCount!: number

    /**
     * A One-To-Many relationship with Reactions for the current Post (foreign key - "post")
     */
    @OneToMany_(() => Reaction, e => e.post)
    reactions!: Reaction[]

    /**
     * The title of the Post (IPFS content)
     */
    @Column_("text", {nullable: true})
    title!: string | undefined | null

    /**
     * The URL for the Post's cover image (IPFS content)
     */
    @Column_("text", {nullable: true})
    image!: string | undefined | null

    /**
     * The link of the Post (IPFS content)
     */
    @Column_("text", {nullable: true})
    link!: string | undefined | null

    /**
     * Post canonical URL (IPFS content)
     */
    @Column_("text", {nullable: true})
    canonical!: string | undefined | null

    /**
     * The CID of the content on IPFS.
     */
    @Column_("text", {nullable: true})
    content!: string | undefined | null

    /**
     * Post slug URL (IPFS content)
     */
    @Column_("text", {nullable: true})
    slug!: string | undefined | null

    /**
     * The body text of the Post (IPFS content)
     */
    @Column_("text", {nullable: true})
    body!: string | undefined | null

    /**
     * The summary of the Post body
     */
    @Column_("text", {nullable: true})
    summary!: string | undefined | null

    /**
     * Is the Post body longer than the summary?
     */
    @Column_("bool", {nullable: true})
    isShowMore!: boolean | undefined | null

    /**
     * ! Deprecated field and will be removed !
     */
    @Column_("text", {nullable: true})
    meta!: string | undefined | null

    /**
     * A list of a Post's tags, converted to a string with "comma" as a separator (IPFS content)
     */
    @Column_("text", {nullable: true})
    tagsOriginal!: string | undefined | null

    /**
     * The Post format (IPFS content)
     */
    @Column_("text", {nullable: true})
    format!: string | undefined | null

    /**
     * The ID of the tweet attached to the current Post (IPFS content)
     */
    @Column_("text", {nullable: true})
    tweetId!: string | undefined | null

    /**
     * The details of the tweet, such as creation time, username of the poster, etc. (IPFS content)
     */
    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new TweetDetails(undefined, obj)}, nullable: true})
    tweetDetails!: TweetDetails | undefined | null

    /**
     * ! Deprecated field and will be removed !
     */
    @Column_("int4", {nullable: true})
    proposalIndex!: number | undefined | null

    /**
     * The properties of a Post from its IPFS content which are not supported by the current squid's DB schema.
     */
    @Column_("jsonb", {nullable: true})
    experimental!: unknown | undefined | null
}
