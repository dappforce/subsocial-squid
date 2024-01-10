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
  parseSpaceOwnershipTransferCreatedEventParams
} from './events';

import {
  parseCreatPostCallArgs,
  parsePostUpdatedCallArgs,
  parsePostMoveCallArgs,
  parseSpaceCreateCallArgs,
  parseSpaceUpdateCallArgs,
  parsePostReactionCreateCallArgs,
  parsePostReactionUpdateCallArgs,
  parsePostReactionDeleteCallArgs
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
    parseSpaceOwnershipTransferCreatedEventParams
  },
  calls: {
    parseCreatPostCallArgs,
    parsePostUpdatedCallArgs,
    parsePostMoveCallArgs,
    parseSpaceCreateCallArgs,
    parseSpaceUpdateCallArgs,
    parsePostReactionCreateCallArgs,
    parsePostReactionUpdateCallArgs,
    parsePostReactionDeleteCallArgs
  },
  storage: {
    getRegisteredDomainMeta
  }
};
