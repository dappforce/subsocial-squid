import { Ctx } from '../../processor';
import {
  EvmAddressLinkedToAccountEventParsedData, EvmAddressUnlinkedFromAccountData,
  EvmAddressUnlinkedFromAccountEventParsedData
} from '../../common/types';
import { getEvmSubstrateAccountLinkEntityId } from '../../common/utils';
import { EvmSubstrateAccountLink } from '../../model';

export async function accountUnlinked(
  ctx: Ctx,
  { eventData }: EvmAddressUnlinkedFromAccountData
): Promise<void> {
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

  if (!evmSubstrateAccountLinkEntity) return;

  evmSubstrateAccountLinkEntity.active = false;

  await ctx.store.save(evmSubstrateAccountLinkEntity);
}
