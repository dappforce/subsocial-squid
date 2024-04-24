import { Ctx } from '../../processor';
import { ParsedEventsDataScope } from '../../eventsCallsData';
import { EventName } from '../../model';
import { getOrderedListByBlockNumber } from '../../common/utils';

import { spaceOwnershipTransferAccepted } from './spaceOwnershipTransferAccepted';
import { spaceOwnershipTransferCreated } from './spaceOwnershipTransferCreated';
import { ownershipTransferCreated } from './ownershipTransferCreated';
import { ownershipTransferAccepted } from './ownershipTransferAccepted';

export async function handleOwnership(
  ctx: Ctx,
  parsedEvents: ParsedEventsDataScope
) {
  const spaceOwnershipTransferAcceptedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.SpaceOwnershipTransferAccepted)
      .values()
  ];
  const spaceOwnershipTransferCreatedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.SpaceOwnershipTransferCreated)
      .values()
  ];
  const ownershipTransferCreatedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.OwnershipTransferCreated)
      .values()
  ];
  const ownershipTransferAcceptedEvents = [
    ...parsedEvents
      .getSectionByEventName(EventName.OwnershipTransferAccepted)
      .values()
  ];

  for (const eventData of getOrderedListByBlockNumber(
    spaceOwnershipTransferAcceptedEvents
  )) {
    await spaceOwnershipTransferAccepted(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(
    spaceOwnershipTransferCreatedEvents
  )) {
    await spaceOwnershipTransferCreated(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(
    ownershipTransferCreatedEvents
  )) {
    await ownershipTransferCreated(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(
    ownershipTransferAcceptedEvents
  )) {
    await ownershipTransferAccepted(ctx, eventData);
  }
}
