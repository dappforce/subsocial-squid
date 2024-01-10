import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const spaceOwnershipTransferCreated =  {
    name: 'SpaceOwnership.SpaceOwnershipTransferCreated',
    v102: new EventType(
        'SpaceOwnership.SpaceOwnershipTransferCreated',
        sts.struct({
            currentOwner: v102.AccountId32,
            spaceId: sts.bigint(),
            newOwner: v102.AccountId32,
        })
    ),
}

export const spaceOwnershipTransferAccepted =  {
    name: 'SpaceOwnership.SpaceOwnershipTransferAccepted',
    v102: new EventType(
        'SpaceOwnership.SpaceOwnershipTransferAccepted',
        sts.struct({
            account: v102.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
