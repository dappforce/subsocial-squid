import { SubsocialElasticApi } from '@subsocial/elasticsearch';

import {
  ElasticIndexName,
  ElasticPostDoc,
  ElasticSpaceDoc
} from '@subsocial/elasticsearch/types';
import { ESContentData, ESEntityTypeName } from './types';
import { Ctx } from '../processor';
import { Post, Space } from '../model';
import { Entity } from '@subsquid/typeorm-store/lib/store';
import { splitIntoBatches } from '../common/utils';
import SpacesMapping from './mappings/spaces.json';
import PostsMapping from './mappings/posts.json';
import { getChain } from '../chains';
import { ProcessorConfig } from '../chains/interfaces/processorConfig';

export class ElasticSearchIndexerManager {
  private static instance: ElasticSearchIndexerManager;
  private processorContext: Ctx | undefined;
  private indexesEnsured: boolean = false;
  protected chainConfig: ProcessorConfig;

  public indexingQueue: Map<
    ESEntityTypeName,
    Map<string, ElasticPostDoc | ElasticSpaceDoc>
  > = new Map([
    ['post', new Map()],
    ['space', new Map()]
  ]);

  static getInstance(
    esClient: SubsocialElasticApi | null,
    ctx?: Ctx
  ): ElasticSearchIndexerManager {
    if (!ElasticSearchIndexerManager.instance) {
      ElasticSearchIndexerManager.instance = new ElasticSearchIndexerManager(
        esClient,
        ctx
      );
    }
    return ElasticSearchIndexerManager.instance;
  }

  constructor(
    private esClient: SubsocialElasticApi | null,
    processorCtx?: Ctx
  ) {
    this.processorContext = processorCtx;
    this.chainConfig = getChain().config;
  }

  /**
   * Ensure all required indexes for further entities indexing
   */
  async maybeCreateIndices() {
    if (this.indexesEnsured) return;
    await this.createIndexIfNotFound('subsocial_spaces', SpacesMapping);
    await this.createIndexIfNotFound('subsocial_posts', PostsMapping);
    this.indexesEnsured = true;
  }

  /**
   * Add entity content to the cache for adding to ES in the next batch.
   * @param entity: Post | Space
   */
  addToQueue<T extends Entity>(entity: T) {
    let entityTypeName: ESEntityTypeName = 'post';
    if (entity instanceof Post) {
      entityTypeName = 'post';
    } else if (entity instanceof Space) {
      entityTypeName = 'space';
    } else {
      throw new Error(`Unknown entity type has been provided - ${entity}`);
    }

    if (!this.indexingQueue.has(entityTypeName))
      this.indexingQueue.set(entityTypeName, new Map());

    this.indexingQueue
      .get(entityTypeName)!
      .set(entity.id, this.getContentForIndex(entity));
  }

  /**
   * Add content of entities was prepared in previous batch. In such case we can
   * be sure that entities are saved in DB after previous DB transaction commit.
   */
  async processIndexingQueue() {
    if (!this.chainConfig.elasticSearchSyncDisabled && this.esClient) {
      await this.maybeCreateIndices();

      for (const [entityType, contentScope] of this.indexingQueue.entries()) {
        switch (entityType) {
          case 'post':
            await this.indexListInBatches(
              contentScope,
              this.esClient.indexPostContent.bind(this.esClient)
            );
            break;
          case 'space':
            await this.indexListInBatches(
              contentScope,
              this.esClient.indexSpaceContent.bind(this.esClient)
            );
            break;
          default:
        }
      }
      if (this.processorContext)
        this.processorContext.log.info(
          `Added to ElasticSearch: ${
            this.indexingQueue.get('post')!.size
          } posts | ${this.indexingQueue.get('space')!.size} spaces`
        );
    }
    this.indexingQueue.get('post')!.clear();
    this.indexingQueue.get('space')!.clear();
  }

  private getContentForIndex<T extends Entity>(entity: T): ESContentData<T> {
    if (entity instanceof Post) {
      return {
        ...(entity.space ? { spaceId: entity.space.id } : {}),
        ...(entity.title ? { title: entity.title } : {}),
        ...(entity.body ? { body: entity.body } : {}),
        ...(entity.tagsOriginal && entity.tagsOriginal.length > 0
          ? { tags: entity.tagsOriginal.split(',') }
          : {})
      } as ESContentData<T>;
    } else if (entity instanceof Space) {
      return {
        ...(entity.name ? { name: entity.name } : {}),
        ...(entity.username ? { username: entity.username } : {}),
        ...(entity.about ? { body: entity.about } : {}),
        ...(entity.tagsOriginal && entity.tagsOriginal.length > 0
          ? { tags: entity.tagsOriginal.split(',') }
          : {})
      } as ESContentData<T>;
    } else {
      throw new Error(`Unknown entity type has been provided - ${entity}`);
    }
  }

  private async indexList(
    list: Map<string, ElasticPostDoc | ElasticSpaceDoc>,
    handler: ({
      id,
      content
    }: {
      id: string;
      content: ElasticPostDoc | ElasticSpaceDoc;
    }) => Promise<unknown>
  ) {
    for (const [id, content] of list.entries()) {
      await handler({ id, content });
    }
  }

  private async indexListInBatches(
    list: Map<string, ElasticPostDoc | ElasticSpaceDoc>,
    handler: ({
      id,
      content
    }: {
      id: string;
      content: ElasticPostDoc | ElasticSpaceDoc;
    }) => Promise<unknown>
  ) {
    for (const batch of splitIntoBatches([...list.entries()], 100)) {
      const promises = batch.map(([id, content]) => {
        return handler({ id, content });
      });

      const indexingRes = await Promise.allSettled(promises);
    }
  }

  private async createIndexIfNotFound(
    indexName: ElasticIndexName,
    mapping: any
  ) {
    if (this.chainConfig.elasticSearchSyncDisabled || !this.esClient) return;

    const result = await this.esClient.client.indices.exists(
      { index: indexName },
      { ignore: [404] }
    );

    if (result.statusCode === 404) {
      await this.esClient.client.indices.create({
        index: indexName,
        body: mapping
      });
      if (this.processorContext) {
        this.processorContext.log
          .child('ElasticSearch')
          .info(`${indexName} index created`);
      } else console.log(`${indexName} index created`);
    } else {
      if (this.processorContext) {
        this.processorContext.log
          .child('ElasticSearch')
          .info(`${indexName} index already exists`);
      } else console.log(`${indexName} index already exists`);
    }
  }
}
