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
import { ElasticSearchManager } from '../../elasticsearch';
import {
  getBodySummary,
  getExperimentalFieldsFromIPFSContent,
  getJoinedList
} from '../../common/utils';

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

  const spaceIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'space',
    eventData.ipfsSrc
  );

  space.updatedAtTime = eventData.timestamp;

  space.updatedAtBlock = BigInt(eventData.blockNumber);

  if (spaceIpfsContent) {
    const aboutSummary = getBodySummary(spaceIpfsContent.about);
    space.name = spaceIpfsContent.name ?? null;
    space.email = spaceIpfsContent.email ?? null;
    space.about = spaceIpfsContent.about ?? null;
    space.summary = aboutSummary.summary;
    space.isShowMore = aboutSummary.isShowMore;
    space.image = spaceIpfsContent.image ?? null;
    // space.appId = spaceIpfsContent.appId ?? null;

    space.experimental =
      getExperimentalFieldsFromIPFSContent(spaceIpfsContent, 'space', ctx) ??
      null;

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

  ElasticSearchManager.index(ctx).addToQueue(space);

  await setActivity({
    account: eventData.accountId,
    space,
    ctx,
    eventData
  });
}
