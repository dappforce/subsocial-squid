import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const transferSpaceOwnership =  {
    name: 'SpaceOwnership.transfer_space_ownership',
    v102: new CallType(
        'SpaceOwnership.transfer_space_ownership',
        sts.struct({
            spaceId: sts.bigint(),
            transferTo: v102.AccountId32,
        })
    ),
}

export const acceptPendingOwnership =  {
    name: 'SpaceOwnership.accept_pending_ownership',
    v102: new CallType(
        'SpaceOwnership.accept_pending_ownership',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const rejectPendingOwnership =  {
    name: 'SpaceOwnership.reject_pending_ownership',
    v102: new CallType(
        'SpaceOwnership.reject_pending_ownership',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}
