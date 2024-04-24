import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v42 from '../v42'

export const transferOwnership =  {
    name: 'Ownership.transfer_ownership',
    v42: new CallType(
        'Ownership.transfer_ownership',
        sts.struct({
            entity: v42.OwnableEntity,
            newOwner: v42.AccountId32,
        })
    ),
}

export const acceptPendingOwnership =  {
    name: 'Ownership.accept_pending_ownership',
    v42: new CallType(
        'Ownership.accept_pending_ownership',
        sts.struct({
            entity: v42.OwnableEntity,
        })
    ),
}

export const rejectPendingOwnership =  {
    name: 'Ownership.reject_pending_ownership',
    v42: new CallType(
        'Ownership.reject_pending_ownership',
        sts.struct({
            entity: v42.OwnableEntity,
        })
    ),
}
