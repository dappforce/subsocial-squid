import {
  IpfsPostContentSummarized,
  IpfsSpaceContentSummarized,
  PostStorageData,
  SpaceStorageData,
  DomainStorageData
} from '../common/types';

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

export const supportedIpfsContent = new Map<'post' | 'space', Set<string>>([
  [
    'post',
    new Set<string>([
      'title',
      'image',
      'link',
      'format',
      'canonical',
      'body',
      'slug',
      'tags',
      'tweet',
      'extensions',
      'inReplyTo'
    ])
  ],
  [
    'space',
    new Set<string>([
      'name',
      'email',
      'about',
      'image',
      'tags',
      'links',
      'interests'
    ])
  ]
]);
