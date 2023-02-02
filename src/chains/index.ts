import {
  ApiDecorator,
  ChainApi,
  ChainApiDecorated,
  ChainName
} from './interfaces/chainApi';
import { ProcessorConfig } from './interfaces/processorConfig';

function withDecorator({
  config,
  api
}: {
  config: ProcessorConfig;
  api: ChainApi;
}): {
  config: ProcessorConfig;
  api: ChainApi;
  getApiDecorated: ApiDecorator;
} {
  return {
    config,
    api,
    getApiDecorated: <C extends ChainName>(c: C) => api as ChainApiDecorated<C>
  };
}

export function getChain(): {
  config: ProcessorConfig;
  api: ChainApi;
  getApiDecorated: ApiDecorator;
} {
  switch (process.env.CHAIN) {
    // case 'crust':
    //     return require('./crust')
    case 'subsocial':
      return withDecorator(require('./subsocial'));
    case 'soonsocial':
      return withDecorator(require('./soonsocial'));
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`);
  }
}
