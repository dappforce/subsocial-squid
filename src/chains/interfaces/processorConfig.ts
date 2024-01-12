import { SubstrateBatchProcessor } from '@subsquid/substrate-processor';

export interface ProcessorConfig {
  chainName: string;
  prefix?: number | string;
  dataSource: { archive: string; chain: string; chainRateLimit: number };
  blockRange?: Parameters<SubstrateBatchProcessor<any>['setBlockRange']>[0];
  elasticSearchSyncDisabled: boolean;
  elasticSearchMaxResultLimit: string;
  elasticSearchEndpoint: string;
  elasticSearchUsername: string;
  elasticSearchPassword: string;
  ipfsSubsocialNodeUrl: string;
  ipfsNodeRequestTimeout: number;
  ipfsCrustNodeAuthToken: string;
  ipfsCrustNodeUrl: string;
  offchainServiceUrl: string;
}
