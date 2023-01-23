import { Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning,
  MissingSubsocialApiEntity
} from '../../common/errors';
import { Ctx } from '../../processor';
import { SpaceUpdatedData } from '../../common/types';
import { StorageDataManager } from '../../storage';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { ElasticSearchIndexerManager } from '../../elasticsearch';
import { getBodySummary, getJoinedList } from '../../common/utils';

export async function spaceUpdated(
  ctx: Ctx,
  eventData: SpaceUpdatedData
): Promise<void> {
  const space = await getEntityWithRelations.space(eventData.spaceId, ctx);

  if (!space) {
    new EntityProvideFailWarning(Space, eventData.spaceId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const spaceStorageData = storageDataManagerInst.getStorageDataById(
    'space',
    eventData.blockHash,
    eventData.spaceId
  );

  if (!spaceStorageData) {
    new MissingSubsocialApiEntity('SpaceData', ctx, eventData);
    throw new CommonCriticalError();
  }

  const spaceIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'space',
    eventData.ipfsSrc
  );

  space.updatedAtTime = eventData.timestamp;

  space.updatedAtBlock = BigInt(eventData.blockNumber);

  if (spaceIpfsContent) {
    const aboutSummary = getBodySummary(spaceIpfsContent.about);
    space.handle = spaceStorageData.handle;
    space.name = spaceIpfsContent.name ?? null;
    space.email = spaceIpfsContent.email ?? null;
    space.about = spaceIpfsContent.about ?? null;
    space.summary = aboutSummary.summary;
    space.isShowMore = aboutSummary.isShowMore;
    space.image = spaceIpfsContent.image ?? null;

    if (spaceIpfsContent.tags) {
      space.tagsOriginal = getJoinedList(spaceIpfsContent.tags);
    }
    if (spaceIpfsContent.links) {
      space.linksOriginal = getJoinedList(spaceIpfsContent.links);
    }
    if (spaceIpfsContent.interests) {
      space.interestsOriginal = getJoinedList(spaceIpfsContent.interests);
    }
  }

  await ctx.store.save(space);

  ElasticSearchIndexerManager.getInstance(ctx).addToQueue(space);

  await setActivity({
    account: eventData.accountId,
    space,
    ctx,
    eventData
  });
}
