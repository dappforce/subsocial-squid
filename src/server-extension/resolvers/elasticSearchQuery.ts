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
  @Field({ nullable: true })
  q?: string;

  @Field({ nullable: true })
  spaceId?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => Int, { nullable: true })
  @Min(1)
  limit?: number;

  @Field(() => Int, { nullable: true })
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
  async elasticSearchQuery(
    @Args() { q, spaceId, tags, limit, offset, indexes }: SearchQueryArgs
  ): Promise<ElasticSearchQueryResultEntity> {
    console.log('tags >>>');
    console.dir(tags, { depth: null });

    console.log('indexes >>>');
    console.dir(indexes, { depth: null });

    console.log('limit >>>');
    console.dir(limit, { depth: null });

    console.log('offset >>>');
    console.dir(offset, { depth: null });

    console.log('spaceId >>>');
    console.dir(spaceId, { depth: null });

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
        total: { totalRecords: 0, maxScore: 0, offset: offset ?? 0 }
      };

    return {
      hits: searchResult.data!.hits,
      total: {
        totalRecords: searchResult.data!.totalRecords,
        maxScore: searchResult.data!.maxScore,
        offset: offset ?? 0
      }
    };
  }
}
