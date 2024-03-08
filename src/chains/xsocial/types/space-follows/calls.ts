import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const followSpace =  {
    name: 'SpaceFollows.follow_space',
    v100: new CallType(
        'SpaceFollows.follow_space',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const unfollowSpace =  {
    name: 'SpaceFollows.unfollow_space',
    v100: new CallType(
        'SpaceFollows.unfollow_space',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const forceFollowSpace =  {
    name: 'SpaceFollows.force_follow_space',
    v100: new CallType(
        'SpaceFollows.force_follow_space',
        sts.struct({
            follower: v100.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
