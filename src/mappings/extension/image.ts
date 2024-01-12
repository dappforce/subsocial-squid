import { ContentExtensionData } from '@subsocial/data-hub-sdk';
import { Ctx } from '../../processor';
import { EventName, Post } from '../../model';
import { PostCreatedData, PostUpdatedData } from '../../common/types';
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
  eventData: PostCreatedData | PostUpdatedData;
  ctx: Ctx;
}) {
  const postCreatedEventData = eventData as PostCreatedData;

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
    eventMetadata: postCreatedEventData.eventData.metadata
  });
}
