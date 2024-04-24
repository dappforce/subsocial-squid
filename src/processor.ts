import { lookupArchive, KnownArchives } from '@subsquid/archive-registry';

import {
  BlockHeader,
  DataHandlerContext,
  // BatchContext,
  // BatchProcessorItem,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Event as _Event,
  Call as _Call,
  Extrinsic as _Extrinsic,
  Block as _Block
} from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
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
import { handleEvmSubstrateAccountLinks } from './mappings/evmSubstrateAccountLink';
import { handlePostFollowUnfollow } from './mappings/postCommentFollows';
import { handleOwnership } from './mappings/ownership';

const chainConfig = getChain();

export const processor = new SubstrateBatchProcessor()
  .setRpcEndpoint({
    url: chainConfig.config.dataSource.chain.toString(),
    rateLimit: chainConfig.config.dataSource.chainRateLimit
  })
  .setGateway({ url: chainConfig.config.dataSource.archive })

  // .setBlockRange({ from: 1093431 }) // PostCreated
  // .setBlockRange({ from: 1093209 }) // SpaceCreated
  // .setBlockRange({ from: 1368300 }) // SpaceOwnershipTransferAccepted
  // .setBlockRange({ from: 2071296 }) // Tweet post
  // .setBlockRange({ from: 4545490 }) // Tweet post
  .addEvent({ name: ['Posts.PostCreated'], call: true, extrinsic: true })
  .addEvent({ name: ['Posts.PostUpdated'], call: true, extrinsic: true })
  .addEvent({ name: ['Posts.PostMoved'], call: true, extrinsic: true })
  .addEvent({ name: ['PostFollows.PostFollowed'], call: true, extrinsic: true })
  .addEvent({
    name: ['PostFollows.PostUnfollowed'],
    call: true,
    extrinsic: true
  })
  .addEvent({ name: ['Spaces.SpaceCreated'], call: true, extrinsic: true })
  .addEvent({ name: ['Spaces.SpaceUpdated'], call: true, extrinsic: true })
  .addEvent({
    name: ['Reactions.PostReactionCreated'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['Reactions.PostReactionUpdated'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['Reactions.PostReactionDeleted'],
    call: true,
    extrinsic: true
  })
  .addEvent({ name: ['Profiles.ProfileUpdated'], call: true, extrinsic: true })
  .addEvent({
    name: ['SpaceFollows.SpaceFollowed'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['SpaceFollows.SpaceUnfollowed'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['SpaceOwnership.SpaceOwnershipTransferAccepted'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['SpaceOwnership.SpaceOwnershipTransferCreated'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['Ownership.OwnershipTransferCreated'], // TODO refactor pallet naming after renaming
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['Ownership.OwnershipTransferAccepted'], // TODO refactor pallet naming after renaming
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['Ownership.OwnershipTransferRejected'], // TODO refactor pallet naming after renaming
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['AccountFollows.AccountFollowed'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['AccountFollows.AccountUnfollowed'],
    call: true,
    extrinsic: true
  })
  .addEvent({ name: ['Domains.DomainRegistered'], call: true, extrinsic: true })
  .addEvent({
    name: ['Domains.DomainMetaUpdated'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['EvmAccounts.EvmAddressLinkedToAccount'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['EvmAccounts.EvmAddressUnlinkedFromAccount'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['EvmAddresses.EvmAddressLinkedToAccount'],
    call: true,
    extrinsic: true
  })
  .addEvent({
    name: ['EvmAddresses.EvmAddressUnlinkedFromAccount'],
    call: true,
    extrinsic: true
  })
  .addEvent({ name: ['Proxy.ProxyAdded'], call: true, extrinsic: true })
  .addEvent({ name: ['Proxy.ProxyRemoved'], call: true, extrinsic: true })
  .setFields({
    block: {
      timestamp: true
    },
    event: {
      name: true,
      args: true
    },
    call: {
      name: true,
      args: true,
      origin: true,
      success: true,
      error: true
    },
    extrinsic: {
      signature: true,
      hash: true
    }
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = _Block<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type Ctx = DataHandlerContext<Store, Fields>;
export type BlockItem__DEPRECATED = {
  kind: 'call' | 'event';
  value: Event | Call;
};

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
    ctx.blocks[ctx.blocks.length - 1].header.height > 1_100_000
      ? ctx.blocks.length + 1
      : 5
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

  await handleEvmSubstrateAccountLinks(ctx, parsedEvents);

  await handleProfiles(ctx, parsedEvents);

  await handleAccountFollowing(ctx, parsedEvents);

  await handleSpacesFollowing(ctx, parsedEvents);

  await handlePosts(ctx, parsedEvents);

  await handlePostFollowUnfollow(ctx, parsedEvents);

  await handleDomains(ctx, parsedEvents);

  await handlePostReactions(ctx, parsedEvents);

  await handleOwnership(ctx, parsedEvents);

  await NotificationsManager.getInstance().commitInBatchNotifications(ctx);

  storageDataManager.purgeStorage();
}
