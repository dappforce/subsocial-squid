import { Block, Chain, ChainContext } from '../types/support';
import {
  DomainsDomainByInnerValueStorage,
  DomainsRegisteredDomainsStorage
} from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v7 from '../types/v7';
import * as v13 from '../types/v13';
import { DomainStorageData } from '../../../common/types';

export async function getRegisteredDomainMeta(
  ctx: ChainContext,
  block: Block,
  domainOrList: Uint8Array | Uint8Array[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  const storage = new DomainsRegisteredDomainsStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const decorateMeta = <T extends v7.DomainMeta | v13.DomainMeta | undefined>(
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

  if (storage.isV7) {
    if (Array.isArray(domainOrList)) {
      return (await storage.asV7.getMany(domainOrList)).map(decorateMeta);
    } else {
      return decorateMeta(await storage.asV7.get(domainOrList));
    }
  } else if (storage.isV13) {
    if (Array.isArray(domainOrList)) {
      return (await storage.asV13.getMany(domainOrList)).map(decorateMeta);
    } else {
      return decorateMeta(await storage.asV13.get(domainOrList));
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}
