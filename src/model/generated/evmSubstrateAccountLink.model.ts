import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {EvmAccount} from "./evmAccount.model"
import {Account} from "./account.model"

/**
 * The junction table for Many-to-Many relationship between Substrate Accounts and Ethereum Accounts
 */
@Entity_()
export class EvmSubstrateAccountLink {
    constructor(props?: Partial<EvmSubstrateAccountLink>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Evm account
     */
    @Index_()
    @ManyToOne_(() => EvmAccount, {nullable: true})
    evmAccount!: EvmAccount

    /**
     * Substrate account
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    substrateAccount!: Account

    /**
     * Is the link of this particular account active? (This is necessary for the soft deletion of the link.)
     */
    @Column_("bool", {nullable: false})
    active!: boolean

    /**
     * The block height when a EvmSubstrateAccountLink was created.
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    createdAtBlock!: bigint | undefined | null

    /**
     * The DateTime when a EvmSubstrateAccountLink was created.
     */
    @Index_()
    @Column_("timestamp with time zone", {nullable: true})
    createdAtTime!: Date | undefined | null
}
