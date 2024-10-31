import { ChainApi } from '../../interfaces/chainApi';
import {
  parsePostCreatedEventParams,
  parsePostUpdatedEventParams,
  parsePostMovedEventParams,
  parseSpaceCreatedEventParams,
  parseSpaceUpdatedEventParams,
  parsePostReactionCreatedEventParams,
  parsePostReactionUpdatedEventParams,
  parsePostReactionDeletedEventParams,
  parseProfileUpdatedEventParams,
  parseSpaceFollowedEventParams,
  parseSpaceUnfollowedEventParams,
  parseSpaceOwnershipTransferAcceptedEventParams,
  parseAccountFollowedEventParams,
  parseAccountUnfollowedEventParams,
  parseDomainRegisteredEventParams,
  parseDomainMetaUpdatedEventParams,
  parseSpaceOwnershipTransferCreatedEventParams,
  parseEvmAddressLinkedToAccountEventParams,
  parseEvmAddressUnlinkedFromAccountEventParams,
  parsePostFollowedEventParams,
  parsePostUnfollowedEventParams,
  parseOwnershipTransferCreatedEventParams,
  parseOwnershipTransferAcceptedEventParams,
  parseOwnershipTransferRejectedEventParams
} from './events';

import {
  parseCreatPostCallArgs,
  parsePostUpdatedCallArgs,
  parsePostMoveCallArgs,
  parseSpaceCreateCallArgs,
  parseSpaceUpdateCallArgs,
  parsePostReactionCreateCallArgs,
  parsePostReactionUpdateCallArgs,
  parsePostReactionDeleteCallArgs,
  parseOwnershipTransferOwnershipCallArgs,
  parseOwnershipAcceptPendingOwnershipCallArgs,
  parseOwnershipRejectPendingOwnershipCallArgs
} from './calls';
import { getRegisteredDomainMeta } from './storage';

export const api: ChainApi = {
  events: {
    parsePostCreatedEventParams,
    parsePostUpdatedEventParams,
    parsePostMovedEventParams,
    parseSpaceCreatedEventParams,
    parseSpaceUpdatedEventParams,
    parsePostReactionCreatedEventParams,
    parsePostReactionUpdatedEventParams,
    parsePostReactionDeletedEventParams,
    parseProfileUpdatedEventParams,
    parseSpaceFollowedEventParams,
    parseSpaceUnfollowedEventParams,
    parseSpaceOwnershipTransferAcceptedEventParams,
    parseAccountFollowedEventParams,
    parseAccountUnfollowedEventParams,
    parseDomainRegisteredEventParams,
    parseDomainMetaUpdatedEventParams,
    parseSpaceOwnershipTransferCreatedEventParams,
    parseEvmAddressLinkedToAccountEventParams,
    parseEvmAddressUnlinkedFromAccountEventParams,
    parsePostFollowedEventParams,
    parsePostUnfollowedEventParams,
    parseOwnershipTransferCreatedEventParams,
    parseOwnershipTransferAcceptedEventParams,
    parseOwnershipTransferRejectedEventParams
  },
  calls: {
    parseCreatPostCallArgs,
    parsePostUpdatedCallArgs,
    parsePostMoveCallArgs,
    parseSpaceCreateCallArgs,
    parseSpaceUpdateCallArgs,
    parsePostReactionCreateCallArgs,
    parsePostReactionUpdateCallArgs,
    parsePostReactionDeleteCallArgs,
    parseOwnershipTransferOwnershipCallArgs,
    parseOwnershipAcceptPendingOwnershipCallArgs,
    parseOwnershipRejectPendingOwnershipCallArgs
  },
  storage: {
    getRegisteredDomainMeta
  }
};
