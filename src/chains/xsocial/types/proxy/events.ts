import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const proxyAdded =  {
    name: 'Proxy.ProxyAdded',
    /**
     * A proxy was added.
     */
    v102: new EventType(
        'Proxy.ProxyAdded',
        sts.struct({
            delegator: v102.AccountId32,
            delegatee: v102.AccountId32,
            proxyType: v102.ProxyType,
            delay: sts.number(),
        })
    ),
}

export const proxyRemoved =  {
    name: 'Proxy.ProxyRemoved',
    /**
     * A proxy was removed.
     */
    v102: new EventType(
        'Proxy.ProxyRemoved',
        sts.struct({
            delegator: v102.AccountId32,
            delegatee: v102.AccountId32,
            proxyType: v102.ProxyType,
            delay: sts.number(),
        })
    ),
}
