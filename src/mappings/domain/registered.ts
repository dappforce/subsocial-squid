import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { handleUsername } from './common';

export async function domainRegistered(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<void> {
  await handleUsername(ctx, eventData);
}
