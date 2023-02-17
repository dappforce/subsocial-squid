import {
  ElasticQueryParamsWithSpaceId,
  ElasticQueryParamsWithSpaceIdRaw
} from './types';
import {
  ElasticIndexTypes,
  ElasticIndex,
  AllElasticIndexes,
  ElasticFields
} from '@subsocial/elasticsearch/types';
import {
  nonEmptyStr,
  nonEmptyArr,
  parseNumStr,
  isEmptyArray
} from '@subsocial/utils';
import { getChain } from '../chains';

const chainConfig = getChain();
const maxResultLimit: number =
  parseNumStr(chainConfig.config.elasticSearchMaxResultLimit) || 20;

export function getNumberOrDef(def: number, src: string | undefined) {
  return nonEmptyStr(src) ? parseNumStr(src) : def;
}

const resolveElasticIndexByType = (type: ElasticIndexTypes) =>
  ElasticIndex[type];

const resolveElasticIndexes = (indexes: ElasticIndexTypes[] | undefined) => {
  if (!indexes) return AllElasticIndexes;
  return indexes && indexes.includes('all')
    ? AllElasticIndexes
    : indexes?.map(resolveElasticIndexByType);
};

export const buildElasticSearchQuery = (
  params: ElasticQueryParamsWithSpaceId
) => {
  const indexes = resolveElasticIndexes(params.indexes);
  const q = params.q || '*';
  const spaceId = params.spaceId;
  const tags = params.tags || [];
  const from = params.offset || 0;
  const size = params.limit || maxResultLimit;

  // TODO: support sorting of results

  const baseSearchProps = {
    index: indexes,
    from: from,
    size: size
  };

  const tagFields = [ElasticFields.space.tags, ElasticFields.post.tags];

  const searchFields = [
    `${ElasticFields.space.name}^3`,
    `${ElasticFields.space.handle}^2`,
    `${ElasticFields.space.about}^1`,
    `${ElasticFields.space.tags}^2`,

    `${ElasticFields.post.title}^3`,
    `${ElasticFields.post.body}^1`,
    `${ElasticFields.post.tags}^2`,

    `${ElasticFields.comment.body}^2`
  ];

  const isEmptyQuery = q === '*' || q.trim() === '';

  const spaceIdQuery = spaceId
    ? {
        match: {
          spaceId
        }
      }
    : {
        match_all: {}
      };

  const searchQueryPart = isEmptyQuery
    ? {
        match_all: {}
      }
    : {
        query_string: {
          query: `*${q}*`,
          fields: searchFields
        }
      };

  const tagFilterQueryPart = !isEmptyArray(tags)
    ? {
        terms: {
          ...(() => {
            const tagsScope: Record<string, Array<string>> = {};
            for (const tagF of tagFields) {
              tagsScope[tagF] = tags.map((t) => t.toLowerCase());
            }
            return tagsScope;
          })()
        }
      }
    : null;

  const searchBody = !tagFilterQueryPart
    ? {
        bool: {
          must: [searchQueryPart, spaceIdQuery]
        }
      }
    : {
        bool: {
          must: searchQueryPart,
          filter: tagFilterQueryPart
        }
      };

  const searchReq = {
    ...baseSearchProps,
    body: {
      query: searchBody
    }
  };

  // log.debug('Final ElasticSearch query:', searchReq);
  console.log('searchReq >>>');
  console.dir(searchReq, { depth: null });

  return searchReq;
};

export function getElasticQueryParamsDecorated(
  rawParams: ElasticQueryParamsWithSpaceIdRaw
): ElasticQueryParamsWithSpaceId {
  const { indexes, q, tags, spaceId, offset, limit } = rawParams;

  if (!indexes) throw new Error('indexes are not provided');
  return {
    indexes: toArray(indexes),
    spaceId,
    q: q ? q.toString() : undefined,
    tags: tags ? toArray(tags) : undefined,
    offset: offset ?? 0,
    limit: limit ?? maxResultLimit
  };
}

export function toArray<T extends string>(
  maybeArr: T | Array<T>
): Array<T> | undefined {
  if (nonEmptyArr(maybeArr)) {
    return maybeArr;
  } else if (nonEmptyStr(maybeArr)) {
    return [maybeArr];
  } else {
    return undefined;
  }
}
