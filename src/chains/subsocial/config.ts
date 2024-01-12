import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.local.env` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://v2.archive.subsquid.io/network/subsocial-parachain',
    chain: 'wss://para.f3joule.space',
    chainRateLimit: 10
  },
  elasticSearchSyncDisabled: !!(
    process.env.SUBSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED &&
    process.env.SUBSOCIAL_ELASTIC_SEARCH_SYNC_DISABLED === 'true'
  ),
  elasticSearchMaxResultLimit:
    process.env.SUBSOCIAL_ELASTIC_SEARCH_MAX_RESULTS_LIMIT || '20',
  elasticSearchEndpoint: process.env.SUBSOCIAL_ELASTIC_SEARCH_ENDPOINT || '',
  elasticSearchUsername: process.env.SUBSOCIAL_ELASTIC_SEARCH_USERNAME || '',
  elasticSearchPassword: process.env.SUBSOCIAL_ELASTIC_SEARCH_PASSWORD || '',
  ipfsSubsocialNodeUrl:
    process.env.SUBSOCIAL_IPFS_READ_ONLY_NODE_URL ||
    'https://ipfs.subsocial.network',
  ipfsNodeRequestTimeout: 10000,
  ipfsCrustNodeAuthToken: process.env.IPFS_CRUST_NODE_TEST_AUTH_TOKEN || '',
  ipfsCrustNodeUrl:
    process.env.IPFS_CRUST_NODE_URL || 'https://gw-seattle.crustcloud.io',
  offchainServiceUrl:
    process.env.OFFCHAIN_URL ||
    'https://app.subsocial.network/network/offchain',
};
