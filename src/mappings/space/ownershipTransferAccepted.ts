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
  eventData: SpaceOwnershipTransferAcceptedData
): Promise<void> {
  const newOwnerAccount = await getOrCreateAccount(eventData.accountId, ctx);

  const space = await getEntityWithRelations.space(eventData.spaceId, ctx);

  if (!space) {
    new EntityProvideFailWarning(Space, eventData.spaceId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const oldOwnerAccount = space.ownedByAccount;

  space.ownedByAccount = newOwnerAccount;

  await ctx.store.save(space);

  const activity = await setActivity({
    account: eventData.accountId,
    oldOwner: oldOwnerAccount,
    space,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
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
