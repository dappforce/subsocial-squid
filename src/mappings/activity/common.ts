import {
  Account,
  Space,
  Post,
  Activity,
  Reaction,
  EventName,
  ContentExtension
} from '../../model';
import { getActivityEntityId, decorateEventName } from '../../common/utils';
import { getOrCreateAccount } from '../account';
import * as insertActivityData from './activityUtils';
import { Ctx } from '../../processor';
import { EventData } from '../../common/types';

export const setActivity = async ({
  account,
  ctx,
  eventData,
  space,
  oldOwner,
  newOwner,
  post,
  extension,
  spacePrev,
  reaction,
  followingAccount,
  syntheticEventName,
  username,
  contentExtensionIndex
}: {
  account: Account | string;
  ctx: Ctx;
  eventData: EventData;
  space?: Space;
  spacePrev?: Space;
  oldOwner?: Account;
  newOwner?: Account;
  post?: Post;
  extension?: ContentExtension;
  reaction?: Reaction;
  followingAccount?: Account;
  syntheticEventName?: EventName;
  username?: string;
  contentExtensionIndex?: number;
}): Promise<Activity | null> => {
  const { indexInBlock, name: eventName, blockNumber, timestamp } = eventData;

  const eventNameDecorated =
    EventName[
      syntheticEventName ||
        (decorateEventName(eventName) as keyof typeof EventName)
    ];

  const accountInst =
    account instanceof Account
      ? account
      : await getOrCreateAccount(account, ctx);

  let activity = new Activity({
    id: getActivityEntityId(
      blockNumber.toString(),
      indexInBlock.toString(),
      eventNameDecorated,
      contentExtensionIndex
    ),
    account: accountInst,
    blockNumber: BigInt(blockNumber.toString()),
    eventIndex: indexInBlock,
    event: eventNameDecorated,

    date: timestamp,
    aggregated: false,
    aggCount: BigInt(0)
  });

  /**
   * ProfileUpdated
   */
  if (eventNameDecorated === EventName.ProfileUpdated) {
    activity = await insertActivityData.insertActivityForAccountCreatedUpdated({
      activity
    });
  }

  /**
   * AccountFollowed
   * AccountUnfollowed
   */
  if (
    (eventNameDecorated === EventName.AccountFollowed ||
      eventNameDecorated === EventName.AccountUnfollowed) &&
    followingAccount
  ) {
    activity =
      await insertActivityData.insertActivityForAccountFollowedUnfollowed({
        followingAccount,
        activity,
        ctx
      });
  }
  /**
   * PostCreated
   * PostUpdated
   * CommentCreated
   * CommentUpdated
   * CommentReplyCreated
   * CommentReplyUpdated
   */
  if (
    (eventNameDecorated === EventName.PostCreated ||
      eventNameDecorated === EventName.CommentCreated ||
      eventNameDecorated === EventName.CommentReplyCreated ||
      eventNameDecorated === EventName.PostUpdated ||
      eventNameDecorated === EventName.CommentUpdated ||
      eventNameDecorated === EventName.CommentReplyUpdated) &&
    post
  )
    activity = await insertActivityData.insertActivityForPostCreated({
      post,
      activity,
      ctx
    });

  /**
   * PostMoved
   */
  if (eventNameDecorated === EventName.PostMoved && post) {
    activity = await insertActivityData.insertActivityForPostMoved({
      spacePrev: spacePrev ?? null,
      post,
      activity,
      ctx
    });
  }
  /**
   * PostDeleted
   * CommentDeleted
   * CommentReplyDeleted
   */
  if (
    (eventNameDecorated === EventName.PostDeleted ||
      eventNameDecorated === EventName.CommentDeleted ||
      eventNameDecorated === EventName.CommentReplyDeleted) &&
    post
  ) {
    activity = await insertActivityData.insertActivityForPostDeleted({
      post,
      activity,
      ctx
    });
  }

  /**
   * PostShared
   * CommentShared
   * CommentReplyShared
   */
  if (
    (eventNameDecorated === EventName.PostShared ||
      eventNameDecorated === EventName.CommentShared ||
      eventNameDecorated === EventName.CommentReplyShared) &&
    post
  ) {
    activity = await insertActivityData.insertActivityForPostShared({
      post,
      activity,
      ctx
    });
  }

  /**
   * PostFollowed
   * PostUnfollowed
   * CommentFollowed
   * CommentUnfollowed
   */
  if (
    (eventNameDecorated === EventName.PostFollowed ||
      eventNameDecorated === EventName.PostUnfollowed ||
      eventNameDecorated === EventName.CommentFollowed ||
      eventNameDecorated === EventName.CommentUnfollowed) &&
    post
  ) {
    activity = await insertActivityData.insertActivityForPostFollowedUnfollowed(
      {
        post,
        activity,
        ctx
      }
    );
  }

  /**
   * PostReactionCreated
   * PostReactionUpdated
   * PostReactionDeleted
   */
  if (
    (eventNameDecorated === EventName.PostReactionCreated ||
      eventNameDecorated === EventName.CommentReactionCreated ||
      eventNameDecorated === EventName.CommentReplyReactionCreated ||
      eventNameDecorated === EventName.PostReactionDeleted ||
      eventNameDecorated === EventName.CommentReactionDeleted ||
      eventNameDecorated === EventName.CommentReplyReactionDeleted ||
      eventNameDecorated === EventName.PostReactionUpdated ||
      eventNameDecorated === EventName.CommentReactionUpdated ||
      eventNameDecorated === EventName.CommentReplyReactionUpdated) &&
    post &&
    reaction
  ) {
    activity = await insertActivityData.insertActivityForPostReaction({
      post,
      reaction,
      activity,
      ctx
    });
  }

  /**
   * SpaceCreated
   * SpaceUpdated
   */
  if (
    (eventNameDecorated === EventName.SpaceCreated ||
      eventNameDecorated === EventName.SpaceUpdated) &&
    space
  ) {
    activity = await insertActivityData.insertActivityForSpaceCreatedUpdated({
      space,
      activity,
      ctx
    });
  }

  /**
   * SpaceFollowed
   * SpaceUnfollowed
   */
  if (
    (eventNameDecorated === EventName.SpaceFollowed ||
      eventNameDecorated === EventName.SpaceUnfollowed) &&
    space
  ) {
    activity =
      await insertActivityData.insertActivityForSpaceFollowedUnfollowed({
        space,
        activity,
        ctx
      });
  }

  /**
   * SpaceOwnershipTransferCreated
   */
  if (
    eventNameDecorated === EventName.SpaceOwnershipTransferCreated &&
    newOwner &&
    account &&
    space
  ) {
    activity =
      await insertActivityData.insertActivityForSpaceOwnershipTransferCreated({
        space,
        newOwner,
        activity,
        ctx
      });
  }

  /**
   * SpaceOwnershipTransferAccepted
   */
  if (
    eventNameDecorated === EventName.SpaceOwnershipTransferAccepted &&
    oldOwner &&
    space
  ) {
    activity =
      await insertActivityData.insertActivityForSpaceOwnershipTransferAccepted({
        space,
        oldOwner,
        activity,
        ctx
      });
  }

  /**
   * UserNameRegistered
   * UserNameUpdated
   */
  if (
    (eventNameDecorated === EventName.UserNameRegistered ||
      eventNameDecorated === EventName.UserNameUpdated) &&
    username
  ) {
    activity =
      await insertActivityData.insertActivityForUsernameRegisteredUpdated({
        space,
        spacePrev,
        username,
        activity
      });
  }

  /**
   * ExtensionDonationCreated
   */
  if (
    (eventNameDecorated === EventName.ExtensionDonationCreated ||
      eventNameDecorated === EventName.ExtensionEvmNftShared ||
      eventNameDecorated === EventName.ExtensionImageCreated ||
      eventNameDecorated === EventName.ExtensionPinnedPostsCreated ||
      eventNameDecorated === EventName.ExtensionSecretBoxCreated) &&
    extension &&
    post
  ) {
    activity =
      await insertActivityData.insertActivityForContentExtensionCreated({
        post,
        extension,
        activity
      });
  }

  await ctx.store.save(activity);
  return activity;
};
