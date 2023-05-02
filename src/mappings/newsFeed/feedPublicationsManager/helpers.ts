import {
  Account,
  Activity,
  NewsFeed,
  Space,
  Post,
  AccountFollowers,
  SpaceFollowers,
  EventName
} from '../../../model';
import { getNewsFeedEntityId } from '../../../common/utils';
import { Ctx } from '../../../processor';
import { getOrCreateAccount } from '../../account';
import { In, Not } from 'typeorm';

/**
 * ======= UTILS =======
 */

async function getAccountFollowers(
  accountId: string,
  ctx: Ctx
): Promise<Array<Account>> {
  return (
    await ctx.store.find(AccountFollowers, {
      where: {
        followingAccount: {
          id: accountId
        }
      },
      relations: {
        followerAccount: true
      }
    })
  ).map((accFollowerRel: AccountFollowers) => accFollowerRel.followerAccount);
}

async function getSpaceFollowers(
  spaceId: string,
  ctx: Ctx
): Promise<Array<Account>> {
  return (
    await ctx.store.find(SpaceFollowers, {
      where: { followingSpace: { id: spaceId } },
      relations: { followerAccount: true }
    })
  ).map((spaceFollowerRel: SpaceFollowers) => spaceFollowerRel.followerAccount);
}

/**
 * ======= ADD FEED PUBLICATIONS =======
 */

async function addFeedPublicationsForAccountFollowers(
  accountId: string,
  activity: Activity,
  ctx: Ctx
) {
  const feedItemsMap: Map<string, NewsFeed> = new Map();

  (await getAccountFollowers(accountId, ctx)).forEach((followerAccount) => {
    const id = getNewsFeedEntityId(followerAccount.id, activity.id);
    feedItemsMap.set(
      id,
      new NewsFeed({
        account: followerAccount,
        id,
        activity
      })
    );
  });

  await ctx.store.save([...feedItemsMap.values()]);
}

async function addFeedPublicationsForSpaceFollowers(
  post: Post,
  activity: Activity,
  ctx: Ctx
) {
  if (!post.space) return;
  const feedItemsMap: Map<string, NewsFeed> = new Map();

  (await getSpaceFollowers(post.space.id, ctx))
    .filter((follower) => follower.id !== post.ownedByAccount.id)
    .forEach((followerAccount) => {
      const id = getNewsFeedEntityId(followerAccount.id, activity.id);
      feedItemsMap.set(
        id,
        new NewsFeed({
          account: followerAccount,
          id,
          activity
        })
      );
    });

  await ctx.store.save([...feedItemsMap.values()]);
}

/**
 * ======= DELETE FEED PUBLICATIONS =======
 */

export const deleteAllSpacePostsFromSpaceFollower = async (
  spaceId: string,
  followerAccountId: string,
  ctx: Ctx
): Promise<void> => {
  const relatedFeedItems = await ctx.store.find(NewsFeed, {
    where: [
      {
        account: { id: followerAccountId },
        activity: {
          space: { id: spaceId },
          event: In([
            EventName.PostCreated,
            EventName.PostShared,
            EventName.PostMoved
          ])
        }
      }
    ],
    relations: {
      activity: {
        post: {
          ownedByAccount: true
        }
      }
    }
  });

  const involvedPostOwnerIds = relatedFeedItems
    .map((f) => f.activity.post?.ownedByAccount.id)
    .filter((id) => !!id);

  const accountFollowers = await ctx.store.find(AccountFollowers, {
    where: {
      followingAccount: { id: In(involvedPostOwnerIds) },
      followerAccount: { id: followerAccountId }
    },
    relations: {
      followingAccount: true
    }
  });

  const accountsToIgnore = new Set(
    accountFollowers.map((af) => af.followingAccount.id)
  );

  await ctx.store.remove(
    relatedFeedItems.filter(
      (f) =>
        f.activity.post &&
        !accountsToIgnore.has(f.activity.post.ownedByAccount.id)
    )
  );
};

// TODO add additional check to avoid redundant removes (removing wrong items in case target account has cross-following)
async function deleteAllSpacePostsFromAllSpaceFollowers(
  spaceId: string,
  ctx: Ctx
): Promise<void> {
  const followers = await getSpaceFollowers(spaceId, ctx);

  const feedsForDelete = await ctx.store.find(NewsFeed, {
    where: {
      account: { id: In(followers.map((f) => f.id)) },
      activity: {
        space: { id: spaceId },
        event: In([
          EventName.PostCreated,
          EventName.PostShared,
          EventName.PostMoved
        ])
      }
    }
  });

  await ctx.store.remove(feedsForDelete);
}

async function deleteAllAccountPostsFromAccountFollower(
  followerAccountId: string,
  followingAccountId: string,
  ctx: Ctx
): Promise<void> {
  const feedsForDelete = await ctx.store.find(NewsFeed, {
    where: {
      account: { id: followerAccountId },
      activity: {
        account: { id: followingAccountId },
        event: In([EventName.PostCreated, EventName.PostShared])
      }
    },
    relations: {
      activity: {
        space: true
      }
    }
  });

  const involvedSpaceIds = feedsForDelete
    .map((f) => f.activity.space?.id)
    .filter((id) => !!id);

  const spaceFollowers = await ctx.store.find(SpaceFollowers, {
    where: {
      followingSpace: { id: In(involvedSpaceIds) },
      followerAccount: { id: followerAccountId }
    },
    relations: {
      followingSpace: true
    }
  });

  const spacesToIgnore = new Set(
    spaceFollowers.map((sf) => sf.followingSpace.id)
  );

  await ctx.store.remove(
    feedsForDelete.filter(
      (f) => f.activity.space && !spacesToIgnore.has(f.activity.space.id)
    )
  );
}

// TODO add additional check to avoid redundant removes (removing wrong items in case target account has cross-following)
async function deleteAllAccountPostsFromAllAccountFollowers(
  accountId: string,
  ctx: Ctx
): Promise<void> {
  const followers = await getAccountFollowers(accountId, ctx);

  const feedsForDelete = await ctx.store.find(NewsFeed, {
    where: {
      account: { id: In(followers.map((f) => f.id)) },
      activity: {
        account: { id: accountId },
        event: In([EventName.PostCreated, EventName.PostShared])
      }
    }
  });

  await ctx.store.remove(feedsForDelete);
}

export const feedPublicationHelpers = {
  add: {
    one: {
      forSpaceFollowers: addFeedPublicationsForSpaceFollowers,
      forAccountFollowers: addFeedPublicationsForAccountFollowers
    }
  },
  delete: {
    all: {
      accountPosts: {
        fromAccountFollower: deleteAllAccountPostsFromAccountFollower,
        fromAllAccountFollowers: deleteAllAccountPostsFromAllAccountFollowers
      },
      spacePosts: {
        fromSpaceFollower: deleteAllSpacePostsFromSpaceFollower,
        fromAllSpaceFollowers: deleteAllSpacePostsFromAllSpaceFollowers
      }
    }
  }
};
