import { ContentExtensionData } from './types';
import { Ctx } from '../../processor';
import {
  Account,
  Activity,
  EventName,
  EvmSubstrateAccountLink,
  Post
} from '../../model';
import { getOrCreateDonationExtension } from './entity';
import { setActivity } from '../activity';
import { EntityProvideFailWarning } from '../../common/errors';
import { PostCreatedData, PostUpdatedData } from '../../common/types';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { getContentExtensionEntityId } from '../../common/utils';

export async function handleDonation({
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

  const extension = await getOrCreateDonationExtension({
    extensionId: getContentExtensionEntityId(parentPost.id, extensionIndex),
    parentPost,
    extensionData,
    ctx
  });

  const activity = await setActivity({
    syntheticEventName: EventName.ExtensionDonationCreated,
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

  let targetAccountsForNotification: Account[] = [];

  if (!extension.toEvm && extension.toSubstrate) {
    targetAccountsForNotification = [extension.toSubstrate];
  } else if (!extension.toSubstrate && extension.toEvm) {
    const linkedAccountsOfTargetAccounts = await ctx.store.find(
      EvmSubstrateAccountLink,
      {
        where: {
          evmAccount: {
            id: extension.toEvm.id
          },
          active: true
        },
        relations: {
          substrateAccount: true
        }
      }
    );

    targetAccountsForNotification = linkedAccountsOfTargetAccounts.map(
      (link) => link.substrateAccount
    );
  }

  for (const targetAccount of targetAccountsForNotification) {
    await NotificationsManager.getInstance().handleNotifications(
      EventName.ExtensionDonationCreated,
      {
        account: parentPost.ownedByAccount,
        extDonationTargetAccount: targetAccount,
        activity,
        ctx
      }
    );
  }
}
