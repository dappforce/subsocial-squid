import { Ctx } from '../../processor';
import { EvmAddressLinkedToAccountEventParsedData } from '../../common/types';
import { getEvmSubstrateAccountLinkEntityId } from '../../common/utils';
import { EvmSubstrateAccountLink } from '../../model';

export async function accountUnlinked(
  ctx: Ctx,
  eventData: EvmAddressLinkedToAccountEventParsedData
): Promise<void> {
  const evmSubstrateAccountLinkEntityId = getEvmSubstrateAccountLinkEntityId(
    eventData.ethereumAccountId,
    eventData.substrateAccountId
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
