import { Ctx } from '../processor';
import { Account, ContentExtension, EvmAccount, Post, Space } from '../model';

async function getAccountWithRelations(
  accountId: string,
  ctx: Ctx
): Promise<Account | null> {
  return (
    (await ctx.store.get(Account, {
      where: {
        id: accountId
      },
      relations: {
        profileSpace: true
      }
    })) ?? null
  );
}
async function getEvmAccountWithRelations(
  accountId: string,
  ctx: Ctx
): Promise<EvmAccount | null> {
  return (
    (await ctx.store.get(EvmAccount, {
      where: {
        id: accountId
      },
      relations: {
        linkedSubstrateAccounts: true
      }
    })) ?? null
  );
}

async function getPostWithRelations({
  postId,
  ctx,
  rootOrParentPost
}: {
  postId: string | undefined | null;
  ctx: Ctx;
  rootOrParentPost?: boolean;
}): Promise<Post | null> {
  if (!postId) return null;
  return (
    (await ctx.store.get(Post, {
      where: {
        id: postId
      },
      relations: {
        ...(rootOrParentPost
          ? {
              ownedByAccount: true,
              space: {
                ownedByAccount: true
              }
            }
          : {
              ownedByAccount: true,
              rootPost: {
                ownedByAccount: true,
                space: {
                  ownedByAccount: true
                }
              },
              parentPost: {
                ownedByAccount: true
              },
              space: {
                ownedByAccount: true
              }
            })
      }
    })) ?? null
  );
}

async function getSpaceWithRelations(
  spaceId: string | null | undefined,
  ctx: Ctx
): Promise<Space | null> {
  if (!spaceId) return null;
  return (
    (await ctx.store.get(Space, {
      where: {
        id: spaceId
      },
      relations: {
        ownedByAccount: true
      }
    })) ?? null
  );
}

async function getContentExtensionWithRelations(
  extensionId: string | null | undefined,
  ctx: Ctx
): Promise<ContentExtension | null> {
  if (!extensionId) return null;
  return (
    (await ctx.store.get(ContentExtension, {
      where: {
        id: extensionId
      },
      relations: {
        createdBy: true,
        parentPost: true,
        pinnedResources: {
          contentExtension: true,
          post: true,
          space: true
        }
      }
    })) ?? null
  );
}

export const getEntityWithRelations = {
  account: getAccountWithRelations,
  evmAccount: getEvmAccountWithRelations,
  post: getPostWithRelations,
  space: getSpaceWithRelations,
  contentExtension: getContentExtensionWithRelations
};
