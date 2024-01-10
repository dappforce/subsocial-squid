import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v16 from '../v16'
import * as v18 from '../v18'
import * as v19 from '../v19'

export const proxyAdded =  {
    name: 'Proxy.ProxyAdded',
    /**
     * A proxy was added.
     */
    v16: new EventType(
        'Proxy.ProxyAdded',
        sts.struct({
            delegator: v16.AccountId32,
            delegatee: v16.AccountId32,
            proxyType: v16.ProxyType,
            delay: sts.number(),
        })
    ),
    /**
     * A proxy was added.
     */
    v18: new EventType(
        'Proxy.ProxyAdded',
        sts.struct({
            delegator: v18.AccountId32,
            delegatee: v18.AccountId32,
            proxyType: v18.ProxyType,
            delay: sts.number(),
        })
    ),
    /**
     * A proxy was added.
     */
    v19: new EventType(
        'Proxy.ProxyAdded',
        sts.struct({
            delegator: v19.AccountId32,
            delegatee: v19.AccountId32,
            proxyType: v19.ProxyType,
            delay: sts.number(),
        })
    ),
}

export const proxyRemoved =  {
    name: 'Proxy.ProxyRemoved',
    /**
     * A proxy was removed.
     */
    v16: new EventType(
        'Proxy.ProxyRemoved',
        sts.struct({
            delegator: v16.AccountId32,
            delegatee: v16.AccountId32,
            proxyType: v16.ProxyType,
            delay: sts.number(),
        })
    ),
    /**
     * A proxy was removed.
     */
    v18: new EventType(
        'Proxy.ProxyRemoved',
        sts.struct({
            delegator: v18.AccountId32,
            delegatee: v18.AccountId32,
            proxyType: v18.ProxyType,
            delay: sts.number(),
        })
    ),
    /**
     * A proxy was removed.
     */
    v19: new EventType(
        'Proxy.ProxyRemoved',
        sts.struct({
            delegator: v19.AccountId32,
            delegatee: v19.AccountId32,
            proxyType: v19.ProxyType,
            delay: sts.number(),
        })
    ),
}
