import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.local.env` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://subsocial.archive.subsquid.io/graphql',
    chain: 'wss://para.f3joule.space'
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
  ipfsReadOnlyNodeUrl:
    process.env.SUBSOCIAL_IPFS_READ_ONLY_NODE_URL ||
    'https://ipfs.subsocial.network',
  ipfsNodeRequestTimeout: 10000
};
