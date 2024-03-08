import {
  Account,
  Post,
  EventName,
  CommentFollowers,
  PostFollowers,
  Activity
} from '../../model';
import {
  ensurePositiveOrZeroValue,
  getPostFollowersEntityId,
  getSyntheticEventName
} from '../../common/utils';
import { processPostFollowingUnfollowingRelations } from './common';
import { Ctx } from '../../processor';
import { getOrCreateAccount } from '../account';
import { PostFollowedData, PostUnfollowedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { setActivity } from '../activity';
import { NotificationsManager } from '../notification/notifiactionsManager';

export async function postUnfollowed(
  ctx: Ctx,
  eventCallData: PostUnfollowedData
): Promise<void> {
  const { eventData, callData } = eventCallData;
  const followerAccount = await getOrCreateAccount(
    eventData.params.followerId,
    ctx
  );
  const post = await getEntityWithRelations.post({
    postId: eventData.params.postId,
    ctx
  });

  if (!post) {
    new EntityProvideFailWarning(
      Post,
      eventData.params.postId,
      ctx,
      eventData.metadata
    );
    throw new CommonCriticalError();
  }

  const postFollowersEntityId = getPostFollowersEntityId(
    eventData.params.followerId,
    post.id
  );

  // if (post.isComment) {
  //   await ctx.store.save(
  //     new CommentFollowers({
  //       id: postFollowersEntityId,
  //       followerAccount: followerAccount,
  //       followingComment: post
  //     })
  //   );
  // } else {
  //   await ctx.store.save(
  //     new PostFollowers({
  //       id: postFollowersEntityId,
  //       followerAccount: followerAccount,
  //       followingPost: post
  //     })
  //   );
  // }
  // post.followersCount += 1;
  // followerAccount.followingPostsCount += 1;
  //
  // await ctx.store.save(post);
  // await ctx.store.save(followerAccount);

  let existingRelation = null;
  if (post.isComment) {
    existingRelation = await ctx.store.get(
      CommentFollowers,
      postFollowersEntityId
    );
  } else {
    existingRelation = await ctx.store.get(
      PostFollowers,
      postFollowersEntityId
    );
  }
  if (!existingRelation) return;

  await ctx.store.remove(existingRelation);
  post.followersCount = ensurePositiveOrZeroValue(post.followersCount - 1);
  followerAccount.followingPostsCount = ensurePositiveOrZeroValue(
    followerAccount.followingPostsCount - 1
  );

  await ctx.store.save(post);
  await ctx.store.save(followerAccount);

  const syntheticEventName = getSyntheticEventName(
    EventName.PostUnfollowed,
    post
  );

  const activity = await setActivity({
    syntheticEventName,
    account: followerAccount,
    post,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
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
