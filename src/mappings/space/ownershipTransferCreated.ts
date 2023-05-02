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
  eventData: SpaceOwnershipTransferCreatedData
): Promise<void> {
  const currentOwnerAccount = await getOrCreateAccount(
    eventData.currentOwnerId,
    ctx
  );
  const newOwnerAccount = await getOrCreateAccount(eventData.newOwnerId, ctx);

  const space = await getEntityWithRelations.space(eventData.spaceId, ctx);

  if (!space) {
    new EntityProvideFailWarning(Space, eventData.spaceId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const activity = await setActivity({
    account: currentOwnerAccount,
    newOwner: newOwnerAccount,
    space,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
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
