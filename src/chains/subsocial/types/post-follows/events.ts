import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v37 from '../v37'

export const postFollowed =  {
    name: 'PostFollows.PostFollowed',
    v37: new EventType(
        'PostFollows.PostFollowed',
        sts.struct({
            follower: v37.AccountId32,
            postId: sts.bigint(),
        })
    ),
}

export const postUnfollowed =  {
    name: 'PostFollows.PostUnfollowed',
    v37: new EventType(
        'PostFollows.PostUnfollowed',
        sts.struct({
            follower: v37.AccountId32,
            postId: sts.bigint(),
        })
    ),
}
