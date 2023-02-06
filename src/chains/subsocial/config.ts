import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env.local` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://subsocial.archive.subsquid.io/graphql',
    chain: 'wss://para.f3joule.space'
  },
  elasticSearchEndpoint: process.env.SUBSOCIAL_ELASTIC_SEARCH_ENDPOINT || '',
  elasticSearchUsername: process.env.SUBSOCIAL_ELASTIC_SEARCH_USERNAME || '',
  elasticSearchPassword: process.env.SUBSOCIAL_ELASTIC_SEARCH_PASSWORD || '',
  ipfsReadOnlyNodeUrl:
    process.env.SUBSOCIAL_IPFS_READ_ONLY_NODE_URL || 'https://ipfs.subsocial.network',
};
