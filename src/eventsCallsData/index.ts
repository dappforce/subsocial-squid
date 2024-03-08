import { EventName } from '../model';
import { Block, Ctx, Event } from '../processor';
import {
  ParsedEventsData,
  ParsedEventsDataMap,
  PostCreatedData,
  PostUpdatedData,
  EventId,
  EventContext,
  EventMetadata,
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
  EvmAddressUnlinkedFromAccountData,
  PostFollowedData,
  PostUnfollowedData
} from '../common/types';
import { getPseudoUuidV4 } from '@subsocial/data-hub-sdk/dist/utils';
import { getChain } from '../chains';
import { getCallNameFromCtx, getCallSigner } from '../chains/utils';
import * as crypto from 'node:crypto';
import { orderItems } from '../common/blockItemsDriver';

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

  getAllSectionsData() {
    const allValues: ParsedEventsData[][] = [];

    this.scope.forEach((sectionDataMap) => {
      allValues.push([...sectionDataMap.values()]);
    });

    return allValues.flat();
  }

  entries(): IterableIterator<[EventName, Map<EventId, ParsedEventsData>]> {
    return this.scope.entries();
  }
}

function getEventMetadata(block: Block, event: Event): EventMetadata {
  return {
    id: event.id,
    indexInBlock: event.index,
    name: event.name,
    blockNumber: block.header.height,
    blockHash: block.header.hash,
    timestamp: new Date(block.header.timestamp!),
    runtime: block.header._runtime
  };
}

export function getParsedEventsData(ctx: Ctx): ParsedEventsDataScope {
  const parsedData = new ParsedEventsDataScope();
  let totalEventsNumber = 0;
  const api = getApiDecorated('subsocial');

  for (let block of ctx.blocks) {
    for (let item of orderItems(block)) {
      if (item.kind !== 'event') continue;

      // const eventItem = item as EventItem;
      // const eventHandlerContext = {
      //   ...ctx,
      //   block: block.header,
      //   // @ts-ignore
      //   event: eventItem.event as SubstrateEvent
      // } as EventContext;
      const eventItem = item.value as Event;

      const callMetadata = {
        name: getCallNameFromCtx(eventItem),
        signer: getCallSigner(eventItem) ?? '',
        // TODO uuid and timestamp fields must be substituted by data from call agrs to be consistent with user's values
        uuid: crypto.randomUUID(),
        timestamp: block.header.timestamp || 0
      };

      switch (eventItem.name) {
        case 'Posts.PostCreated': {
          const callArgs = api.calls.parseCreatPostCallArgs(eventItem);
          const eventParams = api.events.parsePostCreatedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostCreated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.postId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'Posts.PostUpdated': {
          const callArgs = api.calls.parsePostUpdatedCallArgs(eventItem);
          const eventParams = api.events.parsePostUpdatedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostUpdated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.postId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'Posts.PostMoved': {
          const callArgs = api.calls.parsePostMoveCallArgs(eventItem);
          const eventParams = api.events.parsePostMovedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostMoved, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.postId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'PostFollows.PostFollowed': {
          const eventParams =
            api.events.parsePostFollowedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostFollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.postId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'PostFollows.PostUnfollowed': {
          const eventParams =
            api.events.parsePostUnfollowedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostUnfollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.postId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'Spaces.SpaceCreated': {
          const callArgs = api.calls.parseSpaceCreateCallArgs(eventItem);
          const eventParams =
            api.events.parseSpaceCreatedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceCreated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'Spaces.SpaceUpdated': {
          const callArgs = api.calls.parseSpaceUpdateCallArgs(eventItem);
          const eventParams =
            api.events.parseSpaceUpdatedEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceUpdated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionCreated': {
          const callArgs = api.calls.parsePostReactionCreateCallArgs(eventItem);
          const eventParams =
            api.events.parsePostReactionCreatedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostReactionCreated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.reactionId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionUpdated': {
          const callArgs = api.calls.parsePostReactionUpdateCallArgs(eventItem);
          const eventParams =
            api.events.parsePostReactionUpdatedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostReactionUpdated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.reactionId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'Reactions.PostReactionDeleted': {
          const callArgs = api.calls.parsePostReactionDeleteCallArgs(eventItem);
          const eventParams =
            api.events.parsePostReactionDeletedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.PostReactionDeleted, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.reactionId}${callMetadata.name}`,
                block.header.timestamp || 0
              ),
              args: callArgs
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'Profiles.ProfileUpdated': {
          const eventParams =
            api.events.parseProfileUpdatedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.ProfileUpdated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${eventParams.accountId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceFollows.SpaceFollowed': {
          const eventParams =
            api.events.parseSpaceFollowedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceFollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceFollows.SpaceUnfollowed': {
          const eventParams =
            api.events.parseSpaceUnfollowedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceUnfollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'SpaceOwnership.SpaceOwnershipTransferCreated': {
          const eventParams =
            api.events.parseSpaceOwnershipTransferCreatedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceOwnershipTransferCreated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${eventParams.currentOwnerId}${eventParams.newOwnerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'SpaceOwnership.SpaceOwnershipTransferAccepted': {
          const eventParams =
            api.events.parseSpaceOwnershipTransferAcceptedEventParams(
              eventItem
            );

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.SpaceOwnershipTransferAccepted, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.spaceId}${eventParams.accountId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'AccountFollows.AccountFollowed': {
          const eventParams =
            api.events.parseAccountFollowedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.AccountFollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.accountId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });
          totalEventsNumber++;
          break;
        }

        case 'AccountFollows.AccountUnfollowed': {
          const eventParams =
            api.events.parseAccountUnfollowedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.AccountUnfollowed, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.accountId}${eventParams.followerId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'Domains.DomainRegistered': {
          const eventParams =
            api.events.parseDomainRegisteredEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.UserNameRegistered, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.accountId}${eventParams.recipientId}${eventParams.domain}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'Domains.DomainMetaUpdated': {
          const eventParams =
            api.events.parseDomainMetaUpdatedEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.UserNameUpdated, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.accountId}${eventParams.domain}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }

        case 'EvmAddresses.EvmAddressLinkedToAccount':
        case 'EvmAccounts.EvmAddressLinkedToAccount': {
          const eventParams =
            api.events.parseEvmAddressLinkedToAccountEventParams(eventItem);

          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.EvmAddressLinkedToAccount, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.substrateAccountId}${eventParams.ethereumAccountId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
          });

          totalEventsNumber++;
          break;
        }
        case 'EvmAddresses.EvmAddressUnlinkedFromAccount':
        case 'EvmAccounts.EvmAddressUnlinkedFromAccount': {
          const eventParams =
            api.events.parseEvmAddressUnlinkedFromAccountEventParams(eventItem);
          const eventMetadata = getEventMetadata(block, eventItem);

          parsedData.set(EventName.EvmAddressUnlinkedFromAccount, {
            id: eventMetadata.id,
            eventData: {
              name: eventMetadata.name,
              metadata: eventMetadata,
              params: eventParams
            },
            callData: {
              ...callMetadata,
              uuid: getPseudoUuidV4(
                `${eventParams.substrateAccountId}${eventParams.ethereumAccountId}${callMetadata.name}`,
                block.header.timestamp || 0
              )
            }
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
