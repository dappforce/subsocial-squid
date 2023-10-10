import { IpfsCommonContent } from '@subsocial/api/types/ipfs';
import axios from 'axios';
import envConfig from '../config';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { CID_KIND, IpfsCid, Headers } from './types';
import { asIpfsCid } from './utils';
import { Ctx } from '../processor';
import { getChain } from '../chains';
import { SubsocialIpfsApi } from '@subsocial/api';
import { ProcessorConfig } from '../chains/interfaces/processorConfig';
const chainConfig = getChain();

export class IpfsDataManager {
  private static instance: IpfsDataManager;

  private ipfsClient!: IPFSHTTPClient;

  private ipfsSubsocialNodeUrl: string =
    chainConfig.config.ipfsSubsocialNodeUrl;

  constructor(private processorContext?: Ctx) {
    this.createIpfsClient();
  }

  static getInstance(ctx?: Ctx): IpfsDataManager {
    if (!IpfsDataManager.instance) {
      IpfsDataManager.instance = new IpfsDataManager(ctx);
    }
    return IpfsDataManager.instance;
  }

  private createIpfsClient(headers?: Headers) {
    this.ipfsClient = create({
      url: this.ipfsSubsocialNodeUrl + '/api/v0',
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

      this.processorContext
        ? this.processorContext.log
            .child('ipfs')
            .info(`Response by CID - ${ipfsCid.toString()} => SUCCESSFUL`)
        : console.log(`Response by CID - ${ipfsCid.toString()} => SUCCESSFUL`);

      await new Promise((res) => setTimeout(res, 50));
    } catch (e) {
      this.processorContext
        ? this.processorContext.log
            .child('ipfs')
            .info(`Response by CID - ${ipfsCid.toString()} => with ERROR`)
        : console.log(`Response by CID - ${ipfsCid.toString()} => with ERROR`);
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
          this.ipfsSubsocialNodeUrl
        }/ipfs/${cidEnsured.toV1()}?timeout=${timeout}`,
        {
          // responseType: 'arraybuffer'
        }
      );

      const data = new Uint8Array(res.data);
      console.dir(String.fromCharCode(...data), { depth: null });
      return JSON.parse(String.fromCharCode(...data));
    }
  }
}

export class SubsocialIpfsDataManager {
  private static instance: SubsocialIpfsDataManager;

  private chainConfig: ProcessorConfig = chainConfig.config;

  private ipfsClientSubsocial!: SubsocialIpfsApi;
  private ipfsClientCrust!: SubsocialIpfsApi;

  constructor(private processorContext?: Ctx) {
    this.createIpfsClients();
  }

  static getInstance(ctx?: Ctx): SubsocialIpfsDataManager {
    if (!SubsocialIpfsDataManager.instance) {
      SubsocialIpfsDataManager.instance = new SubsocialIpfsDataManager(ctx);
    }
    return SubsocialIpfsDataManager.instance;
  }

  private createIpfsClients(headers?: Headers) {
    this.ipfsClientSubsocial = new SubsocialIpfsApi({
      ipfsNodeUrl: this.chainConfig.ipfsSubsocialNodeUrl
    });
    this.ipfsClientCrust = new SubsocialIpfsApi({
      ipfsNodeUrl: this.chainConfig.ipfsCrustNodeUrl
    });

    if (
      this.chainConfig.ipfsCrustNodeAuthToken &&
      this.chainConfig.ipfsCrustNodeAuthToken.length > 0
    ) {
      this.ipfsClientCrust.setWriteHeaders({
        authorization: this.chainConfig.ipfsCrustNodeAuthToken
      });
      this.ipfsClientCrust.setPinHeaders({
        authorization: this.chainConfig.ipfsCrustNodeAuthToken
      });
    }
  }

  async fetchOneByIdHttp(
    ipfsCid: IpfsCid,
    logger?: (msg: string | null) => Promise<void>
  ): Promise<IpfsCommonContent | null> {
    let res = null;

    try {
      res = await this.fetchContent(ipfsCid, 5000);

      this.processorContext
        ? this.processorContext.log
            .child('ipfs')
            .info(
              `Response by CID - ${ipfsCid.toString()} => SUCCESSFUL (isNull == ${!res})`
            )
        : console.log(
            `Response by CID - ${ipfsCid.toString()} => SUCCESSFUL (isNull == ${!res})`
          );

      await new Promise((res) => setTimeout(res, 50));
    } catch (e) {
      this.processorContext
        ? this.processorContext.log
            .child('ipfs')
            .info(`Response by CID - ${ipfsCid.toString()} => with ERROR`)
        : console.log(`Response by CID - ${ipfsCid.toString()} => with ERROR`);
      console.log(e);
      if (logger) await logger(e ? e.toString() : null);
    }
    // @ts-ignore
    return res;
  }

  private async fetchContent(cid: IpfsCid, timeout: number = 1000) {
    // TODO remove debug mode
    // return null;

    // try {
    //   console.log(`ipfsClientSubsocial - ${cid}`);
    //   return (
    //     (await this.fetchWithRetry(
    //       () => this.ipfsClientSubsocial.getContent(cid, timeout),
    //       cid
    //     )) ?? null
    //   );
    // } catch (e) {
    //   console.log('ipfsClientCrust - ', cid);
    //   return (
    //     (await this.fetchWithRetry(
    //       () => this.ipfsClientCrust.getContent(cid, timeout),
    //       cid
    //     )) ?? null
    //   );
    // }

    // try {
    //   const data = await this.ipfsClientSubsocial.getContent(cid, timeout);
    //   return data ?? null;
    // } catch (e) {
    //   return null;
    // }

    if (!cid) return null;

    return new Promise(async (res, rej) => {
      let count = 0;
      let interval: NodeJS.Timer | undefined = setInterval(() => {
        const cidLog = cid;
        count++;
        if (count >= timeout / 1000) {
          clearInterval(interval);
          interval = undefined;
          console.log(
            `fetchWithRetry has been interrupted by too long execution - ${cidLog.toString()}`
          );
          res(null);
        }
      }, 1000);

      const resp =
        (await this.ipfsClientSubsocial.getContent(cid, timeout)) ?? null;
      if (interval) clearInterval(interval);

      res(resp);
    });

    // try {
    //   console.log(`ipfsClientSubsocial - ${cid}`);
    //   const data = await this.ipfsClientSubsocial.getContent(cid, timeout);
    //   if (!data)
    //     throw Error('ipfsClientSubsocial.getContent finished with ERROR');
    //
    //   return data;
    // } catch (e) {
    //   console.log('ipfsClientCrust - ', cid);
    //   return (
    //     (await this.fetchWithRetry(
    //       () => this.ipfsClientCrust.getContent(cid, timeout),
    //       cid
    //     )) ?? null
    //   );
    // }
  }

  private async fetchWithRetry(
    fetchFn: () => Promise<IpfsCommonContent | undefined>,
    cid: IpfsCid,
    timeout?: 1000
  ) {
    return new Promise(async (res, rej) => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count >= 60) {
          clearInterval(interval);
          this.processorContext
            ? this.processorContext.log
                .child('ipfs')
                .info(
                  `fetchWithRetry has been interrupted by too long execution - ${cid.toString()}`
                )
            : console.log(
                `fetchWithRetry has been interrupted by too long execution - ${cid.toString()}`
              );
          rej(
            new Error(
              `fetchWithRetry has been interrupted by too long execution - ${cid.toString()}`
            )
          );
        }
      }, 1000);

      try {
        const resp = await fetchFn();
        if (!resp) throw new Error();
        res(resp);
      } catch (e) {
        await new Promise((timeoutRes) =>
          setTimeout(() => timeoutRes, timeout)
        );
        const resp = await fetchFn();
        res(resp);
      }
    });
  }
}
