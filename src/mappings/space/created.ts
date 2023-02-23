import { getOrCreateAccount } from '../account';
import { setActivity } from '../activity';
import { processSpaceFollowingUnfollowingRelations } from '../spaceFollows';
import { Ctx } from '../../processor';
import { ensureSpace } from './common';
import { SpaceCreatedData } from '../../common/types';
import { ElasticSearchManager } from '../../elasticsearch';

export async function spaceCreated(ctx: Ctx, eventData: SpaceCreatedData) {
  const account = await getOrCreateAccount(eventData.accountId, ctx);

  const space = await ensureSpace({
    spaceId: eventData.spaceId,
    ctx,
    eventData
  });

  await ctx.store.save(space);

  ElasticSearchManager.index(ctx).addToQueue(space);

  await processSpaceFollowingUnfollowingRelations(
    account,
    space,
    ctx,
    eventData
  );

  await setActivity({
    account,
    space,
    ctx,
    eventData
  });
}
