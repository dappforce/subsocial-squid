import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const createPostReaction =  {
    name: 'Reactions.create_post_reaction',
    v102: new CallType(
        'Reactions.create_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            kind: v102.ReactionKind,
        })
    ),
}

export const updatePostReaction =  {
    name: 'Reactions.update_post_reaction',
    v102: new CallType(
        'Reactions.update_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            newKind: v102.ReactionKind,
        })
    ),
}

export const deletePostReaction =  {
    name: 'Reactions.delete_post_reaction',
    v102: new CallType(
        'Reactions.delete_post_reaction',
        sts.struct({
            postId: sts.bigint(),
            reactionId: sts.bigint(),
        })
    ),
}

export const forceCreatePostReaction =  {
    name: 'Reactions.force_create_post_reaction',
    v102: new CallType(
        'Reactions.force_create_post_reaction',
        sts.struct({
            who: v102.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            created: v102.WhoAndWhen,
            reactionKind: v102.ReactionKind,
        })
    ),
}

export const forceDeletePostReaction =  {
    name: 'Reactions.force_delete_post_reaction',
    v102: new CallType(
        'Reactions.force_delete_post_reaction',
        sts.struct({
            reactionId: sts.bigint(),
            postId: sts.bigint(),
            who: v102.AccountId32,
        })
    ),
}

export const forceSetNextReactionId =  {
    name: 'Reactions.force_set_next_reaction_id',
    v102: new CallType(
        'Reactions.force_set_next_reaction_id',
        sts.struct({
            reactionId: sts.bigint(),
        })
    ),
}
