import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { handleUsername } from './common';
import { setActivity } from '../activity';
import { getSyntheticEventName } from '../../common/utils';
import { EventName } from '../../model';

export async function domainRegistered(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<void> {
  const handlerResult = await handleUsername(ctx, eventData);

  await setActivity({
    syntheticEventName: EventName.UserNameRegistered,
    account: handlerResult.registrarAccount,
    domainRecipient: handlerResult.recipientAccount,
    username: handlerResult.usernameStr,
    space: handlerResult.space,
    ctx,
    eventMetadata: eventData.eventData.metadata
  });
}
