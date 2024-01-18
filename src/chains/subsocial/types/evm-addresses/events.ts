import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v36 from '../v36'

export const evmAddressLinkedToAccount =  {
    name: 'EvmAddresses.EvmAddressLinkedToAccount',
    /**
     * Account has been linked to EVM address
     */
    v36: new EventType(
        'EvmAddresses.EvmAddressLinkedToAccount',
        sts.struct({
            ethereum: v36.H160,
            substrate: v36.AccountId32,
        })
    ),
}

export const evmAddressUnlinkedFromAccount =  {
    name: 'EvmAddresses.EvmAddressUnlinkedFromAccount',
    /**
     * Account has been unlinked from EVM address
     */
    v36: new EventType(
        'EvmAddresses.EvmAddressUnlinkedFromAccount',
        sts.struct({
            ethereum: v36.H160,
            substrate: v36.AccountId32,
        })
    ),
}
