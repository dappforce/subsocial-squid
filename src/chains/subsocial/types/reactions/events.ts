import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const postReactionCreated =  {
    name: 'Reactions.PostReactionCreated',
    v13: new EventType(
        'Reactions.PostReactionCreated',
        sts.struct({
            account: v13.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v13.ReactionKind,
        })
    ),
}

export const postReactionUpdated =  {
    name: 'Reactions.PostReactionUpdated',
    v13: new EventType(
        'Reactions.PostReactionUpdated',
        sts.struct({
            account: v13.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v13.ReactionKind,
        })
    ),
}

export const postReactionDeleted =  {
    name: 'Reactions.PostReactionDeleted',
    v13: new EventType(
        'Reactions.PostReactionDeleted',
        sts.struct({
            account: v13.AccountId32,
            postId: sts.bigint(),
            reactionId: sts.bigint(),
            reactionKind: v13.ReactionKind,
        })
    ),
}
