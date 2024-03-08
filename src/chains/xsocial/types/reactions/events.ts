import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const postReactionCreated =  {
    name: 'Reactions.PostReactionCreated',
    v102: new EventType(
        'Reactions.PostReactionCreated',
        sts.struct({
            account: v102.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v102.ReactionKind,
        })
    ),
}

export const postReactionUpdated =  {
    name: 'Reactions.PostReactionUpdated',
    v102: new EventType(
        'Reactions.PostReactionUpdated',
        sts.struct({
            account: v102.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v102.ReactionKind,
        })
    ),
}

export const postReactionDeleted =  {
    name: 'Reactions.PostReactionDeleted',
    v102: new EventType(
        'Reactions.PostReactionDeleted',
        sts.struct({
            account: v102.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v102.ReactionKind,
        })
    ),
}
