import { lookupArchive, KnownArchives } from '@subsquid/archive-registry';

import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  SubstrateBlock
} from '@subsquid/substrate-processor';
import {
  BatchBlock,
  BatchProcessorEventItem
} from '@subsquid/substrate-processor/src/processor/batchProcessor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import envConfig from './config';
import { getParsedEventsData } from './eventsCallsData';
import { StorageDataManager } from './storage';

import { handleSpaces } from './mappings/space';
import { handlePosts } from './mappings/post';
import { handleAccountFollowing } from './mappings/accountFollows';
import { handleProfiles } from './mappings/account';
import { handleSpacesFollowing } from './mappings/spaceFollows';
import { handlePostReactions } from './mappings/reaction';
import { handleDomains } from './mappings/domain';

import { splitIntoBatches } from './common/utils';
import { ElasticSearchManager } from './elasticsearch';
import { getChain } from './chains';
import { NotificationsManager } from './mappings/notification/notifiactionsManager';

const chainConfig = getChain();

export const processor = new SubstrateBatchProcessor()
  .setDataSource({
    archive: chainConfig.config.dataSource.archive,
    chain: chainConfig.config.dataSource.chain
  })
  // .setBlockRange({ from: 1093431 }) // PostCreated
  // .setBlockRange({ from: 1093209 }) // SpaceCreated
  // .setBlockRange({ from: 1368300 }) // SpaceOwnershipTransferAccepted
  // .setBlockRange({ from: 2071296 }) // Tweet post
  .setTypesBundle('subsocial')
  .addEvent('Posts.PostCreated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Posts.PostUpdated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Posts.PostMoved', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Spaces.SpaceCreated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Spaces.SpaceUpdated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Reactions.PostReactionCreated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Reactions.PostReactionUpdated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Reactions.PostReactionDeleted', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Profiles.ProfileUpdated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('SpaceFollows.SpaceFollowed', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('SpaceFollows.SpaceUnfollowed', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('SpaceOwnership.SpaceOwnershipTransferAccepted', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('SpaceOwnership.SpaceOwnershipTransferCreated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('AccountFollows.AccountFollowed', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('AccountFollows.AccountUnfollowed', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Domains.DomainRegistered', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const)
  .addEvent('Domains.DomainMetaUpdated', {
    data: { event: { args: true, call: true, indexInBlock: true } }
  } as const);

if (!envConfig.chainNode) {
  throw new Error('no CHAIN_NODE in env');
}

export type Item = BatchProcessorItem<typeof processor>;
export type EventItem = BatchProcessorEventItem<typeof processor>;
export type Ctx = BatchContext<Store, Item>;
export type Block = BatchBlock<Item>;

NotificationsManager.getInstance().initHandlersMatrix();

processor.run(new TypeormDatabase(), async (ctx) => {
  ctx.log
    .child('sqd:processor')
    .info(
      `Batch size - ${ctx.blocks.length} [${
        ctx.blocks.length > 0
          ? `${ctx.blocks[0].header.height}/${
              ctx.blocks[ctx.blocks.length - 1].header.height
            }`
          : '---'
      }]`
    );

  await ElasticSearchManager.index(ctx).processIndexingQueue();

  const currentBlocksListFull = [...ctx.blocks];
  let blocksBatchHandlerIndex = 1;

  // TODO improve for work with different chains (subsocial || soonsocial || xsocial)
  for (const blocksBatch of splitIntoBatches(
    currentBlocksListFull,
    ctx.blocks[ctx.blocks.length - 1].header.height > 11000000
      ? ctx.blocks.length + 1
      : 3
  )) {
    const partialCtx = ctx;
    partialCtx.blocks = blocksBatch;
    await blocksBatchHandler(partialCtx);
    ctx.log.info(
      `Blocks batch #${blocksBatchHandlerIndex} has been processed.`
    );
    blocksBatchHandlerIndex++;
  }
});

async function blocksBatchHandler(ctx: Ctx) {
  console.log('ES disabled - ', chainConfig.config.elasticSearchSyncDisabled);
  /**
   * Collect data from all tracked events (postId, accountId, spaceId, etc.).
   */
  const parsedEvents = getParsedEventsData(ctx);

  /**
   * Load data from chain storage for required entities by collected IDs in
   * events. We need this for posts and spaces on "create" and "update" events
   * as we need get actual detailed data from the chain. In appropriate events
   * parameters we can get only IDs.
   */
  const storageDataManager = StorageDataManager.getInstance(ctx);
  await storageDataManager.fetchStorageDataByEventsData(parsedEvents);

  await handleSpaces(ctx, parsedEvents);

  await handleProfiles(ctx, parsedEvents);

  await handleAccountFollowing(ctx, parsedEvents);

  await handleSpacesFollowing(ctx, parsedEvents);

  await handlePosts(ctx, parsedEvents);

  await handleDomains(ctx, parsedEvents);

  await handlePostReactions(ctx, parsedEvents);

  storageDataManager.purgeStorage();
}
