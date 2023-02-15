import { SubsocialElasticApi } from '@subsocial/elasticsearch';

import {
  ElasticPostDoc,
  ElasticSpaceDoc
} from '@subsocial/elasticsearch/types';
import { ESContentData, ESEntityTypeName } from './types';
import { Ctx } from '../processor';
import { Post, Space } from '../model';
import { Entity } from '@subsquid/typeorm-store/lib/store';
import { splitIntoBatches } from '../common/utils';

export class ElasticSearchIndexerManager {
  private static instance: ElasticSearchIndexerManager;
  private processorContext: Ctx | undefined;

  private indexingQueue: Map<
    ESEntityTypeName,
    Map<string, ElasticPostDoc | ElasticSpaceDoc>
  > = new Map([
    ['post', new Map()],
    ['space', new Map()]
  ]);

  static getInstance(
    esClient: SubsocialElasticApi,
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

  constructor(private esClient: SubsocialElasticApi, processorCtx?: Ctx) {
    this.processorContext = processorCtx;
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
    if (process.env.ELASTIC_SEARCH_MODE !== 'develop') {
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
        ...(entity.space ? { space: entity.space.id } : {}),
        ...(entity.title ? { title: entity.title } : {}),
        ...(entity.body ? { body: entity.body } : {}),
        ...(entity.tagsOriginal && entity.tagsOriginal.length > 0
          ? { tags: entity.tagsOriginal.split(',') }
          : {})
      } as ESContentData<T>;
    } else if (entity instanceof Space) {
      return {
        ...(entity.name ? { name: entity.name } : {}),
        ...(entity.handle ? { handle: entity.handle } : {}),
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
      const promises = batch.map(([id, content]) => handler({ id, content }));

      const indexingRes = await Promise.allSettled(promises);
    }
  }

  // private async refreshIndex(): Promise<void> {
  //   await this.esClient.client.indices.refresh();
  // }
}
