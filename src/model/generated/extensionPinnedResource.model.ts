import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {ContentExtension} from "./contentExtension.model"
import {PinnedResourceType} from "./_pinnedResourceType"
import {Post} from "./post.model"
import {Space} from "./space.model"

@Entity_()
export class ExtensionPinnedResource {
    constructor(props?: Partial<ExtensionPinnedResource>) {
        Object.assign(this, props)
    }

    /**
     * The ExtensionPinnedResource ID.
     * Consists of the Content Extension ID plus the pinned resource type (Post or Space) plus pinned resource ID.
     * (e.g. "4940-0")
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => ContentExtension, {nullable: true})
    contentExtension!: ContentExtension

    @Column_("varchar", {length: 5, nullable: false})
    resourceType!: PinnedResourceType

    @Index_()
    @ManyToOne_(() => Post, {nullable: true})
    post!: Post | undefined | null

    @Index_()
    @ManyToOne_(() => Space, {nullable: true})
    space!: Space | undefined | null
}
