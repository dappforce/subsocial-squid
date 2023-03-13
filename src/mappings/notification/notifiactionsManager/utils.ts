import { NotificationHandlerParamsWithTarget } from '../types';
import { Ctx } from '../../../processor';
import { Account, EventName, Notification } from '../../../model';
import { InvalidNotificationHandlerParamsForTargetWarn } from '../common';
import { NotificationFeedTarget } from '../../../common/types';
import { FindManyOptions } from '@subsquid/typeorm-store/src/store';
import { getEntityIdFromEntityOrString } from '../../../common/utils';
import { In, Not } from 'typeorm';

export function getTargetAccForNotificationForAcc(
  params: NotificationHandlerParamsWithTarget
): Account | string | null {
  const {
    target,
    account,
    post,
    sharedPost,
    space,
    activity,
    newOwner,
    followingAccount,
    followingSpace,
    ctx
  } = params;

  let targetAccount: Account | string | null = null;

  const paramsWarning = () => {
    InvalidNotificationHandlerParamsForTargetWarn(activity.event, target, ctx);
  };
  // TODO refactor adding notifications for shared posts - add condition
  //  for Shared Event and handle both Shared and Origin post (right now here
  //  SharedPost === Post which has been shared, but not exactly new post which
  //  contains shared post and origin)
  switch (target) {
    case 'OriginPostOwner': {
      if (!post || !post.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = post.ownedByAccount;
      break;
    }
    case 'SharedPostOwner': {
      if (!sharedPost || !sharedPost.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = sharedPost.ownedByAccount;
      break;
    }
    case 'OriginPostSpaceOwner': {
      if (!post || !post.space || !post.space.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = post.space.ownedByAccount;
      break;
    }
    case 'SharedPostSpaceOwner': {
      if (
        !sharedPost ||
        !sharedPost.space ||
        !sharedPost.space.ownedByAccount
      ) {
        paramsWarning();
        break;
      }
      targetAccount = sharedPost.space.ownedByAccount;
      break;
    }
    case 'SharedPostRootPostSpaceOwner': {
      if (
        !sharedPost ||
        !sharedPost.rootPost ||
        !sharedPost.rootPost.space ||
        !sharedPost.rootPost.space.ownedByAccount
      ) {
        paramsWarning();
        break;
      }
      targetAccount = sharedPost.rootPost.space.ownedByAccount;
      break;
    }
    case 'RootPostOwner': {
      if (!post || !post.rootPost || !post.rootPost.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = post.rootPost.ownedByAccount;
      break;
    }
    case 'SharedPostRootPostOwner': {
      if (
        !sharedPost ||
        !sharedPost.rootPost ||
        !sharedPost.rootPost.ownedByAccount
      ) {
        paramsWarning();
        break;
      }
      targetAccount = sharedPost.rootPost.ownedByAccount;
      break;
    }
    case 'ParentPostOwner': {
      if (!post || !post.parentPost || !post.parentPost.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = post.parentPost.ownedByAccount;
      break;
    }
    case 'SharedPostParentPostOwner': {
      if (
        !sharedPost ||
        !sharedPost.parentPost ||
        !sharedPost.parentPost.ownedByAccount
      ) {
        paramsWarning();
        break;
      }
      targetAccount = sharedPost.parentPost.ownedByAccount;
      break;
    }
    case 'RootPostSpaceOwner': {
      if (
        !post ||
        !post.rootPost ||
        !post.rootPost.space ||
        !post.rootPost.space.ownedByAccount
      ) {
        paramsWarning();
        break;
      }
      targetAccount = post.rootPost.space.ownedByAccount;
      break;
    }
    case 'SpaceOwnerAccount': {
      if (!space || !space.ownedByAccount) {
        paramsWarning();
        break;
      }
      targetAccount = space.ownedByAccount;
      break;
    }
    case 'SpaceNewOwnerAccount': {
      if (!newOwner) {
        paramsWarning();
        break;
      }
      targetAccount = newOwner;
      break;
    }
    case 'FollowingAccount': {
      if (!followingAccount) {
        paramsWarning();
        break;
      }
      targetAccount = followingAccount;
      break;
    }
    default:
  }

  return targetAccount;
}
