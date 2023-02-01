import assert from "assert"
import * as marshal from "./marshal"

export class ReferencedTweetDetails {
    private _id!: string | undefined | null
    private _type!: string | undefined | null

    constructor(props?: Partial<Omit<ReferencedTweetDetails, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._id = json.id == null ? undefined : marshal.string.fromJSON(json.id)
            this._type = json.type == null ? undefined : marshal.string.fromJSON(json.type)
        }
    }

    get id(): string | undefined | null {
        return this._id
    }

    set id(value: string | undefined | null) {
        this._id = value
    }

    get type(): string | undefined | null {
        return this._type
    }

    set type(value: string | undefined | null) {
        this._type = value
    }

    toJSON(): object {
        return {
            id: this.id,
            type: this.type,
        }
    }
}
