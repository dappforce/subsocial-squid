import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const createPostReaction =  {
    name: 'Reactions.create_post_reaction',
    v13: new CallType(
        'Reactions.create_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            kind: v13.ReactionKind,
        })
    ),
}

export const updatePostReaction =  {
    name: 'Reactions.update_post_reaction',
    v13: new CallType(
        'Reactions.update_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            newKind: v13.ReactionKind,
        })
    ),
}

export const deletePostReaction =  {
    name: 'Reactions.delete_post_reaction',
    v13: new CallType(
        'Reactions.delete_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
        })
    ),
}

export const forceCreatePostReaction =  {
    name: 'Reactions.force_create_post_reaction',
    v13: new CallType(
        'Reactions.force_create_post_reaction',
        sts.struct({
            who: v13.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            created: v13.WhoAndWhen,
            reactionKind: v13.ReactionKind,
        })
    ),
}

export const forceDeletePostReaction =  {
    name: 'Reactions.force_delete_post_reaction',
    v13: new CallType(
        'Reactions.force_delete_post_reaction',
        sts.struct({
            reactionId: sts.bigint(),
            postId: sts.bigint(),
            who: v13.AccountId32,
        })
    ),
}

export const forceSetNextReactionId =  {
    name: 'Reactions.force_set_next_reaction_id',
    v13: new CallType(
        'Reactions.force_set_next_reaction_id',
        sts.struct({
            reactionId: sts.bigint(),
        })
    ),
}
