import { SubsocialElasticApi } from '@subsocial/elasticsearch';
import { Ctx } from '../processor';
import { getChain } from '../chains';
import { ElasticSearchIndexerManager } from './esIndex';
import { ElasticSearchSearchManager } from './esSearch';
const chainConfig = getChain();

export class ElasticSearchManager {
  protected static esClient: SubsocialElasticApi;

  static _getESClientInstance() {
    if (chainConfig.config.elasticSearchSyncDisabled) return null;
    if (!ElasticSearchManager.esClient) {
      ElasticSearchManager.esClient = new SubsocialElasticApi({
        url: chainConfig.config.elasticSearchEndpoint,
        auth: {
          username: chainConfig.config.elasticSearchUsername,
          password: chainConfig.config.elasticSearchPassword
        },
        ssl: false
      });
    }
    return ElasticSearchManager.esClient;
  }

  static index(processorContext?: Ctx) {
    return ElasticSearchIndexerManager.getInstance(
      ElasticSearchManager._getESClientInstance(),
      processorContext
    );
  }
  static search(processorContext?: Ctx) {
    return ElasticSearchSearchManager.getInstance(
      ElasticSearchManager._getESClientInstance(),
      processorContext
    );
  }
}
