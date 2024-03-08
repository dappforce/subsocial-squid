import { DomainStorageData, StorageForDecode } from '../../../common/types';
import { Block as SupportBlock } from '../types/support';

export async function getRegisteredDomainMeta(
  block: SupportBlock,
  domainOrList: string | string[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  return undefined;
}
