import { Block, Chain, ChainContext } from '../types/support';
import {
  DomainsDomainByInnerValueStorage,
  DomainsRegisteredDomainsStorage
} from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v1500 from '../types/v1500';
import { DomainStorageData } from '../../../common/types';

export async function getSpacesHandle(
  ctx: ChainContext,
  block: Block,
  idOrList: [Uint8Array, v1500.InnerValue] | [Uint8Array, v1500.InnerValue][]
): Promise<(Uint8Array | undefined)[] | Uint8Array | undefined> {
  const storage = new DomainsDomainByInnerValueStorage(ctx, block);
  if (!storage.isExists) return undefined;

  if (storage.isV1500) {
    if (Array.isArray(idOrList)) {
      return await storage.asV1500.getMany(
        idOrList as [Uint8Array, v1500.InnerValue][]
      );
    } else {
      return await storage.asV1500.get(idOrList[0], idOrList[1]);
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}

export async function getRegisteredDomainMeta(
  ctx: ChainContext,
  block: Block,
  domainOrList: Uint8Array | Uint8Array[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  const storage = new DomainsRegisteredDomainsStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const decorateMeta = <T extends v1500.DomainMeta | undefined>(
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

  if (storage.isV1500) {
    if (Array.isArray(domainOrList)) {
      return (await storage.asV1500.getMany(domainOrList)).map(decorateMeta);
    } else {
      return decorateMeta(await storage.asV1500.get(domainOrList));
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}
