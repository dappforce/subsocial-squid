import { Ctx } from '../../processor';
import { DomainRegisteredData } from '../../common/types';
import { getOrCreateAccount } from '../account';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { EventName, Space, Account } from '../../model';
import { u8aToString } from '@polkadot/util';

type UsernameHandlerResult = {
  space?: Space;
  spacePrev?: Space;
  registrarAccount: Account;
  recipientAccount: Account;
  usernameStr: string;
};

export async function handleUsername(
  ctx: Ctx,
  { eventData }: DomainRegisteredData
): Promise<UsernameHandlerResult> {
  const registrarAccount = await getOrCreateAccount(
    eventData.params.accountId,
    ctx
  );
  const recipientAccount = eventData.params.recipientId
    ? await getOrCreateAccount(eventData.params.recipientId, ctx)
    : registrarAccount;
  const usernameStr = eventData.params.domain.toLowerCase();
  const result: UsernameHandlerResult = {
    registrarAccount,
    recipientAccount,
    usernameStr
  };

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const domainStorageData = storageDataManagerInst.getStorageDataById(
    'domain',
    eventData.metadata.blockHash,
    usernameStr
  );

  if (eventData.name === 'Domains.DomainMetaUpdated') {
    /**
     * We need remove current username from Space where it was saved as username
     */
    const previousAssignedSpace = await ctx.store.findOneBy(Space, {
      username: usernameStr
    });

    if (previousAssignedSpace) {
      previousAssignedSpace.username = null;
      previousAssignedSpace.handle = null;
      await ctx.store.save(previousAssignedSpace);
      result.spacePrev = previousAssignedSpace;
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
      space.handle = usernameStr;
      await ctx.store.save(space);
      result.space = space;
    }
  }

  if (!recipientAccount.usernames) {
    recipientAccount.usernames = [usernameStr];
  } else {
    recipientAccount.usernames = [
      ...new Set([...recipientAccount.usernames, usernameStr]).values()
    ];
  }
  await ctx.store.save(recipientAccount);
  return result;
}
