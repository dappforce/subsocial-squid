import {
  ContentExtension,
  ContentExtensionSchemaId,
  Post
} from '../../../model';
import { ContentExtensionData, ExtensionPropertiesAll } from '../types';
import { Ctx } from '../../../processor';
import { getEntityWithRelations } from '../../../common/gettersWithRelations';
import { getOrCreateAccount } from '../../account';

export async function getOrCreateSecretBoxExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension | null> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const {
    properties,
    id: extensionSchemaId
  }: { properties: ExtensionPropertiesAll; id: string } = extensionData!;

  if (!properties.recipient && !properties.nonce && !properties.message) {
    ctx.log.error(
      `Secret Box content is invalid. Extension ID - ${extensionId}`
    );
    return null;
  }

  const decoratedExtensionSchemaId = extensionSchemaId.replace(/-/g, '_');

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: decoratedExtensionSchemaId as ContentExtensionSchemaId,
    nonce: properties.nonce,
    message: properties.message,
    recipient: await getOrCreateAccount(properties.recipient!, ctx),
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}
