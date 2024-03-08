import { setActivity } from '../activity';
import { getOrCreateAccount } from './common';
import { Ctx } from '../../processor';
import { ProfileUpdatedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';

export async function accountUpdated(
  ctx: Ctx,
  { eventData }: ProfileUpdatedData
): Promise<void> {
  const account = await getOrCreateAccount(eventData.params.accountId, ctx);

  account.updatedAtTime = eventData.metadata.timestamp;
  account.updatedAtBlock = BigInt(eventData.metadata.blockNumber.toString());

  if (
    (eventData.params.spaceId && !account.profileSpace) ||
    (eventData.params.spaceId &&
      account.profileSpace &&
      account.profileSpace.id !== eventData.params.spaceId)
  ) {
    const accountSpace = await getEntityWithRelations.space(
      eventData.params.spaceId,
      ctx
    );

    account.profileSpace = accountSpace;

    await ctx.store.save(account);

    if (accountSpace) {
      accountSpace.profileSpace = account;
      await ctx.store.save(accountSpace);
    }
  } else {
    await ctx.store.save(account);
  }

  await setActivity({
    account,
    ctx,
    eventMetadata: eventData.metadata
  });
}
