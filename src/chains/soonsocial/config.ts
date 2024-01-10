import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.local.env` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://soonsocial.archive.subsquid.io/graphql',
    chain: 'wss://rco-para.subsocial.network'
  },
  elasticSearchSyncDisabled: !!(
    process.env.SOONSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED &&
    process.env.SOONSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED === 'true'
  ),
  elasticSearchMaxResultLimit:
    process.env.SOONSOCIAL_ELASTIC_SEARCH_MAX_RESULTS_LIMIT || '20',
  elasticSearchEndpoint: process.env.SOONSOCIAL_ELASTIC_SEARCH_ENDPOINT || '',
  elasticSearchUsername: process.env.SOONSOCIAL_ELASTIC_SEARCH_USERNAME || '',
  elasticSearchPassword: process.env.SOONSOCIAL_ELASTIC_SEARCH_PASSWORD || '',
  ipfsSubsocialNodeUrl:
    process.env.SOONSOCIAL_IPFS_READ_ONLY_NODE_URL ||
    'https://ipfs.subsocial.network',
  ipfsNodeRequestTimeout: 10000,
  ipfsCrustNodeAuthToken: process.env.IPFS_CRUST_NODE_TEST_AUTH_TOKEN || '',
  ipfsCrustNodeUrl:
    process.env.IPFS_CRUST_NODE_URL || 'https://gw-seattle.crustcloud.io'
};
