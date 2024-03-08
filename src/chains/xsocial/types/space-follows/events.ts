import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const spaceFollowed =  {
    name: 'SpaceFollows.SpaceFollowed',
    v100: new EventType(
        'SpaceFollows.SpaceFollowed',
        sts.struct({
            follower: v100.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}

export const spaceUnfollowed =  {
    name: 'SpaceFollows.SpaceUnfollowed',
    v100: new EventType(
        'SpaceFollows.SpaceUnfollowed',
        sts.struct({
            follower: v100.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
