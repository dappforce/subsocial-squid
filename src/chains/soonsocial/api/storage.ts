import { Block, Chain, ChainContext } from '../types/support';
import {
  DomainsDomainByInnerValueStorage,
  DomainsRegisteredDomainsStorage
} from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v2300 from '../types/v2300';
import * as v2601 from '../types/v2601';
import * as v2701 from '../types/v2701';
import { DomainStorageData } from '../../../common/types';

export async function getRegisteredDomainMeta(
  ctx: ChainContext,
  block: Block,
  domainOrList: Uint8Array | Uint8Array[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  const storage = new DomainsRegisteredDomainsStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const decorateMeta = <
    T extends v2300.DomainMeta | v2601.DomainMeta | undefined
  >(
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
  } else if (storage.isV2601) {
    if (Array.isArray(domainOrList)) {
      return (await storage.asV2601.getMany(domainOrList)).map(decorateMeta);
    } else {
      return decorateMeta(await storage.asV2300.get(domainOrList));
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}
