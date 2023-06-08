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
import { addressStringToSs58 } from '../common/utils';
import { SubsocialIpfsDataManager } from '../ipfs';
import {
  StorageSection,
  BlochHash,
  EntityId,
  StorageData,
  IpfsContent
} from './types';
import { getChain } from '../chains';

const { getApiDecorated } = getChain();

export class StorageDataManager {
  private static instance: StorageDataManager;

  public idsForFetchStorage: Map<
    StorageSection,
    Map<
      BlochHash,
      Set<[EntityId, string | null] | [Uint8Array, InnerValue] | Uint8Array>
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
    blockHash: string
  ) {
    if (!this.idsForFetchStorage.has(section))
      this.idsForFetchStorage.set(section, new Map());
    if (!this.idsForFetchStorage.get(section)!.has(blockHash))
      this.idsForFetchStorage.get(section)!.set(blockHash, new Set());
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
            this.ensureIdsForFetchContainer('domain', event.blockHash);

            this.idsForFetchStorage
              .get('domain')!
              .get(event.blockHash)!
              .add(event.domain);
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
          for (const [blockHash, idsPairs] of [...idsListByBlock.entries()]) {
            const domainsList = [...idsPairs.values()] as Uint8Array[];
            const domainsMetaResp = (await api.storage.getRegisteredDomainMeta(
              this.context,
              { hash: blockHash },
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
