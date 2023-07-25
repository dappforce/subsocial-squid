import { SpacePermissionsScope } from '../../../common/types';
import { SpacePermissionMap } from '@subsocial/api/types/dto';
import * as v2300 from '../types/v2300';
import { ReactionKind } from '../../../model';

function getSpacePermissionsTpl(): Required<SpacePermissionMap> {
  return {
    ManageRoles: false,
    RepresentSpaceInternally: false,
    RepresentSpaceExternally: false,
    UpdateSpace: false,
    CreateSubspaces: false,
    UpdateOwnSubspaces: false,
    DeleteOwnSubspaces: false,
    HideOwnSubspaces: false,
    UpdateAnySubspace: false,
    DeleteAnySubspace: false,
    HideAnySubspace: false,
    CreatePosts: false,
    UpdateOwnPosts: false,
    DeleteOwnPosts: false,
    HideOwnPosts: false,
    UpdateAnyPost: false,
    DeleteAnyPost: false,
    HideAnyPost: false,
    CreateComments: false,
    UpdateOwnComments: false,
    DeleteOwnComments: false,
    HideOwnComments: false,
    HideAnyComment: false,
    Upvote: false,
    Downvote: false,
    Share: false,
    OverrideSubspacePermissions: false,
    OverridePostPermissions: false,
    SuggestEntityStatus: false,
    UpdateEntityStatus: false,
    UpdateSpaceSettings: false
  };
}

export function getSpacePermissionsDecorated(
  permissionsSrc: v2300.SpacePermissions | undefined = {
    none: undefined,
    everyone: undefined,
    follower: undefined,
    spaceOwner: undefined
  }
): SpacePermissionsScope {
  const res: SpacePermissionsScope = {
    none: getSpacePermissionsTpl(),
    everyone: getSpacePermissionsTpl(),
    follower: getSpacePermissionsTpl(),
    spaceOwner: getSpacePermissionsTpl()
  };

  if (!permissionsSrc) return res;

  for (const permSection in permissionsSrc) {
    if (!permissionsSrc[permSection as keyof v2300.SpacePermissions]) continue;
    for (const srcPermItem of permissionsSrc[
      permSection as keyof v2300.SpacePermissions
    ]!) {
      res[permSection as keyof SpacePermissionsScope][srcPermItem.__kind] =
        true;
    }
  }

  return res;
}

export function getReactionKindDecorated(
  kindSrc: v2300.ReactionKind
): ReactionKind {
  return ReactionKind[kindSrc.__kind];
}
