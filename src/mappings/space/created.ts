import { getOrCreateAccount } from '../account';
import { setActivity } from '../activity';
import { processSpaceFollowingUnfollowingRelations } from '../spaceFollows';
import { Ctx } from '../../processor';
import { ensureSpace } from './common';
import { SpaceCreatedData } from '../../common/types';
import { ElasticSearchIndexerManager } from '../../elasticsearch';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Activity, EventName } from '../../model';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function spaceCreated(ctx: Ctx, eventData: SpaceCreatedData) {
  const account = await getOrCreateAccount(eventData.accountId, ctx);

  const space = await ensureSpace({
    spaceId: eventData.spaceId,
    ctx,
    eventData
  });

  await ctx.store.save(space);

  ElasticSearchIndexerManager.getInstance(ctx).addToQueue(space);

  await processSpaceFollowingUnfollowingRelations(
    account,
    space,
    ctx,
    eventData
  );

  const activity = await setActivity({
    account,
    space,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceCreated,
    {
      account: space.ownedByAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceCreated,
    { account: space.ownedByAccount, space, activity, ctx }
  );
}
