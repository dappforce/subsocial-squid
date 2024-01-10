import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.local.env` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://v2.archive.subsquid.io/network/xsocial',
    chain: 'wss://xsocial.subsocial.network',
    chainRateLimit: 10
  },
  elasticSearchSyncDisabled: !!(
    process.env.XSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED &&
    process.env.XSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED === 'true'
  ),
  elasticSearchMaxResultLimit:
    process.env.XSOCIAL_ELASTIC_SEARCH_MAX_RESULTS_LIMIT || '20',
  elasticSearchEndpoint: process.env.XSOCIAL_ELASTIC_SEARCH_ENDPOINT || '',
  elasticSearchUsername: process.env.XSOCIAL_ELASTIC_SEARCH_USERNAME || '',
  elasticSearchPassword: process.env.XSOCIAL_ELASTIC_SEARCH_PASSWORD || '',
  ipfsNodeRequestTimeout: 10000,
  ipfsSubsocialNodeUrl:
    process.env.XSOCIAL_IPFS_READ_ONLY_NODE_URL ||
    'https://ipfs.subsocial.network',
  ipfsCrustNodeAuthToken: process.env.IPFS_CRUST_NODE_TEST_AUTH_TOKEN || '',
  ipfsCrustNodeUrl:
    process.env.IPFS_CRUST_NODE_URL || 'https://gw-seattle.crustcloud.io'
};
