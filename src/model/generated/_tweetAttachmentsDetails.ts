import assert from "assert"
import * as marshal from "./marshal"

export class TweetAttachmentsDetails {
    private _mediaKeys!: (string | undefined | null)[] | undefined | null
    private _pollIds!: (string | undefined | null)[] | undefined | null

    constructor(props?: Partial<Omit<TweetAttachmentsDetails, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._mediaKeys = json.mediaKeys == null ? undefined : marshal.fromList(json.mediaKeys, val => val == null ? undefined : marshal.string.fromJSON(val))
            this._pollIds = json.pollIds == null ? undefined : marshal.fromList(json.pollIds, val => val == null ? undefined : marshal.string.fromJSON(val))
        }
    }

    get mediaKeys(): (string | undefined | null)[] | undefined | null {
        return this._mediaKeys
    }

    set mediaKeys(value: (string | undefined | null)[] | undefined | null) {
        this._mediaKeys = value
    }

    get pollIds(): (string | undefined | null)[] | undefined | null {
        return this._pollIds
    }

    set pollIds(value: (string | undefined | null)[] | undefined | null) {
        this._pollIds = value
    }

    toJSON(): object {
        return {
            mediaKeys: this.mediaKeys,
            pollIds: this.pollIds,
        }
    }
}
