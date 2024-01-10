import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v104 from '../v104'
import * as v108 from '../v108'

export const evmAddressLinkedToAccount =  {
    name: 'EvmAccounts.EvmAddressLinkedToAccount',
    /**
     * Account have been linked to evm address
     */
    v104: new EventType(
        'EvmAccounts.EvmAddressLinkedToAccount',
        sts.struct({
            ethereum: v104.H160,
            substrate: v104.AccountId32,
        })
    ),
}

export const evmAddressUnlinkedFromAccount =  {
    name: 'EvmAccounts.EvmAddressUnlinkedFromAccount',
    /**
     * Account have been unlinked from evm address
     */
    v108: new EventType(
        'EvmAccounts.EvmAddressUnlinkedFromAccount',
        sts.struct({
            ethereum: v108.H160,
            substrate: v108.AccountId32,
        })
    ),
}
