import { Post, Space } from '../model';
import {
  ElasticPostDoc,
  ElasticSpaceDoc,
  ElasticQueryParams,
  ElasticIndexTypes
} from '@subsocial/elasticsearch/types';

export type ESContentData<E> = E extends Post
  ? ElasticPostDoc
  : E extends Space
  ? ElasticSpaceDoc
  : never;

export type ESEntityTypeName = 'post' | 'space';

export type ElasticQueryParamsWithSpaceId = ElasticQueryParams & {
  spaceId?: string;
};

export type ElasticQueryParamsWithSpaceIdRaw = {
  indexes?: ElasticIndexTypes[];
  q?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  spaceId?: string;
};

type ErrorType =
  | string
  | {
      status: string;
      data: string;
    };

export type OkOrError<T = null> = {
  ok: boolean;
  errors?: Record<string, ErrorType>;
  data?: T;
};
