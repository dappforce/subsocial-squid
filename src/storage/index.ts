import { Ctx } from '../processor';
import { EventName } from '../model';
import { ParsedEventsDataScope } from '../eventsCallsData';

import {
  SpaceStorageData,
  PostStorageData,
  SpaceCreatedData,
  SpaceUpdatedData,
  DomainRegisteredData,
  DomainMetaUpdatedData,
  DomainStorageData
} from '../common/types';
import { InnerValue } from '../chains/interfaces/sharedTypes';
import { SubsocialIpfsDataManager } from '../ipfs';
import {
  StorageSection,
  BlochHash,
  EntityId,
  StorageData,
  IpfsContent
} from './types';
import { getChain } from '../chains';
import { stringToHex } from '@polkadot/util';
import { Block as StorageBlock } from '../chains/subsocial/types/support';

const { getApiDecorated } = getChain();

export class StorageDataManager {
  private static instance: StorageDataManager;

  public idsForFetchStorage: Map<
    StorageSection,
    Map<
      BlochHash,
      {
        block: StorageBlock;
        keys: Set<
          | [EntityId, string | null]
          | [Uint8Array, InnerValue]
          | Uint8Array
          | string
        >;
      }
    >
  > = new Map();

  public storageDataCache: Map<
    StorageSection,
    Map<
      BlochHash,
      Map<EntityId, SpaceStorageData | PostStorageData | DomainStorageData>
    >
  > = new Map([
    ['domain', new Map()],
    ['space', new Map()],
    ['post', new Map()]
  ]);

  private ipfsDataManager: SubsocialIpfsDataManager;

  private constructor(private context: Ctx) {
    this.ipfsDataManager = SubsocialIpfsDataManager.getInstance(context);
  }

  static getInstance(ctx: Ctx): StorageDataManager {
    if (!StorageDataManager.instance) {
      StorageDataManager.instance = new StorageDataManager(ctx);
    }
    return StorageDataManager.instance;
  }

  purgeStorage() {
    this.storageDataCache.clear();
  }

  public getStorageDataById<T extends StorageSection>(
    section: T,
    blockHash: string,
    entityId: EntityId
  ): StorageData<T> | undefined {
    this.ensureStorageDataCacheContainer(section, blockHash);
    return this.storageDataCache.get(section)!.get(blockHash)!.get(entityId) as
      | StorageData<T>
      | undefined;
  }

  public async fetchIpfsContentByCid<T extends StorageSection>(
    section: T,
    cid: string | null,
    fetchErrorLogger?: (msg: string | null) => Promise<void>
  ): Promise<IpfsContent<T> | null> {
    if (!cid) return null;
    const res = await this.ipfsDataManager.fetchOneByIdHttp(
      cid,
      fetchErrorLogger
    );
    if (!res) return null;
    return res as IpfsContent<T>;
  }

  private ensureIdsForFetchContainer(
    section: StorageSection,
    block: StorageBlock
  ) {
    if (!this.idsForFetchStorage.has(section))
      this.idsForFetchStorage.set(section, new Map());
    if (!this.idsForFetchStorage.get(section)!.has(block.hash))
      this.idsForFetchStorage.get(section)!.set(block.hash, {
        keys: new Set(),
        block
      });
  }
  private ensureStorageDataCacheContainer(
    section: StorageSection,
    blockHash: string
  ) {
    if (!this.storageDataCache.has(section))
      this.storageDataCache.set(section, new Map());
    if (!this.storageDataCache.get(section)!.has(blockHash))
      this.storageDataCache.get(section)!.set(blockHash, new Map());
  }

  async fetchStorageDataByEventsData(
    parsedEvents: ParsedEventsDataScope
  ): Promise<void> {
    const api = getApiDecorated('subsocial');

    for (const [eventName, eventsData] of [...parsedEvents.entries()]) {
      switch (eventName) {
        case EventName.UserNameRegistered:
        case EventName.UserNameUpdated: {
          for (const event of [
            ...eventsData.values()
          ] as (DomainRegisteredData & DomainMetaUpdatedData)[]) {
            this.ensureIdsForFetchContainer('domain', {
              hash: event.eventData.metadata.blockHash,
              height: event.eventData.metadata.blockNumber,
              _runtime: event.eventData.metadata.runtime
            });

            this.idsForFetchStorage
              .get('domain')!
              .get(event.eventData.metadata.blockHash)!
              .keys.add(stringToHex(event.eventData.params.domain));
          }
          break;
        }

        default:
      }
    }

    for (const [section, idsListByBlock] of [
      ...this.idsForFetchStorage.entries()
    ]) {
      switch (section) {
        case 'domain': {
          for (const [blockHash, idsPairsAndBlock] of [
            ...idsListByBlock.entries()
          ]) {
            const domainsList = [...idsPairsAndBlock.keys.values()] as string[];
            const domainsMetaResp = (await api.storage.getRegisteredDomainMeta(
              idsPairsAndBlock.block,
              domainsList
            )) as (DomainStorageData | undefined)[] | undefined;

            if (!domainsMetaResp) break;

            this.ensureStorageDataCacheContainer(section, blockHash);

            for (let i = 0; i < domainsList.length; i++) {
              const domainStr = domainsList[i].toString();
              const domainMetaData: DomainStorageData | undefined =
                domainsMetaResp && domainsMetaResp[i]
                  ? domainsMetaResp[i]
                  : undefined;

              if (!domainMetaData) continue;
              this.storageDataCache
                .get(section)!
                .get(blockHash)!
                .set(domainStr, domainMetaData);
            }
          }

          break;
        }

        default:
      }
    }

    this.idsForFetchStorage.clear();
  }
}

//bafyreifqh4aypitnfmtitmo42z2s7332rteiahifb4kx5giutt747kcbgi
//bafyreicioe3rt5zwth5fjbnihvsmgvyxcrzxxttiflwccb3fcy34nrdfqa
//bafyreiax5h44a5t6sfcx4haijhabj7kc4qya7inal4ltqc3mhkdjtlnlkm
//bafyreifu3o6iea7qt64e24mdcx65f3ogqf25jpuf6guioq4ko5dbenxvjy
