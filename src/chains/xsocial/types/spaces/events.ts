import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const spaceCreated =  {
    name: 'Spaces.SpaceCreated',
    v100: new EventType(
        'Spaces.SpaceCreated',
        sts.struct({
            account: v100.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}

export const spaceUpdated =  {
    name: 'Spaces.SpaceUpdated',
    v100: new EventType(
        'Spaces.SpaceUpdated',
        sts.struct({
            account: v100.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
