import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const followSpace =  {
    name: 'SpaceFollows.follow_space',
    v13: new CallType(
        'SpaceFollows.follow_space',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const unfollowSpace =  {
    name: 'SpaceFollows.unfollow_space',
    v13: new CallType(
        'SpaceFollows.unfollow_space',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const forceFollowSpace =  {
    name: 'SpaceFollows.force_follow_space',
    v13: new CallType(
        'SpaceFollows.force_follow_space',
        sts.struct({
            follower: v13.AccountId32,
            spaceId: sts.bigint(),
        })
    ),
}
