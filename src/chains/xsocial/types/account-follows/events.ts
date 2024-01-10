import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const accountFollowed =  {
    name: 'AccountFollows.AccountFollowed',
    v102: new EventType(
        'AccountFollows.AccountFollowed',
        sts.struct({
            follower: v102.AccountId32,
            account: v102.AccountId32,
        })
    ),
}

export const accountUnfollowed =  {
    name: 'AccountFollows.AccountUnfollowed',
    v102: new EventType(
        'AccountFollows.AccountUnfollowed',
        sts.struct({
            follower: v102.AccountId32,
            account: v102.AccountId32,
        })
    ),
}
