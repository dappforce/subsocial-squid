import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const spaceFollowed =  {
    name: 'SpaceFollows.SpaceFollowed',
    v13: new EventType(
        'SpaceFollows.SpaceFollowed',
        sts.struct({
            follower: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}

export const spaceUnfollowed =  {
    name: 'SpaceFollows.SpaceUnfollowed',
    v13: new EventType(
        'SpaceFollows.SpaceUnfollowed',
        sts.struct({
            follower: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
