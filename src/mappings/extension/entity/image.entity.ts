import {
  ContentExtension,
  ContentExtensionSchemaId,
  Post
} from '../../../model';
import { ContentExtensionData, ExtensionPropertiesAll } from '../types';
import { Ctx } from '../../../processor';
import { getEntityWithRelations } from '../../../common/gettersWithRelations';

export async function getOrCreateImageExtension({
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
    extensionSchemaId: ContentExtensionSchemaId.subsocial_image,
    image: properties.image,
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}
