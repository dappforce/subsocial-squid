import { handleDonation } from './donation';
import { handleEvmNft } from './evmNft';
import { ContentExtensionData, ContentExtensionId } from './types';
import { Ctx } from '../../processor';
import { Post } from '../../model';
import { PostCreatedData, PostUpdatedData } from '../../common/types';
import { handleImage } from './image';
import { handleSecretBox } from './secretBox';
import { handlePinnedPosts } from './pinnedPosts';

// @ts-ignore
const extensionHandlers = new Map([
  [ContentExtensionId['subsocial-donations'], handleDonation],
  [ContentExtensionId['subsocial-evm-nft'], handleEvmNft],
  [ContentExtensionId['subsocial-image'], handleImage],
  [ContentExtensionId['subsocial-secret-box'], handleSecretBox],
  [ContentExtensionId['subsocial-decoded-promo'], handleSecretBox],
  [ContentExtensionId['subsocial-pinned-posts'], handlePinnedPosts]
]);

export async function processContentExtensions(
  extensionDataList: ContentExtensionData[],
  parentPost: Post,
  eventData: PostCreatedData | PostUpdatedData,
  ctx: Ctx
): Promise<void> {
  let index = 0;
  console.dir(extensionDataList, { depth: null });

  for (const extensionItem of extensionDataList) {
    if (!extensionHandlers.has(extensionItem.id)) return;
    await extensionHandlers.get(extensionItem.id)!({
      extensionData: extensionItem,
      extensionIndex: index,
      eventData,
      parentPost,
      ctx
    });
    index++;
  }
}
