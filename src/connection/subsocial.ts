import { SubsocialApi } from '@subsocial/api';

let subsocial: SubsocialApi;

import { getChain } from '../chains';

const { config } = getChain();

const ipfsConfig = {
  ipfsNodeUrl: config.ipfsSubsocialNodeUrl,
  offchainUrl: config.offchainServiceUrl
};

export const resolveSubsocialApi = async (): Promise<SubsocialApi> => {
  // Connect to Subsocial's Substrate node:

  if (subsocial) return subsocial;
  subsocial = await SubsocialApi.create({
    substrateNodeUrl: config.dataSource.chain,
    ...ipfsConfig
  });

  // await subsocial.ipfs.getContentArray('99s3msd32cs');

  return subsocial;
};
