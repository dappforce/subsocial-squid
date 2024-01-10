import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const spaceOwnershipTransferCreated =  {
    name: 'SpaceOwnership.SpaceOwnershipTransferCreated',
    v13: new EventType(
        'SpaceOwnership.SpaceOwnershipTransferCreated',
        sts.struct({
            currentOwner: v13.AccountId32,
            spaceId: sts.bigint(),
            newOwner: v13.AccountId32,
        })
    ),
}

export const spaceOwnershipTransferAccepted =  {
    name: 'SpaceOwnership.SpaceOwnershipTransferAccepted',
    v13: new EventType(
        'SpaceOwnership.SpaceOwnershipTransferAccepted',
        sts.struct({
            account: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
