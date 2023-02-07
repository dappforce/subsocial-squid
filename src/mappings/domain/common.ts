import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { EventName, Space } from '../../model';

export async function handleUsername(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<void> {
  const account = await getOrCreateAccount(eventData.accountId, ctx);
  const usernameStr = eventData.domain.toString();

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const domainStorageData = storageDataManagerInst.getStorageDataById(
    'domain',
    eventData.blockHash,
    usernameStr
  );

  if (eventData.name === 'Domains.DomainMetaUpdated') {
    /**
     * We need remove current username from Spaces where it was saved as username
     */
    const previousAssignedSpaces = await ctx.store.findBy(Space, {
      username: usernameStr
    });
    const updatedSpaces = [];
    for (const space of previousAssignedSpaces) {
      space.username = null;
      updatedSpaces.push(space);
    }
    if (updatedSpaces.length > 0) await ctx.store.save(updatedSpaces);
  }

  /**
   * If SpaceId is provided in event data, current username must be saved in new Space.
   */
  if (domainStorageData && domainStorageData.innerValue) {
    const space = await getEntityWithRelations.space(
      domainStorageData.innerValue.toString(),
      ctx
    );
    if (space) {
      space.username = usernameStr;
      await ctx.store.save(space);
    }
  }

  if (!account.usernames) {
    account.usernames = [usernameStr];
  } else {
    account.usernames = [
      ...new Set([...account.usernames, usernameStr]).values()
    ];
  }
  await ctx.store.save(account);
}
