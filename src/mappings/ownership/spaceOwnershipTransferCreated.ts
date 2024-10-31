import { Activity, EventName, Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import { SpaceOwnershipTransferCreatedData } from '../../common/types';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { getOrCreateAccount } from '../account';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function spaceOwnershipTransferCreated(
  ctx: Ctx,
  { callData, eventData }: SpaceOwnershipTransferCreatedData
): Promise<void> {
  const currentOwnerAccount = await getOrCreateAccount(
    eventData.params.currentOwnerId,
    ctx
  );
  const newOwnerAccount = await getOrCreateAccount(
    eventData.params.newOwnerId,
    ctx
  );

  const space = await getEntityWithRelations.space(
    eventData.params.spaceId,
    ctx
  );

  if (!space) {
    new EntityProvideFailWarning(
      Space,
      eventData.params.spaceId,
      ctx,
      eventData.metadata
    );
    throw new CommonCriticalError();
  }

  const activity = await setActivity({
    account: currentOwnerAccount,
    newOwner: newOwnerAccount,
    space,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceOwnershipTransferCreated,
    {
      account: currentOwnerAccount,
      newOwner: newOwnerAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceOwnershipTransferCreated,
    {
      account: currentOwnerAccount,
      newOwner: newOwnerAccount,
      space,
      activity,
      ctx
    }
  );
}
