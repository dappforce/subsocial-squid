import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { handleUsername } from './common';

export async function domainUpdated(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<void> {
  await handleUsername(ctx, eventData);
}
