import { Arg, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Post } from '../../model';
import assert from 'assert';
import { UserRetentionCountModel } from '../models/userRetentionCount.model';
import { getActiveUsersTotalCountWithFiltersQuery } from '../query/activeUsersTotalCountWithFilters';

@Resolver()
export class ActiveUsersTotalCountWithFiltersResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => UserRetentionCountModel)
  async activeUsersTotalCountWithFilters(
    @Arg('from', { nullable: false }) from: string,
    @Arg('to', { nullable: false }) to: string,
    @Arg('total_min_posts_number', { nullable: false })
    total_min_posts_number: number,
    @Arg('exclude_body', () => [String], { nullable: true, defaultValue: [] })
    exclude_body: string[]
  ): Promise<UserRetentionCountModel> {
    assert(
      new Date(to).getTime() - new Date(from).getTime() <= 31536000000,
      'range can not be wider than a week'
    );

    const placeholdersExclude = exclude_body.map((_, index) => `$${index + 4}`);

    const excludeBodyParts = exclude_body.map((i) => i.split(' ')).flat();

    const placeholdersInclude = excludeBodyParts.map((_, index) => {
      return `$${index + 4 + placeholdersExclude.length}`;
    });

    const query = getActiveUsersTotalCountWithFiltersQuery(
      placeholdersExclude.join(','),
      placeholdersInclude.join(',')
    );

    const result: UserRetentionCountModel = await this.genericChartQuery(
      query,
      [from, to, total_min_posts_number, ...exclude_body, ...excludeBodyParts]
    );
    return result;
  }
  async genericChartQuery(
    query: string,
    params: Array<string | number>
  ): Promise<UserRetentionCountModel> {
    const manager = await this.tx();
    const repository = manager.getRepository(Post);

    const result: UserRetentionCountModel = (
      await repository.query(query, params)
    )[0];
    return result;
  }
}
