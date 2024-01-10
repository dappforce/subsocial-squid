import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const transferSpaceOwnership =  {
    name: 'SpaceOwnership.transfer_space_ownership',
    v13: new CallType(
        'SpaceOwnership.transfer_space_ownership',
        sts.struct({
            spaceId: sts.bigint(),
            transferTo: v13.AccountId32,
        })
    ),
}

export const acceptPendingOwnership =  {
    name: 'SpaceOwnership.accept_pending_ownership',
    v13: new CallType(
        'SpaceOwnership.accept_pending_ownership',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const rejectPendingOwnership =  {
    name: 'SpaceOwnership.reject_pending_ownership',
    v13: new CallType(
        'SpaceOwnership.reject_pending_ownership',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}
