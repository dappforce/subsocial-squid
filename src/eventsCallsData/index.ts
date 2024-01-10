import { EventName } from '../model';
import { Block, Ctx, EventItem } from '../processor';
import {
  ParsedEventsData,
  ParsedEventsDataMap,
  PostCreatedData,
  PostUpdatedData,
  EventId,
  EventContext,
  EventData,
  SpaceCreatedData,
  SpaceUpdatedData,
  SpaceOwnershipTransferAcceptedData,
  SpaceOwnershipTransferCreatedData,
  PostMovedData,
  AccountFollowedData,
  AccountUnfollowedData,
  SpaceFollowedData,
  SpaceUnfollowedData,
  ProfileUpdatedData,
  PostReactionCreatedData,
  PostReactionUpdatedData,
  PostReactionDeletedData,
  DomainRegisteredData,
  DomainMetaUpdatedData,
  EvmAddressLinkedToAccountData,
  EvmAddressUnlinkedFromAccountData
} from '../common/types';
import { SubstrateEvent } from '@subsquid/substrate-processor';
import { getChain } from '../chains';

type EventDataType<T> = T extends EventName.SpaceCreated
  ? SpaceCreatedData
  : T extends EventName.SpaceUpdated
  ? SpaceUpdatedData
  : T extends EventName.PostCreated
  ? PostCreatedData
  : T extends EventName.PostUpdated
  ? PostUpdatedData
  : T extends EventName.PostMoved
  ? PostMovedData
  : T extends EventName.AccountFollowed
  ? AccountFollowedData
  : T extends EventName.AccountUnfollowed
  ? AccountUnfollowedData
  : T extends EventName.SpaceFollowed
  ? SpaceFollowedData
  : T extends EventName.SpaceUnfollowed
  ? SpaceUnfollowedData
  : T extends EventName.SpaceOwnershipTransferAccepted
  ? SpaceOwnershipTransferAcceptedData
  : T extends EventName.SpaceOwnershipTransferCreated
  ? SpaceOwnershipTransferCreatedData
  : T extends EventName.ProfileUpdated
  ? ProfileUpdatedData
  : T extends EventName.PostReactionCreated
  ? PostReactionCreatedData
  : T extends EventName.PostReactionUpdated
  ? PostReactionUpdatedData
  : T extends EventName.PostReactionDeleted
  ? PostReactionDeletedData
  : T extends EventName.UserNameRegistered
  ? DomainRegisteredData
  : T extends EventName.UserNameUpdated
  ? DomainMetaUpdatedData
  : T extends EventName.EvmAddressLinkedToAccount
  ? EvmAddressLinkedToAccountData
  : T extends EventName.EvmAddressUnlinkedFromAccount
  ? EvmAddressUnlinkedFromAccountData
  : never;

const { getApiDecorated } = getChain();

export class ParsedEventsDataScope {
  private scope: ParsedEventsDataMap;

  constructor() {
    this.scope = new Map();
  }

  set(section: EventName, value: ParsedEventsData): void {
    this.scope.set(
      section,
      (this.scope.get(section) || new Map()).set(value.id, value)
    );
  }

  get<T>(section: EventName): Map<EventId, T> {
    return (
      (this.scope.get(section) as Map<EventId, T>) || new Map<EventId, T>()
    );
  }

  getSectionByEventName<T extends EventName>(
    section: T
  ): Map<EventId, EventDataType<T>> {
    return (
      (this.scope.get(section) as Map<EventId, EventDataType<T>>) ||
      new Map<EventId, EventDataType<T>>()
    );
  }

  entries(): IterableIterator<[EventName, Map<EventId, ParsedEventsData>]> {
    return this.scope.entries();
  }
}

function getEventMetadata(block: Block, event: SubstrateEvent): EventData {
  return {
    id: event.id,
    indexInBlock: event.indexInBlock,
    name: event.name,
    blockNumber: block.header.height,
    blockHash: block.header.hash,
    timestamp: new Date(block.header.timestamp)
  };
}

export function getParsedEventsData(ctx: Ctx): ParsedEventsDataScope {
  const parsedData = new ParsedEventsDataScope();
  let totalEventsNumber = 0;
  const api = getApiDecorated('subsocial');

  for (let block of ctx.blocks) {
    for (let item of block.items) {
      const eventItem = item as EventItem;
      const eventHandlerContext = {
        ...ctx,
        block: block.header,
        // @ts-ignore
        event: eventItem.event as SubstrateEvent
      } as EventContext;

      switch (item.name) {
        case 'Posts.PostCreated': {
          const callData =
            api.calls.parseCreatPostCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostCreatedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostCreated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...callData,
            ...eventData
          });
          totalEventsNumber++;
          break;
        }

        case 'Posts.PostUpdated': {
          const callData =
            api.calls.parsePostUpdatedCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostUpdatedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostUpdated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });

          totalEventsNumber++;
          break;
        }

        case 'Posts.PostMoved': {
          const callData = api.calls.parsePostMoveCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostMovedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostMoved, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });
          totalEventsNumber++;
          break;
        }

        case 'PostFollows.PostFollowed': {
          const xSocialApi = getApiDecorated('xsocial');
          const eventData =
            xSocialApi.events.parsePostFollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostFollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });
          totalEventsNumber++;
          break;
        }
        case 'PostFollows.PostUnfollowed': {
          const xSocialApi = getApiDecorated('xsocial');
          const eventData =
            xSocialApi.events.parsePostUnfollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostUnfollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });
          totalEventsNumber++;
          break;
        }

        case 'Spaces.SpaceCreated': {
          const callData =
            api.calls.parseSpaceCreateCallArgs(eventHandlerContext);
          const eventData =
            api.events.parseSpaceCreatedEventParams(eventHandlerContext);

          parsedData.set(EventName.SpaceCreated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });
          totalEventsNumber++;
          break;
        }

        case 'Spaces.SpaceUpdated': {
          const callData =
            api.calls.parseSpaceUpdateCallArgs(eventHandlerContext);
          const eventData =
            api.events.parseSpaceUpdatedEventParams(eventHandlerContext);

          parsedData.set(EventName.SpaceUpdated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });
          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionCreated': {
          const callData =
            api.calls.parsePostReactionCreateCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostReactionCreatedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostReactionCreated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });

          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionUpdated': {
          const callData =
            api.calls.parsePostReactionUpdateCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostReactionUpdatedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostReactionUpdated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });

          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionDeleted': {
          const callData =
            api.calls.parsePostReactionDeleteCallArgs(eventHandlerContext);
          const eventData =
            api.events.parsePostReactionDeletedEventParams(eventHandlerContext);

          parsedData.set(EventName.PostReactionDeleted, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData,
            ...callData
          });

          totalEventsNumber++;
          break;
        }

        case 'Profiles.ProfileUpdated': {
          const eventData =
            api.events.parseProfileUpdatedEventParams(eventHandlerContext);

          parsedData.set(EventName.ProfileUpdated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceFollows.SpaceFollowed': {
          const eventData =
            api.events.parseSpaceFollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.SpaceFollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceFollows.SpaceUnfollowed': {
          const eventData =
            api.events.parseSpaceUnfollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.SpaceUnfollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }
        case 'SpaceOwnership.SpaceOwnershipTransferCreated': {
          const eventData =
            api.events.parseSpaceOwnershipTransferCreatedEventParams(
              eventHandlerContext
            );

          parsedData.set(EventName.SpaceOwnershipTransferCreated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceOwnership.SpaceOwnershipTransferAccepted': {
          const eventData =
            api.events.parseSpaceOwnershipTransferAcceptedEventParams(
              eventHandlerContext
            );

          parsedData.set(EventName.SpaceOwnershipTransferAccepted, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        case 'AccountFollows.AccountFollowed': {
          const eventData =
            api.events.parseAccountFollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.AccountFollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });
          totalEventsNumber++;
          break;
        }

        case 'AccountFollows.AccountUnfollowed': {
          const eventData =
            api.events.parseAccountUnfollowedEventParams(eventHandlerContext);

          parsedData.set(EventName.AccountUnfollowed, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        case 'Domains.DomainRegistered': {
          const eventData =
            api.events.parseDomainRegisteredEventParams(eventHandlerContext);

          parsedData.set(EventName.UserNameRegistered, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }
        case 'Domains.DomainMetaUpdated': {
          const eventData =
            api.events.parseDomainMetaUpdatedEventParams(eventHandlerContext);

          parsedData.set(EventName.UserNameUpdated, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }
        case 'EvmAccounts.EvmAddressLinkedToAccount': {
          const xSocialApi = getApiDecorated('xsocial');
          const eventData =
            xSocialApi.events.parseEvmAddressLinkedToAccountEventParams(
              eventHandlerContext
            );

          parsedData.set(EventName.EvmAddressLinkedToAccount, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }
        case 'EvmAccounts.EvmAddressUnlinkedFromAccount': {
          const xSocialApi = getApiDecorated('xsocial');
          const eventData =
            xSocialApi.events.parseEvmAddressUnlinkedFromAccountEventParams(
              eventHandlerContext
            );

          parsedData.set(EventName.EvmAddressUnlinkedFromAccount, {
            ...getEventMetadata(block, item.event as SubstrateEvent),
            ...eventData
          });

          totalEventsNumber++;
          break;
        }

        default:
      }
    }
  }

  ctx.log.info(`Total number of events for processing - ${totalEventsNumber}`);
  return parsedData;
}
