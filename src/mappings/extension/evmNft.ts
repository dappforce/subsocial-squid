import { ContentExtensionData } from './types';
import { Ctx } from '../../processor';
import { EventName, Post } from '../../model';
import { PostCreatedData } from '../../common/types';
import { getOrCreateEvmNftExtension } from './entity';
import { setActivity } from '../activity';

export async function handleEvmNft({
  extensionData,
  extensionIndex,
  parentPost,
  eventData,
  ctx
}: {
  extensionData: ContentExtensionData;
  parentPost: Post;
  extensionIndex: number;
  eventData: PostCreatedData;
  ctx: Ctx;
}) {
  const extension = await getOrCreateEvmNftExtension({
    extensionId: `${parentPost.id}-${extensionIndex}`,
    parentPost,
    extensionData,
    ctx
  });

  await setActivity({
    syntheticEventName: EventName.ExtensionEvmNftShared,
    account: extension.createdBy,
    extension,
    post: parentPost,
    ctx,
    eventData
  });
}
