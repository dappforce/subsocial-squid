import {
  Arg,
  Args,
  Query,
  registerEnumType,
  Resolver,
  ArgsType,
  Field,
  Int
} from 'type-graphql';
import { Min, Max } from 'class-validator';
import type { EntityManager } from 'typeorm';
import { ElasticSearchQueryResultEntity } from '../models/elasticSearchQuery.model';
import assert from 'assert';
import { ElasticSearchManager } from '../../elasticsearch';

export enum ElasticSearchIndexType {
  all = 'all',
  profiles = 'profiles',
  spaces = 'spaces',
  posts = 'posts'
}

registerEnumType(ElasticSearchIndexType, {
  name: 'ElasticSearchIndexType'
});

@ArgsType()
class SearchQueryArgs {
  @Field({ nullable: true, description: 'Query value' })
  q?: string;

  @Field({
    nullable: true,
    description: 'Space ID what content will be searched in.'
  })
  spaceId?: string;

  @Field(() => [String], {
    nullable: true,
    description: 'Tags for filtering. Can be array of string tags values.'
  })
  tags?: string[];

  @Field(() => Int, { nullable: true, description: 'Results per page limit.' })
  @Min(1)
  limit?: number;

  @Field(() => Int, { nullable: true, description: 'Offset of results list.' })
  offset?: number;

  @Field(() => [ElasticSearchIndexType], {
    nullable: false,
    defaultValue: [ElasticSearchIndexType.all],
    description: `Can contain next values: all, profiles, spaces, posts.`
  })
  indexes?: ElasticSearchIndexType[];
}

@Resolver()
export class ElasticSearchQueryResolver {
  @Query(() => ElasticSearchQueryResultEntity)
  async searchQuery(
    @Args() { q, spaceId, tags, limit, offset, indexes }: SearchQueryArgs
  ): Promise<ElasticSearchQueryResultEntity> {
    const searchResult = await ElasticSearchManager.search().query({
      q,
      spaceId,
      indexes,
      limit,
      offset,
      tags
    });

    if (!searchResult.ok || (searchResult.ok && !searchResult.data))
      return {
        hits: [],
        total: {
          totalResults: 0,
          maxScore: 0,
          offset: offset ?? 0,
          limit: limit ?? 0
        },
        err: searchResult.err
      };

    return {
      hits: searchResult.data!.hits,
      total: {
        totalResults: searchResult.data!.totalResults ?? 0,
        maxScore: searchResult.data!.maxScore ?? 0,
        offset: offset ?? 0,
        limit: searchResult.data!.perPageLimit ?? 0
      }
    };
  }
}
