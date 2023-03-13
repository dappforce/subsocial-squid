import { IpfsCommonContent } from '@subsocial/api/types/ipfs';
import axios from 'axios';
import envConfig from '../config';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { CID_KIND, IpfsCid, Headers } from './types';
import { asIpfsCid } from './utils';
import { Ctx } from '../processor';
import { getChain } from '../chains';
const chainConfig = getChain();

export class IpfsDataManager {
  private static instance: IpfsDataManager;

  private ipfsClient!: IPFSHTTPClient;

  private ipfsReadOnlyNodeUrl: string = chainConfig.config.ipfsReadOnlyNodeUrl;

  constructor(private processorContext: Ctx) {
    this.createIpfsClient();
  }

  static getInstance(ctx: Ctx): IpfsDataManager {
    if (!IpfsDataManager.instance) {
      IpfsDataManager.instance = new IpfsDataManager(ctx);
    }
    return IpfsDataManager.instance;
  }

  private createIpfsClient(headers?: Headers) {
    this.ipfsClient = create({
      url: this.ipfsReadOnlyNodeUrl + '/api/v0',
      headers
    });
  }

  async fetchOneByIdHttp(
    ipfsCid: IpfsCid,
    logger?: (msg: string | null) => Promise<void>
  ): Promise<IpfsCommonContent | null> {
    let res = null;

    try {
      res = await this.fetchContent(ipfsCid, 10000);
      this.processorContext.log
        .child('ipfs')
        .info(`Response by CID - ${ipfsCid.toString()} => SUCCESSFUL`);
      await new Promise((res) => setTimeout(res, 50));
    } catch (e) {
      this.processorContext.log
        .child('ipfs')
        .info(`Response by CID - ${ipfsCid.toString()} => with ERROR`);
      console.log(e);
      if (logger) await logger(e ? e.toString() : null);
    }
    // @ts-ignore
    return res;
  }

  private async fetchContent(cid: IpfsCid, timeout?: number) {
    // TODO remove debug mode
    // return null;
    const cidEnsured = asIpfsCid(cid);

    if (!cidEnsured) return null;

    const isCbor = cidEnsured.code === CID_KIND.CBOR;

    if (isCbor) {
      const res = await this.ipfsClient.dag.get(cidEnsured, { timeout });
      return res.value;
    } else {
      const res = await axios.get(
        `${
          this.ipfsReadOnlyNodeUrl
        }/ipfs/${cidEnsured.toV1()}?timeout=${timeout}`,
        {
          responseType: 'arraybuffer'
        }
      );

      const data = new Uint8Array(res.data);
      return JSON.parse(String.fromCharCode(...data));
    }
  }
}
