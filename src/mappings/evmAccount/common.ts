import { EvmAccount } from '../../model';
import { Ctx } from '../../processor';
import { getEntityWithRelations } from '../../common/gettersWithRelations';

export async function getOrCreateEvmAccount(
  accountId: string,
  ctx: Ctx,
  debugId: string = ''
): Promise<EvmAccount> {
  if (accountId === null || !accountId)
    throw new Error(`Account ID has unsupported value - ${debugId}`);

  let evmAccount = await getEntityWithRelations.evmAccount(accountId, ctx);

  if (evmAccount) return evmAccount;

  evmAccount = new EvmAccount();
  evmAccount.id = accountId;

  await ctx.store.save(evmAccount);

  return evmAccount;
}
