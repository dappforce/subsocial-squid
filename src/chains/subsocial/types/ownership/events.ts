import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v42 from '../v42'

export const ownershipTransferCreated =  {
    name: 'Ownership.OwnershipTransferCreated',
    v42: new EventType(
        'Ownership.OwnershipTransferCreated',
        sts.struct({
            currentOwner: v42.AccountId32,
            entity: v42.OwnableEntity,
            newOwner: v42.AccountId32,
        })
    ),
}

export const ownershipTransferAccepted =  {
    name: 'Ownership.OwnershipTransferAccepted',
    v42: new EventType(
        'Ownership.OwnershipTransferAccepted',
        sts.struct({
            account: v42.AccountId32,
            entity: v42.OwnableEntity,
        })
    ),
}

export const ownershipTransferRejected =  {
    name: 'Ownership.OwnershipTransferRejected',
    v42: new EventType(
        'Ownership.OwnershipTransferRejected',
        sts.struct({
            account: v42.AccountId32,
            entity: v42.OwnableEntity,
        })
    ),
}
