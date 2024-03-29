import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {EvmSubstrateAccountLink} from "./evmSubstrateAccountLink.model"

/**
 * The Evm Account entity
 */
@Entity_()
export class EvmAccount {
    constructor(props?: Partial<EvmAccount>) {
        Object.assign(this, props)
    }

    /**
     * The account's Evm address
     */
    @PrimaryColumn_()
    id!: string

    /**
     * A list of linked Substrate Accounts
     */
    @OneToMany_(() => EvmSubstrateAccountLink, e => e.evmAccount)
    linkedSubstrateAccounts!: EvmSubstrateAccountLink[]
}
