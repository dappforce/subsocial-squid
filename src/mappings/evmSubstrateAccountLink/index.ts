import { Ctx } from '../../processor';
import { ParsedEventsDataScope } from '../../eventsCallsData';
import { EventName } from '../../model';
import { getOrderedListByBlockNumber } from '../../common/utils';

import { accountLinked } from './linked';
import { accountUnlinked } from './unlinked';

export async function handleEvmSubstrateAccountLinks(
  ctx: Ctx,
  parsedEvents: ParsedEventsDataScope
) {
  const accountLinkedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.EvmAddressLinkedToAccount)
      .values()
  ];
  const accountUnlinkedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.EvmAddressUnlinkedFromAccount)
      .values()
  ];

  for (const eventData of getOrderedListByBlockNumber(accountLinkedEvents)) {
    await accountLinked(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(accountUnlinkedEvents)) {
    await accountUnlinked(ctx, eventData);
  }
}
