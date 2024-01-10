import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const spaceCreated =  {
    name: 'Spaces.SpaceCreated',
    v13: new EventType(
        'Spaces.SpaceCreated',
        sts.struct({
            account: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}

export const spaceUpdated =  {
    name: 'Spaces.SpaceUpdated',
    v13: new EventType(
        'Spaces.SpaceUpdated',
        sts.struct({
            account: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
