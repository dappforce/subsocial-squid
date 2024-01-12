import {
  ContentExtension,
  ContentExtensionSchemaId,
  Post
} from '../../../model';
import { ContentExtensionData, ExtensionPropertiesAll } from '@subsocial/data-hub-sdk';
import { Ctx } from '../../../processor';
import { getEntityWithRelations } from '../../../common/gettersWithRelations';

export async function getOrCreateEvmNftExtension({
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
    extensionSchemaId: ContentExtensionSchemaId.subsocial_evm_nft,
    chain: properties.chain,
    collectionId: properties.collectionId,
    nftId: properties.nftId,
    url: properties.url,
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}
