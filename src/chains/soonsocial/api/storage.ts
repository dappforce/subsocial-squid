import { Block, Chain, ChainContext } from '../types/support';
import { DomainsDomainByInnerValueStorage } from '../types/storage';
import { UnknownVersionError } from '../../../common/errors';

import * as v1500 from '../types/v1500';

export async function getSpacesHandle(
  ctx: ChainContext,
  block: Block,
  idOrList: [Uint8Array, v1500.InnerValue] | [Uint8Array, v1500.InnerValue][],
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
