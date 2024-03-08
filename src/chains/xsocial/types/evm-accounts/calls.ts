import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v102 from '../v102'
import * as v104 from '../v104'
import * as v108 from '../v108'

export const linkEthAddress =  {
    name: 'EvmAccounts.link_eth_address',
    /**
     * Link substrate address to ethereum address.
     */
    v102: new CallType(
        'EvmAccounts.link_eth_address',
        sts.struct({
            ethAddress: v102.H160,
            ethSignature: sts.bytes(),
        })
    ),
}

export const linkEvmAddress =  {
    name: 'EvmAccounts.link_evm_address',
    /**
     * Link substrate address to EVM address.
     */
    v104: new CallType(
        'EvmAccounts.link_evm_address',
        sts.struct({
            evmAddress: v104.H160,
            evmSignature: sts.bytes(),
        })
    ),
}

export const unlinkEvmAddress =  {
    name: 'EvmAccounts.unlink_evm_address',
    /**
     * Unlink substrate address from EVM address.
     */
    v108: new CallType(
        'EvmAccounts.unlink_evm_address',
        sts.struct({
            evmAddress: v108.H160,
        })
    ),
}
