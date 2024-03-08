import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v7 from '../v7'
import * as v27 from '../v27'

export const domainRegistered =  {
    name: 'Domains.DomainRegistered',
    /**
     * The domain name was successfully registered.
     */
    v7: new EventType(
        'Domains.DomainRegistered',
        sts.struct({
            who: v7.AccountId32,
            domain: v7.BoundedVec,
        })
    ),
    /**
     * The domain name was successfully registered.
     */
    v27: new EventType(
        'Domains.DomainRegistered',
        sts.struct({
            who: v27.AccountId32,
            recipient: v27.AccountId32,
            domain: v27.BoundedVec,
        })
    ),
}

export const domainMetaUpdated =  {
    name: 'Domains.DomainMetaUpdated',
    /**
     * The domain meta was successfully updated.
     */
    v7: new EventType(
        'Domains.DomainMetaUpdated',
        sts.struct({
            who: v7.AccountId32,
            domain: v7.BoundedVec,
        })
    ),
}
