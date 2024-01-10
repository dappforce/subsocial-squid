import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const createPost =  {
    name: 'Posts.create_post',
    v13: new CallType(
        'Posts.create_post',
        sts.struct({
            spaceIdOpt: sts.option(() => sts.bigint()),
            extension: v13.PostExtension,
            content: v13.Content,
        })
    ),
}

export const updatePost =  {
    name: 'Posts.update_post',
    v13: new CallType(
        'Posts.update_post',
        sts.struct({
            postId: sts.bigint(),
            update: v13.PostUpdate,
        })
    ),
}

export const movePost =  {
    name: 'Posts.move_post',
    v13: new CallType(
        'Posts.move_post',
        sts.struct({
            postId: sts.bigint(),
            newSpaceId: sts.option(() => sts.bigint()),
        })
    ),
}

export const forceCreatePost =  {
    name: 'Posts.force_create_post',
    v13: new CallType(
        'Posts.force_create_post',
        sts.struct({
            postId: sts.bigint(),
            created: v13.WhoAndWhen,
            owner: v13.AccountId32,
            extension: v13.PostExtension,
            spaceIdOpt: sts.option(() => sts.bigint()),
            content: v13.Content,
            hidden: sts.boolean(),
            upvotesCount: sts.number(),
            downvotesCount: sts.number(),
        })
    ),
}

export const forceRemovePost =  {
    name: 'Posts.force_remove_post',
    v13: new CallType(
        'Posts.force_remove_post',
        sts.struct({
            postId: sts.bigint(),
        })
    ),
}

export const forceSetNextPostId =  {
    name: 'Posts.force_set_next_post_id',
    v13: new CallType(
        'Posts.force_set_next_post_id',
        sts.struct({
            postId: sts.bigint(),
        })
    ),
}
