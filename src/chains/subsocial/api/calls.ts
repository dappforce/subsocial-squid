import { calls } from '../types';
import { PostKind, ReactionKind } from '../../../model';
import { CallForDecode, EventContext } from '../../../common/types';
import {
  CreatePostCallParsedArgs,
  UpdatePostCallParsedArgs,
  MovePostCallParsedArgs,
  CreateSpaceCallParsedArgs,
  UpdateSpaceCallParsedArgs,
  PostReactionCreateCallParsedArgs,
  PostReactionUpdateCallParsedArgs,
  PostReactionDeleteCallParsedArgs,
  OwnershipTransferOwnershipCallParsedArgs,
  OwnershipAcceptPendingOwnershipCallParsedArgs,
  OwnershipRejectPendingOwnershipCallParsedArgs
} from '@subsocial/data-hub-sdk';
import {
  getEntityWithOwnershipDecorated,
  getReactionKindDecorated,
  getSpacePermissionsDecorated
} from './decorators';
import { getCallSigner, getContentSrcDecorated } from '../../utils';
import * as v13 from '../types/v13';
import { toSubsocialAddress } from '@subsocial/utils';
import { UnknownVersionError } from '../../../common/errors';
import { Event } from '../../../processor';

function ensureSpaceId(srcVal: bigint | undefined) {
  return srcVal !== null && srcVal !== undefined ? srcVal.toString() : srcVal;
}

export function parseCreatPostCallArgs(ctx: Event): CreatePostCallParsedArgs {
  // let callInst: PostsCreatePostCall | PostsForceCreatePostCall | null = null;
  const callForDecode = ctx.getCall() as CallForDecode;
  let extensionData: v13.PostExtension | null = null;
  let response: CreatePostCallParsedArgs = {
    ipfsSrc: null,
    otherSrc: null,
    none: false,
    forced: false,
    forcedData: null,
    spaceId: undefined,
    postKind: PostKind.RegularPost,
    originalPost: null,
    parentPostId: null,
    rootPostId: null
  };

  switch (ctx.call!.name) {
    case 'Posts.force_create_post': {
      if (!calls.posts.forceCreatePost.v13.is(callForDecode))
        throw Error(`Unexpected call ${ctx.call!.name}`);

      const { extension, content, spaceIdOpt, created, hidden, owner } =
        calls.posts.forceCreatePost.v13.decode(callForDecode);
      extensionData = extension;

      response = {
        ...response,
        ...getContentSrcDecorated(content),
        forced: true,
        spaceId: ensureSpaceId(spaceIdOpt),
        forcedData: {
          account: toSubsocialAddress(created.account)!,
          block: created.block,
          // time: new Date(Number.parseInt(created.time.toString())),
          time: created.time.toString(),
          owner: toSubsocialAddress(owner)!,
          hidden
        }
      };
      break;
    }

    case 'ResourceDiscussions.create_resource_discussion': {
      if (
        !calls.resourceDiscussions.createResourceDiscussion.v36.is(
          callForDecode
        )
      )
        throw Error(`Unexpected call ${ctx.call!.name}`);

      const { content, spaceId, resourceId } =
        calls.resourceDiscussions.createResourceDiscussion.v36.decode(
          callForDecode
        );
      extensionData = { __kind: 'RegularPost' };

      response = {
        ...response,
        ...getContentSrcDecorated(content),
        spaceId: ensureSpaceId(spaceId)
      };
      break;
    }

    default: {
      if (!calls.posts.createPost.v13.is(callForDecode))
        throw Error(`Unexpected call ${ctx.call!.name}`);

      const { extension, content, spaceIdOpt } =
        calls.posts.createPost.v13.decode(callForDecode);

      extensionData = extension;
      response = {
        ...response,
        ...getContentSrcDecorated(content),
        spaceId: ensureSpaceId(spaceIdOpt)
      };
    }
  }

  response.postKind = PostKind[extensionData.__kind];
  switch (extensionData.__kind) {
    case PostKind.Comment:
      response.rootPostId = extensionData.value.rootPostId
        ? extensionData.value.rootPostId.toString()
        : null;
      if (response.rootPostId)
        response.parentPostId = extensionData.value.parentId
          ? extensionData.value.parentId.toString()
          : null;
      break;
    case PostKind.SharedPost:
      response.originalPost = extensionData.value.toString();
      break;
    default:
  }

  return response;
}

export function parsePostUpdatedCallArgs(
  ctx: EventContext
): UpdatePostCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.posts.updatePost.v13.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const {
    update: { spaceId, content, hidden },
    postId
  } = calls.posts.updatePost.v13.decode(callForDecode);

  return {
    ...getContentSrcDecorated(content),
    spaceId:
      spaceId !== null && spaceId !== undefined ? spaceId.toString() : spaceId,
    postId: postId.toString(),
    hidden
  };
}

export function parsePostMoveCallArgs(
  ctx: EventContext
): MovePostCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.posts.movePost.v13.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const { postId, newSpaceId } = calls.posts.movePost.v13.decode(callForDecode);

  return {
    toSpace:
      newSpaceId !== null && newSpaceId !== undefined
        ? newSpaceId.toString()
        : newSpaceId,
    postId: postId.toString()
  };
}

export function parseSpaceCreateCallArgs(
  ctx: EventContext
): CreateSpaceCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  let response: CreateSpaceCallParsedArgs = {
    ipfsSrc: null,
    otherSrc: null,
    none: false,
    forced: false,
    forcedData: null,
    permissions: getSpacePermissionsDecorated()
  };

  switch (ctx.call!.name) {
    case 'Spaces.force_create_space': {
      if (!calls.spaces.forceCreateSpace.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { spaceId, created, owner, hidden, content, permissionsOpt } =
        calls.spaces.forceCreateSpace.v13.decode(callForDecode);

      response = {
        ...response,
        ...getContentSrcDecorated(content),
        forced: true,
        forcedData: {
          account: toSubsocialAddress(created.account)!,
          block: created.block,
          // time: new Date(Number.parseInt(created.time.toString())),
          time: created.time.toString(),
          owner: toSubsocialAddress(owner)!,
          hidden
        },
        permissions: getSpacePermissionsDecorated(permissionsOpt)
      };
      break;
    }
    case 'Profiles.create_space_as_profile': {
      if (!calls.profiles.createSpaceAsProfile.v19.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { content } =
        calls.profiles.createSpaceAsProfile.v19.decode(callForDecode);
      response = {
        ...response,
        ...getContentSrcDecorated(content)
      };
      break;
    }
    default: {
      if (!calls.spaces.createSpace.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { content, permissionsOpt } =
        calls.spaces.createSpace.v13.decode(callForDecode);

      response = {
        ...response,
        ...getContentSrcDecorated(content),
        permissions: getSpacePermissionsDecorated(permissionsOpt)
      };
    }
  }
  return response;
}

export function parseSpaceUpdateCallArgs(
  ctx: EventContext
): UpdateSpaceCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.spaces.updateSpace.v13.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const {
    update: { content, permissions, hidden }
  } = calls.spaces.updateSpace.v13.decode(callForDecode);

  return {
    ...getContentSrcDecorated(content),
    permissions: getSpacePermissionsDecorated(
      permissions.__kind === 'Some' ? permissions.value : undefined
    ),
    hidden: hidden ?? false
  };
}

export function parsePostReactionCreateCallArgs(
  ctx: EventContext
): PostReactionCreateCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  let response: PostReactionCreateCallParsedArgs = {
    forced: false,
    forcedData: null,
    reactionKind: ReactionKind.Upvote,
    postId: ''
  };

  switch (ctx.call!.name) {
    case 'Reactions.force_create_post_reaction': {
      if (!calls.reactions.forceCreatePostReaction.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { who, postId, reactionId, reactionKind, created } =
        calls.reactions.forceCreatePostReaction.v13.decode(callForDecode);

      response = {
        ...response,
        forced: true,
        forcedData: {
          account: toSubsocialAddress(created.account)!,
          block: created.block,
          time: new Date(Number.parseInt(created.time.toString()))
        },
        reactionKind: getReactionKindDecorated(reactionKind),
        postId: postId.toString()
      };
      break;
    }
    default: {
      if (!calls.reactions.createPostReaction.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { postId, kind } =
        calls.reactions.createPostReaction.v13.decode(callForDecode);

      response = {
        ...response,
        reactionKind: getReactionKindDecorated(kind),
        postId: postId.toString()
      };
    }
  }

  return response;
}

export function parsePostReactionUpdateCallArgs(
  ctx: EventContext
): PostReactionUpdateCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.reactions.updatePostReaction.v13.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const { postId, reactionId, newKind } =
    calls.reactions.updatePostReaction.v13.decode(callForDecode);

  return {
    newReactionKind: getReactionKindDecorated(newKind),
    postId: postId.toString(),
    reactionId: reactionId.toString()
  };
}

export function parsePostReactionDeleteCallArgs(
  ctx: EventContext
): PostReactionDeleteCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;
  let response: PostReactionDeleteCallParsedArgs = {
    forced: false,
    forcedData: null,
    reactionId: '',
    postId: ''
  };

  switch (ctx.call!.name) {
    case 'Reactions.force_delete_post_reaction': {
      if (!calls.reactions.forceDeletePostReaction.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { who, postId, reactionId } =
        calls.reactions.forceDeletePostReaction.v13.decode(callForDecode);

      response = {
        ...response,
        forced: true,
        forcedData: {
          account: toSubsocialAddress(who)!
        },
        reactionId: reactionId.toString(),
        postId: postId.toString()
      };
      break;
    }
    default: {
      if (!calls.reactions.deletePostReaction.v13.is(callForDecode))
        throw new UnknownVersionError(ctx.name);

      const { postId, reactionId } =
        calls.reactions.deletePostReaction.v13.decode(callForDecode);
      response = {
        ...response,
        reactionId: reactionId.toString(),
        postId: postId.toString()
      };
    }
  }

  return response;
}

export function parseOwnershipTransferOwnershipCallArgs(
  ctx: EventContext
): OwnershipTransferOwnershipCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.ownership.transferOwnership.v42.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const { entity, newOwner } =
    calls.ownership.transferOwnership.v42.decode(callForDecode);

  console.log('parseOwnershipTransferOwnershipCallArgs :: entity');
  console.dir(entity, { depth: null });
  console.dir(getEntityWithOwnershipDecorated(entity), { depth: null });

  return {
    transferToAccountId: toSubsocialAddress(newOwner)!,
    entity: getEntityWithOwnershipDecorated(entity)
  };
}

export function parseOwnershipAcceptPendingOwnershipCallArgs(
  ctx: EventContext
): OwnershipAcceptPendingOwnershipCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.ownership.acceptPendingOwnership.v42.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const { entity } =
    calls.ownership.acceptPendingOwnership.v42.decode(callForDecode);

  console.log('parseOwnershipAcceptPendingOwnershipCallArgs :: entity');
  console.dir(entity, { depth: null });
  console.dir(getEntityWithOwnershipDecorated(entity), { depth: null });

  return {
    entity: getEntityWithOwnershipDecorated(entity)
  };
}

export function parseOwnershipRejectPendingOwnershipCallArgs(
  ctx: EventContext
): OwnershipRejectPendingOwnershipCallParsedArgs {
  const callForDecode = ctx.getCall() as CallForDecode;

  if (!calls.ownership.rejectPendingOwnership.v42.is(callForDecode))
    throw new UnknownVersionError(ctx.name);

  const { entity } =
    calls.ownership.rejectPendingOwnership.v42.decode(callForDecode);

  console.log('parseOwnershipRejectPendingOwnershipCallArgs :: entity');
  console.dir(entity, { depth: null });
  console.dir(getEntityWithOwnershipDecorated(entity), { depth: null });

  return {
    entity: getEntityWithOwnershipDecorated(entity)
  };
}
