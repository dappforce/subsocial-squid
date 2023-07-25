import { Block, Chain, ChainContext } from '../types/support';
import {
  DomainsDomainByInnerValueStorage,
  DomainsRegisteredDomainsStorage
} from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v2300 from '../types/v2300';
import { DomainStorageData } from '../../../common/types';


export async function getRegisteredDomainMeta(
  ctx: ChainContext,
  block: Block,
  domainOrList: Uint8Array | Uint8Array[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  const storage = new DomainsRegisteredDomainsStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const decorateMeta = <T extends v2300.DomainMeta | undefined>(
    meta: T
  ): DomainStorageData | undefined => {
    if (!meta) return undefined;
    return {
      owner: meta.owner,
      innerValue:
        meta.innerValue && meta.innerValue.__kind === `Space`
          ? meta.innerValue.value
          : null,
      outerValue: meta.outerValue ?? null
    };
  };

  if (storage.isV2300) {
    if (Array.isArray(domainOrList)) {
      return (await storage.asV2300.getMany(domainOrList)).map(decorateMeta);
    } else {
      return decorateMeta(await storage.asV2300.get(domainOrList));
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}
