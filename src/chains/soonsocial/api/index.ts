import { ChainApi } from '../../interfaces/chainApi';
import {
  parsePostCreatedEventArgs,
  parsePostUpdatedEventArgs,
  parsePostMovedEventArgs,
  parseSpaceCreatedEventArgs,
  parseSpaceUpdatedEventArgs,
  parsePostReactionCreatedEventArgs,
  parsePostReactionUpdatedEventArgs,
  parsePostReactionDeletedEventArgs,
  parseProfileUpdatedEventArgs,
  parseSpaceFollowedEventArgs,
  parseSpaceUnfollowedEventArgs,
  parseSpaceOwnershipTransferAcceptedEventArgs,
  parseAccountFollowedEventArgs,
  parseAccountUnfollowedEventArgs,
  parseDomainRegisteredEventArgs,
  parseDomainMetaUpdatedEventArgs
} from './events';

import {
  parsePostCreatedCallArgs,
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
    parsePostCreatedEventArgs,
    parsePostUpdatedEventArgs,
    parsePostMovedEventArgs,
    parseSpaceCreatedEventArgs,
    parseSpaceUpdatedEventArgs,
    parsePostReactionCreatedEventArgs,
    parsePostReactionUpdatedEventArgs,
    parsePostReactionDeletedEventArgs,
    parseProfileUpdatedEventArgs,
    parseSpaceFollowedEventArgs,
    parseSpaceUnfollowedEventArgs,
    parseSpaceOwnershipTransferAcceptedEventArgs,
    parseAccountFollowedEventArgs,
    parseAccountUnfollowedEventArgs,
    parseDomainRegisteredEventArgs,
    parseDomainMetaUpdatedEventArgs
  },
  calls: {
    parsePostCreatedCallArgs,
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
