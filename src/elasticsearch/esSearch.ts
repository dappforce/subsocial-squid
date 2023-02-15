import { Ctx } from '../processor';
import { SubsocialElasticApi } from '@subsocial/elasticsearch';
import {
  buildElasticSearchQuery,
  getElasticQueryParamsDecorated
} from './searchUtils';
import {
  ElasticQueryParamsWithSpaceId,
  ElasticQueryParamsWithSpaceIdRaw
} from './types';
import { ErrorResponseBase } from '@elastic/elasticsearch/lib/api/types';

export class ElasticSearchSearchManager {
  private static instance: ElasticSearchSearchManager;
  private processorContext: Ctx | undefined;

  static getInstance(
    esClient: SubsocialElasticApi,
    ctx?: Ctx
  ): ElasticSearchSearchManager {
    if (!ElasticSearchSearchManager.instance) {
      ElasticSearchSearchManager.instance = new ElasticSearchSearchManager(
        esClient,
        ctx
      );
    }
    return ElasticSearchSearchManager.instance;
  }

  constructor(private esClient: SubsocialElasticApi, processorCtx?: Ctx) {
    this.processorContext = processorCtx;
  }

  async query(esParams: ElasticQueryParamsWithSpaceIdRaw): Promise<{
    ok: boolean;
    data?: { hits: Array<any>; totalRecords: number; maxScore: number };
    err?: ErrorResponseBase;
  }> {
    try {
      const esQuery = buildElasticSearchQuery(
        getElasticQueryParamsDecorated(esParams)
      );

      const result = await this.esClient.client.search(esQuery);

      if (result) {
        const {
          body: {
            hits: { hits, total, max_score }
          }
        } = result;

        return {
          ok: true,
          data: { hits, totalRecords: total.value, maxScore: max_score }
        };
      }
    } catch (err) {
      // elasticLog.warn('Failed to query ElasticSearch:', err.message)
      return { ok: false, err } as {
        ok: boolean;
        err: ErrorResponseBase;
      };
      // res.status(err.statusCode).send(err.meta)
    }
    return { ok: false };
  }
}
