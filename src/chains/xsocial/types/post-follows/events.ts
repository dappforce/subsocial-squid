import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v107 from '../v107'

export const postFollowed =  {
    name: 'PostFollows.PostFollowed',
    v107: new EventType(
        'PostFollows.PostFollowed',
        sts.struct({
            follower: v107.AccountId32,
            postId: sts.bigint(),
        })
    ),
}

export const postUnfollowed =  {
    name: 'PostFollows.PostUnfollowed',
    v107: new EventType(
        'PostFollows.PostUnfollowed',
        sts.struct({
            follower: v107.AccountId32,
            postId: sts.bigint(),
        })
    ),
}
