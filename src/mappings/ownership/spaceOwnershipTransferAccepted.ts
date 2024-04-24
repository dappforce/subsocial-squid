import { Activity, EventName, Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import { SpaceOwnershipTransferAcceptedData } from '../../common/types';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { getOrCreateAccount } from '../account';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function spaceOwnershipTransferAccepted(
  ctx: Ctx,
  { callData, eventData }: SpaceOwnershipTransferAcceptedData
): Promise<void> {
  const newOwnerAccount = await getOrCreateAccount(
    eventData.params.accountId,
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

  const oldOwnerAccount = space.ownedByAccount;

  space.ownedByAccount = newOwnerAccount;

  await ctx.store.save(space);

  const activity = await setActivity({
    account: eventData.params.accountId,
    oldOwner: oldOwnerAccount,
    space,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceOwnershipTransferAccepted,
    {
      account: space.ownedByAccount,
      oldOwner: oldOwnerAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceOwnershipTransferAccepted,
    {
      account: space.ownedByAccount,
      oldOwner: oldOwnerAccount,
      space,
      activity,
      ctx
    }
  );
}
