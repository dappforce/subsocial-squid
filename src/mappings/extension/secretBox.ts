import { ContentExtensionData } from './types';
import { Ctx } from '../../processor';
import {
  Account,
  Activity,
  EventName,
  EvmSubstrateAccountLink,
  Post
} from '../../model';
import {
  getOrCreateDonationExtension,
  getOrCreateSecretBoxExtension
} from './entity';
import { setActivity } from '../activity';
import { EntityProvideFailWarning } from '../../common/errors';
import { PostCreatedData, PostUpdatedData } from '../../common/types';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { getContentExtensionEntityId } from '../../common/utils';

export async function handleSecretBox({
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
}): Promise<void> {
  const postCreatedEventData = eventData as PostCreatedData;

  const extension = await getOrCreateSecretBoxExtension({
    extensionId: getContentExtensionEntityId(parentPost.id, extensionIndex),
    parentPost,
    extensionData,
    ctx
  });

  if (!extension) {
    ctx.log.error(
      `Content Extension data ${getContentExtensionEntityId(
        parentPost.id,
        extensionIndex
      )} is invalid.`
    );
    return;
  }

  const activity = await setActivity({
    syntheticEventName: EventName.ExtensionSecretBoxCreated,
    account: extension.createdBy,
    extension,
    post: parentPost,
    ctx,
    eventData: postCreatedEventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, postCreatedEventData);
    return;
  }

  if (!extension.recipient) return;

  await NotificationsManager.getInstance().handleNotifications(
    EventName.ExtensionSecretBoxCreated,
    {
      account: parentPost.ownedByAccount,
      extSecretBoxRecipientAccount: extension.recipient,
      activity,
      ctx
    }
  );
}
