import { describe, expect, test } from '@jest/globals';
import { SubsocialIpfsDataManager } from '../src/ipfs';

describe('IPFS Data manager', () => {
  beforeAll(async () => {});

  test('should fetch data by CID without error', async () => {
    const ipfsManager = SubsocialIpfsDataManager.getInstance();
    const testCidCommon =
      'bafybeic2jz5c4hky6kehmirtla3fka54niuuior2aywgbdy42it7zzfyaa';
    const testCidDag =
      'bafyreih4vh7c26jfflcrsnch5zsjmzmzrlatysdcpzoiysttoe4ycgkmla';

    const commonIpfsData = await ipfsManager.fetchOneByIdHttp(testCidCommon);
    const dagIpfsData = await ipfsManager.fetchOneByIdHttp(testCidDag);

    expect({
      body: 'все четко, движуем 🥳',
      inReplyTo: { id: '3694', kind: 'Post' }
    }).toEqual(commonIpfsData);

    expect({ body: 'тесть ', tags: [] }).toEqual(dagIpfsData);
  });
});
