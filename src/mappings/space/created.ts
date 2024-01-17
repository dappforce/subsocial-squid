import { getOrCreateAccount } from '../account';
import { setActivity } from '../activity';
import { processSpaceFollowingUnfollowingRelations } from '../spaceFollows';
import { Ctx } from '../../processor';
import { ensureSpace } from './common';
import { SpaceCreatedData } from '../../common/types';
import { ElasticSearchManager } from '../../elasticsearch';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Activity, EventName } from '../../model';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function spaceCreated(ctx: Ctx, eventCallData: SpaceCreatedData) {
  const account = await getOrCreateAccount(
    eventCallData.eventData.params.accountId,
    ctx
  );

  const space = await ensureSpace({
    spaceId: eventCallData.eventData.params.spaceId,
    ctx,
    eventCallData
  });

  await ctx.store.save(space);

  ElasticSearchManager.index(ctx).addToQueue(space);

  await processSpaceFollowingUnfollowingRelations(
    account,
    space,
    ctx,
    eventCallData.eventData.metadata
  );

  const activity = await setActivity({
    account,
    space,
    ctx,
    eventMetadata: eventCallData.eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(
      Activity,
      'new',
      ctx,
      eventCallData.eventData.metadata
    );
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
