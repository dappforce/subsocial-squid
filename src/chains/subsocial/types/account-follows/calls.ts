import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const followAccount =  {
    name: 'AccountFollows.follow_account',
    v13: new CallType(
        'AccountFollows.follow_account',
        sts.struct({
            account: v13.AccountId32,
        })
    ),
}

export const unfollowAccount =  {
    name: 'AccountFollows.unfollow_account',
    v13: new CallType(
        'AccountFollows.unfollow_account',
        sts.struct({
            account: v13.AccountId32,
        })
    ),
}

export const forceFollowAccount =  {
    name: 'AccountFollows.force_follow_account',
    v13: new CallType(
        'AccountFollows.force_follow_account',
        sts.struct({
            follower: v13.AccountId32,
            following: v13.AccountId32,
        })
    ),
}
