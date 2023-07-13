import { ContentExtensionData } from './types';
import { Ctx } from '../../processor';
import { EventName, Post } from '../../model';
import { PostCreatedData } from '../../common/types';
import { getOrCreateImageExtension } from './entity';
import { setActivity } from '../activity';
import { getContentExtensionEntityId } from '../../common/utils';

export async function handleImage({
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
  const extension = await getOrCreateImageExtension({
    extensionId: getContentExtensionEntityId(parentPost.id, extensionIndex),
    parentPost,
    extensionData,
    ctx
  });

  await setActivity({
    syntheticEventName: EventName.ExtensionImageCreated,
    account: extension.createdBy,
    extension,
    post: parentPost,
    ctx,
    eventData
  });
}
