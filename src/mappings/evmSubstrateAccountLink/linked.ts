import { Ctx } from '../../processor';
import { EvmAddressLinkedToAccountData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { getOrCreateEvmAccount } from '../evmAccount';
import { getEvmSubstrateAccountLinkEntityId } from '../../common/utils';
import { AccountFollowers, EvmSubstrateAccountLink } from '../../model';

export async function accountLinked(
  ctx: Ctx,
  { eventData }: EvmAddressLinkedToAccountData
): Promise<void> {
  const substrateAccount = await getOrCreateAccount(
    eventData.params.substrateAccountId,
    ctx
  );
  const evmAccount = await getOrCreateEvmAccount(
    eventData.params.ethereumAccountId,
    ctx
  );

  const evmSubstrateAccountLinkEntityId = getEvmSubstrateAccountLinkEntityId(
    eventData.params.ethereumAccountId,
    eventData.params.substrateAccountId
  );
  const evmSubstrateAccountLinkEntity = await ctx.store.get(
    EvmSubstrateAccountLink,
    {
      where: {
        id: evmSubstrateAccountLinkEntityId,
        active: true
      }
    }
  );

  if (evmSubstrateAccountLinkEntity) return;

  const newLinkEntity = new EvmSubstrateAccountLink({
    id: evmSubstrateAccountLinkEntityId,
    evmAccount: evmAccount,
    substrateAccount: substrateAccount,
    active: true,
    createdAtBlock: BigInt(eventData.metadata.blockNumber.toString()),
    createdAtTime: new Date(eventData.metadata.timestamp)
  });

  await ctx.store.save(newLinkEntity);
}
