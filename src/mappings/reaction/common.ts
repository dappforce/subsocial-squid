import { Account, Post, Reaction, ReactionKind, Status } from '../../model';

import { getOrCreateAccount } from '../account';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { EventMetadata, PostReactionCreatedData } from '../../common/types';
import { Ctx } from '../../processor';
import { getEntityWithRelations } from '../../common/gettersWithRelations';

export function getReactionKindFromCall(
  eventName: string
): ReactionKind | null {
  // assert(ctx.event.call);
  //
  // let call = null;
  // let kind = null;
  // switch (eventName) {
  //   case 'Reactions.PostReactionCreated':
  //     call = new ReactionsCreatePostReactionCall({
  //       _chain: ctx._chain,
  //       call: ctx.event.call
  //     });
  //     kind = call.asV1.kind;
  //     break;
  //   case 'Reactions.PostReactionUpdated':
  //     call = new ReactionsUpdatePostReactionCall({
  //       _chain: ctx._chain,
  //       call: ctx.event.call
  //     });
  //     kind = call.asV1.newKind;
  //     break;
  // }
  //
  // if (!call || !kind) return null;
  //
  // return ReactionKind[kind.__kind as keyof typeof ReactionKind];
  return null;
}

export async function ensureReaction({
  ctx,
  eventCallData
}: {
  ctx: Ctx;
  eventCallData: PostReactionCreatedData;
}): Promise<Reaction | null> {
  const {
    eventData: { params: eventParams, metadata: eventMetadata },
    callData: { args: callArgs }
  } = eventCallData;

  if (!callArgs) {
    new EntityProvideFailWarning(Post, 'new', ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const accountInst = await getOrCreateAccount(
    callArgs.forced && callArgs.forcedData
      ? callArgs.forcedData.account
      : eventParams.accountId,
    ctx
  );

  const postInst = await getEntityWithRelations.post({
    postId: eventParams.postId,
    ctx
  });

  if (!postInst) {
    new EntityProvideFailWarning(Post, eventParams.postId, ctx, eventMetadata);
    throw new CommonCriticalError();
  }

  const newReaction = new Reaction();
  newReaction.id = eventParams.reactionId;
  newReaction.status = Status.Active;
  newReaction.account = accountInst;
  newReaction.post = postInst;
  newReaction.kind = eventParams.reactionKind;
  newReaction.createdAtBlock = BigInt(eventMetadata.blockNumber.toString());
  newReaction.createdAtTime = eventMetadata.timestamp;

  return newReaction;
}
