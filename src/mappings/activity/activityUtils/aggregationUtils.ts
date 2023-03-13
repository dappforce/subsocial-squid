import assert from 'assert';
import { Not } from 'typeorm';
import { FindManyOptions } from '@subsquid/typeorm-store/src/store';
import { Account, Space, Post, Activity, EventName } from '../../../model';
import { Ctx } from '../../../processor';

type GetAggregationCountParams = {
  eventName: EventName;
  postId: string;
  accountId: string;
  ctx: Ctx;
};

type UpdateAggregatedStatusParams = {
  eventName: EventName;
  post?: Post;
  space?: Space;
  followingAccount?: Account;
  ctx: Ctx;
};

export async function getAggregationCount(
  params: GetAggregationCountParams
): Promise<number> {
  const { eventName, postId, accountId, ctx } = params;

  return await ctx.store.count(Activity, {
    where: {
      event: eventName,
      post: { id: postId }
      // account: {
      //   id: Not(accountId)
      // }
    }
  });

  // const uniqueIds = findResult
  //   .map((actItem) => actItem.id)
  //   .filter((val, i, arr) => arr.indexOf(val) === i);
}

export async function updateAggregatedStatus(
  params: UpdateAggregatedStatusParams
): Promise<void> {
  const {
    eventName: event,
    post = null,
    space = null,
    followingAccount = null,
    ctx
  } = params;

  let findOptions: FindManyOptions | null = null;

  if (post) {
    findOptions = {
      where: {
        event,
        post: {
          id: post.id
        },
        aggregated: true
      }
    };
  }
  if (space && space.id) {
    findOptions = {
      where: {
        event,
        space: {
          id: space.id
        },
        aggregated: true
      }
    };
  }
  if (followingAccount && followingAccount.id) {
    findOptions = {
      where: {
        event,
        followingAccount: {
          id: followingAccount.id
        },
        aggregated: true
      }
    };
  }
  if (!findOptions) return;
  const activities = (await ctx.store.find(
    Activity,
    findOptions
  )) as Activity[];
  const activitiesUpdated = [];

  for (const activityItem of activities) {
    activityItem.aggregated = false;
    activitiesUpdated.push(activityItem);
  }

  await ctx.store.save(activitiesUpdated);
}
