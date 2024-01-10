import { ContentExtensionData, ExtensionPropertiesAll } from './types';
import { Ctx } from '../../processor';
import { EventName, PinnedResourceType, Post } from '../../model';
import { PostCreatedData, PostUpdatedData } from '../../common/types';
import { getOrCreatePinnedPostsExtension } from './entity';
import { setActivity } from '../activity';
import { getContentExtensionEntityId } from '../../common/utils';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { getNewExtensionPinnedResource } from './entity/pinnedResource.entity';

export async function handlePinnedPosts({
  extensionData,
  extensionIndex,
  parentPost,
  eventData,
  ctx
}: {
  extensionData: ContentExtensionData;
  parentPost: Post;
  extensionIndex: number;
  eventData: PostCreatedData | PostUpdatedData;
  ctx: Ctx;
}) {
  let extension = await getEntityWithRelations.contentExtension(
    getContentExtensionEntityId(parentPost.id, extensionIndex),
    ctx
  );

  if (!extension) {
    // It means that it's a brand-new pin
    extension = await getOrCreatePinnedPostsExtension({
      extensionId: getContentExtensionEntityId(parentPost.id, extensionIndex),
      parentPost,
      extensionData,
      ctx
    });
  } else {
    for (const existingPinnedResource of extension.pinnedResources) {
      await ctx.store.remove(existingPinnedResource);
    }
    const { properties }: { properties: ExtensionPropertiesAll; id: string } =
      extensionData!;

    if (properties.ids && properties.ids.length > 0) {
      const extensionPinnedResourceEntities = [];

      for (const postId of properties.ids) {
        const post = await getEntityWithRelations.post({
          postId,
          ctx
        });

        if (!post) continue;

        const relationEntity = getNewExtensionPinnedResource({
          resourceType: PinnedResourceType.Post,
          extension,
          resource: post
        });

        if (relationEntity) {
          await ctx.store.save(relationEntity);
          extensionPinnedResourceEntities.push(relationEntity);
        }
      }

      extension.pinnedResources = extensionPinnedResourceEntities;
    }
    await ctx.store.save(extension);
  }

  await setActivity({
    syntheticEventName: EventName.ExtensionImageCreated,
    account: extension.createdBy,
    extension,
    post: parentPost,
    ctx,
    eventData
  });
}
