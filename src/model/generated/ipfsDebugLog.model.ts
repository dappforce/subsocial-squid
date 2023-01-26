import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class IpfsDebugLog {
    constructor(props?: Partial<IpfsDebugLog>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    cid!: string | undefined | null

    @Column_("int4", {nullable: false})
    blockHeight!: number

    @Column_("text", {nullable: true})
    errorMsg!: string | undefined | null
}
