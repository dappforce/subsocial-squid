import { ProcessorConfig } from '../interfaces/processorConfig';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env.local` });

export const config: ProcessorConfig = {
  chainName: 'subsocial',
  prefix: 'subsocial',
  dataSource: {
    archive: 'https://soonsocial.archive.subsquid.io/graphql',
    chain: 'wss://rco-para.subsocial.network'
  },
  elasticSearchEndpoint: process.env.SOONSOCIAL_ELASTIC_SEARCH_ENDPOINT || '',
  elasticSearchUsername: process.env.SOONSOCIAL_ELASTIC_SEARCH_USERNAME || '',
  elasticSearchPassword: process.env.SOONSOCIAL_ELASTIC_SEARCH_PASSWORD || '',
  ipfsReadOnlyNodeUrl:
    process.env.SOONSOCIAL_IPFS_READ_ONLY_NODE_URL || 'https://ipfs.subsocial.network',
};
