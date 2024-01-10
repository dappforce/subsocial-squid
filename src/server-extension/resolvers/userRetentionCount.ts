import { Arg, Query, Resolver, Int } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Post } from '../../model';
import assert from 'assert';
import { getUserRetentionCountQuery } from '../query/userRetentionCountFull';
import { UserRetentionCountFullModel } from '../models/userRetentionCountFull.model';

@Resolver()
export class UserRetentionCountResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => UserRetentionCountFullModel, { nullable: false })
  async userRetentionCount(
    @Arg('full_query_range_from', { nullable: false })
    fullQueryRangeFrom: string,

    @Arg('full_query_range_to', { nullable: false })
    fullQueryRangeTo: string,

    @Arg('first_range_from', { nullable: false })
    firstRangeFrom: string,

    @Arg('first_range_to', { nullable: false })
    firstRangeTo: string,

    @Arg('last_range_from', { nullable: false })
    lastRangeFrom: string,

    @Arg('last_range_to', { nullable: false })
    lastRangeTo: string,

    @Arg('total_min_posts_number', () => Int, { nullable: false })
    totalMinPostsNumber: number,

    @Arg('first_range_min_posts_number', () => Int, { nullable: false })
    firstRangeMinPostsNumber: number,

    @Arg('last_range_min_posts_number', () => Int, { nullable: false })
    lastRangeMinPostsNumber: number,

    @Arg('exclude_body', () => [String], { nullable: true, defaultValue: [] })
    excludeBody: string[]
  ): Promise<UserRetentionCountFullModel> {
    assert(
      new Date(fullQueryRangeTo).getTime() -
        new Date(fullQueryRangeFrom).getTime() <=
        31536000000,
      'Full query range can not be wider than a week'
    );

    const placeholdersExclude = excludeBody.map((_, index) => `$${index + 10}`);

    const query = getUserRetentionCountQuery(placeholdersExclude.join(','));

    const result: UserRetentionCountFullModel = await this.genericChartQuery(
      query,
      [
        fullQueryRangeFrom,
        fullQueryRangeTo,
        firstRangeFrom,
        firstRangeTo,
        lastRangeFrom,
        lastRangeTo,
        totalMinPostsNumber,
        firstRangeMinPostsNumber,
        lastRangeMinPostsNumber,
        ...excludeBody
      ]
    );
    return result;
  }
  async genericChartQuery(
    query: string,
    params: Array<string | number>
  ): Promise<UserRetentionCountFullModel> {
    const manager = await this.tx();
    const repository = manager.getRepository(Post);

    const result: UserRetentionCountFullModel = (
      await repository.query(query, params)
    )[0];
    return result;
  }
}
