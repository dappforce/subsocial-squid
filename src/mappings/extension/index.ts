import { handleDonation } from './donation';
import { handleEvmNft } from './evmNft';
import { ContentExtensionData, ContentExtensionId } from './types';
import { Ctx } from '../../processor';
import { Post } from '../../model';
import { PostCreatedData } from '../../common/types';

// @ts-ignore
const extensionHandlers = new Map([
  [ContentExtensionId['subsocial-donations'], handleDonation],
  [ContentExtensionId['subsocial-evm-nft'], handleEvmNft]
]);

export async function processContentExtensions(
  extensionDataList: ContentExtensionData[],
  parentPost: Post,
  eventData: PostCreatedData,
  ctx: Ctx
): Promise<void> {
  let index = 0;
  console.dir(extensionDataList, {depth: null})
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
