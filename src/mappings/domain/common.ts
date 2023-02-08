import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { EventName, Space, Account } from '../../model';

type UsernameHandlerResult = {
  space?: Space;
  spacePrev?: Space;
  account: Account;
  usernameStr: string;
};

export async function handleUsername(
  ctx: Ctx,
  eventData: DomainRegisteredData
): Promise<UsernameHandlerResult> {
  const account = await getOrCreateAccount(eventData.accountId, ctx);
  const usernameStr = eventData.domain.toString();
  const result: UsernameHandlerResult = {
    account: account,
    usernameStr
  };

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const domainStorageData = storageDataManagerInst.getStorageDataById(
    'domain',
    eventData.blockHash,
    usernameStr
  );

  if (eventData.name === 'Domains.DomainMetaUpdated') {
    /**
     * We need remove current username from Space where it was saved as username
     */
    const previousAssignedSpaces = await ctx.store.findOneBy(Space, {
      username: usernameStr
    });

    if (previousAssignedSpaces) {
      previousAssignedSpaces.username = null;
      await ctx.store.save(previousAssignedSpaces);
      result.spacePrev = previousAssignedSpaces;
    }
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
      result.space = space;
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
  return result;
}
