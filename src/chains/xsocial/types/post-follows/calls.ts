import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'

export const followPost =  {
    name: 'PostFollows.follow_post',
    v107: new CallType(
        'PostFollows.follow_post',
        sts.struct({
            postId: sts.bigint(),
        })
    ),
}

export const unfollowPost =  {
    name: 'PostFollows.unfollow_post',
    v107: new CallType(
        'PostFollows.unfollow_post',
        sts.struct({
            postId: sts.bigint(),
        })
    ),
}
