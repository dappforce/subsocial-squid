import { DomainStorageData, StorageForDecode } from '../../../common/types';
import { Block } from '../../../processor';

export async function getRegisteredDomainMeta(
  ctx: StorageForDecode,
  block: Block,
  domainOrList: string | string[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  return undefined;
}
