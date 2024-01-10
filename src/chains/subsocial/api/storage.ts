import { UnknownVersionError } from '../../../common/errors';

import * as v7 from '../types/v7';
import * as v13 from '../types/v13';
import * as v27 from '../types/v27';
import { DomainStorageData, StorageForDecode } from '../../../common/types';
import { storage } from '../types';
import { Block } from '../../../processor';
import { Block as SupportBlock } from '../types/support';

export async function getRegisteredDomainMeta(
  ctx: StorageForDecode,
  block: Block,
  domainOrList: string | string[]
): Promise<(DomainStorageData | undefined)[] | DomainStorageData | undefined> {
  const storageBlock = {
    hash: block.header.hash,
    height: block.header.height,
    _runtime: block.header._runtime
  } as SupportBlock;

  const decorateMeta = <
    T extends v7.DomainMeta | v13.DomainMeta | v27.DomainMeta | undefined
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

  if (storage.domains.registeredDomains.v7.is(ctx)) {
    if (Array.isArray(domainOrList)) {
      return (
        await storage.domains.registeredDomains.v7.getMany(
          storageBlock,
          domainOrList
        )
      ).map(decorateMeta);
    } else {
      return decorateMeta(
        await storage.domains.registeredDomains.v7.get(
          storageBlock,
          domainOrList
        )
      );
    }
  } else if (storage.domains.registeredDomains.v13.is(ctx)) {
    if (Array.isArray(domainOrList)) {
      return (
        await storage.domains.registeredDomains.v13.getMany(
          storageBlock,
          domainOrList
        )
      ).map(decorateMeta);
    } else {
      return decorateMeta(
        await storage.domains.registeredDomains.v13.get(
          storageBlock,
          domainOrList
        )
      );
    }
  } else if (storage.domains.registeredDomains.v27.is(ctx)) {
    if (Array.isArray(domainOrList)) {
      return (
        await storage.domains.registeredDomains.v13.getMany(
          storageBlock,
          domainOrList
        )
      ).map(decorateMeta);
    } else {
      return decorateMeta(
        await storage.domains.registeredDomains.v13.get(
          storageBlock,
          domainOrList
        )
      );
    }
  }

  throw new UnknownVersionError('registeredDomains');
}
