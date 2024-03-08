import {
  PostStorageData,
  SpaceStorageData,
  DomainStorageData
} from '../common/types';

import {
  IpfsPostContentSummarized,
  IpfsSpaceContentSummarized,
} from '@subsocial/data-hub-sdk';

export type StorageSection = 'space' | 'post' | 'domain';
export type BlochHash = string;
export type EntityId = string;

export type StorageData<T> = T extends 'space'
  ? SpaceStorageData
  : T extends 'post'
  ? PostStorageData
  : T extends 'domain'
  ? DomainStorageData
  : never;

export type IpfsContent<T> = T extends 'space'
  ? IpfsSpaceContentSummarized
  : T extends 'post'
  ? IpfsPostContentSummarized
  : never;
