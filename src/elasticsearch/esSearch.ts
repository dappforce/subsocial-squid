import { Ctx } from '../processor';
import { SubsocialElasticApi } from '@subsocial/elasticsearch';
import {
  buildElasticSearchQuery,
  getElasticQueryParamsDecorated
} from './searchUtils';
import {
  ElasticQueryParamsWithSpaceIdRaw,
  ESErrorType,
  ESQueryResponseContent,
  ESSearchResultHitItem,
  OkOrError
} from './types';
import { ErrorResponseBase } from '@elastic/elasticsearch/lib/api/types';
import { getChain } from '../chains';
import { parseNumStr } from '@subsocial/utils';
const chainConfig = getChain();
const maxResultLimit: number =
  parseNumStr(chainConfig.config.elasticSearchMaxResultLimit) || 20;

export class ElasticSearchSearchManager {
  private static instance: ElasticSearchSearchManager;
  private processorContext: Ctx | undefined;

  static getInstance(
    esClient: SubsocialElasticApi | null,
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

  constructor(
    private esClient: SubsocialElasticApi | null,
    processorCtx?: Ctx
  ) {
    this.processorContext = processorCtx;
  }

  async query(
    esParams: ElasticQueryParamsWithSpaceIdRaw
  ): Promise<OkOrError<ESQueryResponseContent>> {
    if (!this.esClient)
      return {
        ok: false,
        err: { reason: 'ES client is not initialised' }
      };

    try {
      const paramsDecorated = getElasticQueryParamsDecorated(esParams);
      const esQuery = buildElasticSearchQuery(paramsDecorated);

      const result = await this.esClient.client.search(esQuery);

      if (result) {
        const {
          body: {
            hits: { hits, total, max_score }
          }
        }: {
          body: {
            hits: {
              hits: ESSearchResultHitItem[];
              total: { value: number };
              max_score: number;
            };
          };
        } = result;

        return {
          ok: true,
          data: {
            hits: hits.map(({ _id, _index, _score, _source }) => ({
              _id,
              _index,
              _score,
              _content: _source
            })),
            totalResults: total.value,
            maxScore: max_score,
            perPageLimit: paramsDecorated.limit ?? maxResultLimit
          }
        };
      }
    } catch (err) {
      console.dir(err, { depth: null });
      let errorContent: ESErrorType = { reason: JSON.stringify(err) };
      // @ts-ignore
      if (err.meta && err.meta.body && err.meta.body.error) {
        // @ts-ignore
        const esErr: ErrorResponseBase = err.meta.body;
        errorContent = {
          status: esErr.status.toString(),
          reason: esErr.error.reason as string
        };
      }

      return {
        ok: false,
        err: errorContent
      };
    }
    return {
      ok: false,
      err: { reason: 'Unknown error has been occurred' }
    };
  }
}
