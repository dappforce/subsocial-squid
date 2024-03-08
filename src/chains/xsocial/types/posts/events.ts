import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const postCreated =  {
    name: 'Posts.PostCreated',
    v100: new EventType(
        'Posts.PostCreated',
        sts.struct({
            account: v100.AccountId32,
            postId: sts.bigint(),
        })
    ),
}

export const postUpdated =  {
    name: 'Posts.PostUpdated',
    v100: new EventType(
        'Posts.PostUpdated',
        sts.struct({
            account: v100.AccountId32,
            postId: sts.bigint(),
        })
    ),
}

export const postMoved =  {
    name: 'Posts.PostMoved',
    v100: new EventType(
        'Posts.PostMoved',
        sts.struct({
            account: v100.AccountId32,
            postId: sts.bigint(),
            fromSpace: sts.option(() => sts.bigint()),
            toSpace: sts.option(() => sts.bigint()),
        })
    ),
}
