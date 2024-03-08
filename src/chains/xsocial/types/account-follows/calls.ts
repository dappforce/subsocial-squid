import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const followAccount =  {
    name: 'AccountFollows.follow_account',
    v102: new CallType(
        'AccountFollows.follow_account',
        sts.struct({
            account: v102.AccountId32,
        })
    ),
}

export const unfollowAccount =  {
    name: 'AccountFollows.unfollow_account',
    v102: new CallType(
        'AccountFollows.unfollow_account',
        sts.struct({
            account: v102.AccountId32,
        })
    ),
}

export const forceFollowAccount =  {
    name: 'AccountFollows.force_follow_account',
    v102: new CallType(
        'AccountFollows.force_follow_account',
        sts.struct({
            follower: v102.AccountId32,
            following: v102.AccountId32,
        })
    ),
}
