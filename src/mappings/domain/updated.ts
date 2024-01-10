import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { handleUsername } from './common';
import { setActivity } from '../activity';
import { EventName } from '../../model';

export async function domainUpdated(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<void> {
  const handlerResult = await handleUsername(ctx, eventData);

  await setActivity({
    syntheticEventName: EventName.UserNameUpdated,
    account: handlerResult.registrarAccount,
    domainRecipient: handlerResult.recipientAccount,
    username: handlerResult.usernameStr,
    space: handlerResult.space,
    spacePrev: handlerResult.spacePrev,
    ctx,
    eventData
  });
}
