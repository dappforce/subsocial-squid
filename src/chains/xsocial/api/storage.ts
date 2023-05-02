import { Block, Chain, ChainContext } from '../types/support';
import { DomainStorageData } from '../../../common/types';

export async function getRegisteredDomainMeta(
  ctx: ChainContext,
  block: Block,
  domainOrList: Uint8Array | Uint8Array[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  return undefined;
}
