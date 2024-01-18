import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v36 from '../v36'

export const linkEvmAddress =  {
    name: 'EvmAddresses.link_evm_address',
    /**
     * Link Substrate address to EVM address.
     */
    v36: new CallType(
        'EvmAddresses.link_evm_address',
        sts.struct({
            evmAddress: v36.H160,
            evmSignature: sts.bytes(),
        })
    ),
}

export const unlinkEvmAddress =  {
    name: 'EvmAddresses.unlink_evm_address',
    /**
     * Unlink Substrate address from EVM address.
     */
    v36: new CallType(
        'EvmAddresses.unlink_evm_address',
        sts.struct({
            evmAddress: v36.H160,
        })
    ),
}
