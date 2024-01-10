import { Arg, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Post } from '../../model';
import { getActiveUsersTotalCountQuery } from '../query/activeUsersTotalCount';
import assert from 'assert';
import { ActiveUsersTotalCount } from '../models/activeUsersTotalCount.model';

@Resolver()
export class ActiveUsersCountResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => ActiveUsersTotalCount)
  async activeUsersTotalCount(
    @Arg('from', { nullable: false }) from: string,
    @Arg('to', { nullable: false }) to: string
  ): Promise<ActiveUsersTotalCount> {
    assert(
      new Date(to).getTime() - new Date(from).getTime() <= 31536000000,
      'range can not be wider than a week'
    );
    const query = getActiveUsersTotalCountQuery();

    const result: ActiveUsersTotalCount = await this.genericChartQuery(query, [
      from,
      to
    ]);
    return result;
  }

  async genericChartQuery(
    query: string,
    params: Array<string>
  ): Promise<ActiveUsersTotalCount> {
    const manager = await this.tx();
    const repository = manager.getRepository(Post);

    const result: ActiveUsersTotalCount = (
      await repository.query(query, params)
    )[0];
    return result;
  }
}
