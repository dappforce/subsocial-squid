import assert from "assert"
import * as marshal from "./marshal"
import {ReferencedTweetDetails} from "./_referencedTweetDetails"
import {TweetAttachmentsDetails} from "./_tweetAttachmentsDetails"

export class TweetDetails {
    private _id!: string | undefined | null
    private _createdAt!: string | undefined | null
    private _username!: string | undefined | null
    private _authorId!: string | undefined | null
    private _editHistoryTweetIds!: (string | undefined | null)[] | undefined | null
    private _conversationId!: string | undefined | null
    private _inReplyToUserId!: string | undefined | null
    private _referencedTweets!: (ReferencedTweetDetails | undefined | null)[] | undefined | null
    private _attachments!: TweetAttachmentsDetails | undefined | null
    private _lang!: string | undefined | null

    constructor(props?: Partial<Omit<TweetDetails, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._id = json.id == null ? undefined : marshal.string.fromJSON(json.id)
            this._createdAt = json.createdAt == null ? undefined : marshal.string.fromJSON(json.createdAt)
            this._username = json.username == null ? undefined : marshal.string.fromJSON(json.username)
            this._authorId = json.authorId == null ? undefined : marshal.string.fromJSON(json.authorId)
            this._editHistoryTweetIds = json.editHistoryTweetIds == null ? undefined : marshal.fromList(json.editHistoryTweetIds, val => val == null ? undefined : marshal.string.fromJSON(val))
            this._conversationId = json.conversationId == null ? undefined : marshal.string.fromJSON(json.conversationId)
            this._inReplyToUserId = json.inReplyToUserId == null ? undefined : marshal.string.fromJSON(json.inReplyToUserId)
            this._referencedTweets = json.referencedTweets == null ? undefined : marshal.fromList(json.referencedTweets, val => val == null ? undefined : new ReferencedTweetDetails(undefined, val))
            this._attachments = json.attachments == null ? undefined : new TweetAttachmentsDetails(undefined, json.attachments)
            this._lang = json.lang == null ? undefined : marshal.string.fromJSON(json.lang)
        }
    }

    get id(): string | undefined | null {
        return this._id
    }

    set id(value: string | undefined | null) {
        this._id = value
    }

    get createdAt(): string | undefined | null {
        return this._createdAt
    }

    set createdAt(value: string | undefined | null) {
        this._createdAt = value
    }

    get username(): string | undefined | null {
        return this._username
    }

    set username(value: string | undefined | null) {
        this._username = value
    }

    get authorId(): string | undefined | null {
        return this._authorId
    }

    set authorId(value: string | undefined | null) {
        this._authorId = value
    }

    get editHistoryTweetIds(): (string | undefined | null)[] | undefined | null {
        return this._editHistoryTweetIds
    }

    set editHistoryTweetIds(value: (string | undefined | null)[] | undefined | null) {
        this._editHistoryTweetIds = value
    }

    get conversationId(): string | undefined | null {
        return this._conversationId
    }

    set conversationId(value: string | undefined | null) {
        this._conversationId = value
    }

    get inReplyToUserId(): string | undefined | null {
        return this._inReplyToUserId
    }

    set inReplyToUserId(value: string | undefined | null) {
        this._inReplyToUserId = value
    }

    get referencedTweets(): (ReferencedTweetDetails | undefined | null)[] | undefined | null {
        return this._referencedTweets
    }

    set referencedTweets(value: (ReferencedTweetDetails | undefined | null)[] | undefined | null) {
        this._referencedTweets = value
    }

    get attachments(): TweetAttachmentsDetails | undefined | null {
        return this._attachments
    }

    set attachments(value: TweetAttachmentsDetails | undefined | null) {
        this._attachments = value
    }

    get lang(): string | undefined | null {
        return this._lang
    }

    set lang(value: string | undefined | null) {
        this._lang = value
    }

    toJSON(): object {
        return {
            id: this.id,
            createdAt: this.createdAt,
            username: this.username,
            authorId: this.authorId,
            editHistoryTweetIds: this.editHistoryTweetIds,
            conversationId: this.conversationId,
            inReplyToUserId: this.inReplyToUserId,
            referencedTweets: this.referencedTweets == null ? undefined : this.referencedTweets.map((val: any) => val == null ? undefined : val.toJSON()),
            attachments: this.attachments == null ? undefined : this.attachments.toJSON(),
            lang: this.lang,
        }
    }
}
