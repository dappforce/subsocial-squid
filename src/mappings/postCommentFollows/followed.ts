import {
  Post,
  Account,
  EventName,
  CommentFollowers,
  PostFollowers, Activity
} from '../../model';
import { processPostFollowingUnfollowingRelations } from './common';
import { Ctx } from '../../processor';
import { getOrCreateAccount } from '../account';
import { PostFollowedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import {
  getPostFollowersEntityId,
  getSyntheticEventName
} from '../../common/utils';
import { setActivity } from '../activity';
import { NotificationsManager } from '../notification/notifiactionsManager';

// export async function postFollowed(post: Post, ctx: Ctx): Promise<void> {
//   const postUpdated = post;
//   const ownerAccount = await getOrCreateAccount(post.ownedByAccount.id, ctx);
//
//   await processPostFollowingUnfollowingRelations(
//     post,
//     ownerAccount,
//     EventName.PostFollowed,
//     ctx
//   );
//
//   postUpdated.followersCount += 1;
//   ownerAccount.followingPostsCount += 1;
//
//   await ctx.store.save(postUpdated);
//   await ctx.store.save(ownerAccount);
// }

export async function postFollowed(
  ctx: Ctx,
  eventData: PostFollowedData
): Promise<void> {
  const followerAccount = await getOrCreateAccount(eventData.followerId, ctx);
  const post = await getEntityWithRelations.post({
    postId: eventData.postId,
    ctx
  });

  if (!post) {
    new EntityProvideFailWarning(Post, eventData.postId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const postFollowersEntityId = getPostFollowersEntityId(
    eventData.followerId,
    post.id
  );

  if (post.isComment) {
    await ctx.store.save(
      new CommentFollowers({
        id: postFollowersEntityId,
        followerAccount: followerAccount,
        followingComment: post
      })
    );
  } else {
    await ctx.store.save(
      new PostFollowers({
        id: postFollowersEntityId,
        followerAccount: followerAccount,
        followingPost: post
      })
    );
  }
  post.followersCount += 1;
  followerAccount.followingPostsCount += 1;

  await ctx.store.save(post);
  await ctx.store.save(followerAccount);

  const syntheticEventName = getSyntheticEventName(
    EventName.PostFollowed,
    post
  );

  const activity = await setActivity({
    syntheticEventName,
    account: followerAccount,
    post,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    return;
  }

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: followerAccount,
      post,
      activity,
      ctx
    }
  );
}
