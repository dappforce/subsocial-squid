import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const accountFollowed =  {
    name: 'AccountFollows.AccountFollowed',
    v13: new EventType(
        'AccountFollows.AccountFollowed',
        sts.struct({
            follower: v13.AccountId32,
            account: v13.AccountId32,
        })
    ),
}

export const accountUnfollowed =  {
    name: 'AccountFollows.AccountUnfollowed',
    v13: new EventType(
        'AccountFollows.AccountUnfollowed',
        sts.struct({
            follower: v13.AccountId32,
            account: v13.AccountId32,
        })
    ),
}
