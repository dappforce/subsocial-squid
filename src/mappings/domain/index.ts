import { Ctx } from "../../processor";
import { ParsedEventsDataScope } from "../../eventsCallsData";
import { EventName } from "../../model";
import { getOrderedListByBlockNumber } from "../../common/utils";
import { domainRegistered } from './registered';
import { domainUpdated } from './updated';

export async function handleDomains(
  ctx: Ctx,
  parsedEvents: ParsedEventsDataScope
) {

  const domainRegisteredEvents = [
    ...parsedEvents.getSectionByEventName(EventName.UserNameRegistered).values()
  ];
  const domainUpdatedEvents = [
    ...parsedEvents.getSectionByEventName(EventName.UserNameUpdated).values()
  ];

  for (const eventData of getOrderedListByBlockNumber(domainRegisteredEvents)) {
    await domainRegistered(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(domainUpdatedEvents)) {
    await domainUpdated(ctx, eventData);
  }
}