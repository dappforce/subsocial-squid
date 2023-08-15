import {
  ContentExtension,
  ContentExtensionSchemaId,
  ExtensionPinnedResource,
  PinnedResourceType,
  Post,
  Space
} from '../../../model';
import { ContentExtensionData, ExtensionPropertiesAll } from '../types';
import { Ctx } from '../../../processor';
import { getEntityWithRelations } from '../../../common/gettersWithRelations';
import { getExtensionPinnedResourceEntityId } from '../../../common/utils';

export function getNewExtensionPinnedResource({
  extension,
  resourceType,
  resource
}: {
  extension: ContentExtension;
  resourceType: PinnedResourceType;
  resource: Post | Space;
}) {
  return new ExtensionPinnedResource({
    id: getExtensionPinnedResourceEntityId({
      extensionId: extension.id,
      resourceType: resourceType,
      resourceId: resource.id
    }),
    resourceType: PinnedResourceType.Post,
    contentExtension: extension,
    ...(resourceType === PinnedResourceType.Post
      ? { post: resource as Post }
      : {}),
    ...(resourceType === PinnedResourceType.Space
      ? { space: resource as Space }
      : {})
  });
}

export async function getOrCreatePinnedResourcesExtension({
  extensionId,
  parentPost,
  extensionData,
  pinnedResourceType,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  pinnedResourceType: PinnedResourceType;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const { properties }: { properties: ExtensionPropertiesAll; id: string } =
    extensionData!;

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: ContentExtensionSchemaId.subsocial_pinned_posts,
    pinnedResources: [],
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  if (!properties.ids) return extension;

  const pinnedResources = [];

  for (const resourceId of properties.ids) {
    let resource: Post | Space | null = null;
    switch (pinnedResourceType) {
      case PinnedResourceType.Post:
        resource = await getEntityWithRelations.post({
          postId: resourceId,
          ctx
        });
        break;
      case PinnedResourceType.Space:
        resource = await getEntityWithRelations.space(resourceId, ctx);
        break;
    }

    if (resource) pinnedResources.push(resource);
  }

  const extensionPinnedResourceEntities = [];

  for (const resource of pinnedResources) {
    const relationEntity = getNewExtensionPinnedResource({
      resourceType: pinnedResourceType,
      extension,
      resource
    });

    if (relationEntity) {
      await ctx.store.save(relationEntity);
      extensionPinnedResourceEntities.push(relationEntity);
    }
  }

  extension.pinnedResources = extensionPinnedResourceEntities;

  await ctx.store.save(extension);

  return extension;
}

export async function getOrCreatePinnedPostsExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  return getOrCreatePinnedResourcesExtension({
    pinnedResourceType: PinnedResourceType.Post,
    extensionId,
    parentPost,
    extensionData,
    ctx
  });
}

export async function getOrCreatePinnedSpacesExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  return getOrCreatePinnedResourcesExtension({
    pinnedResourceType: PinnedResourceType.Space,
    extensionId,
    parentPost,
    extensionData,
    ctx
  });
}
