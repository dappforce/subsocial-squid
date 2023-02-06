import { Block, Chain, ChainContext } from '../types/support';
import { DomainsDomainByInnerValueStorage } from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v7 from '../types/v7';

export async function getSpacesHandle(
  ctx: ChainContext,
  block: Block,
  idOrList: [Uint8Array, v7.InnerValue] | [Uint8Array, v7.InnerValue][],
): Promise<(Uint8Array | undefined)[] | Uint8Array | undefined> {
  const storage = new DomainsDomainByInnerValueStorage(ctx, block);
  if (!storage.isExists) return undefined;

  if (storage.isV7) {
    if (Array.isArray(idOrList)) {
      return await storage.asV7.getMany(
        idOrList as [Uint8Array, v7.InnerValue][]
      );
    } else {
      return await storage.asV7.get(idOrList[0], idOrList[1]);
    }
  }

  throw new UnknownVersionError(storage.constructor.name);
}
