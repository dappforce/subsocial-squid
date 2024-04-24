import { Account, Activity, EventName, Post, Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import {
  OwnershipTransferAcceptedData,
  OwnershipTransferAcceptedEventParsedData,
  OwnershipTransferCreatedEventParsedData
} from '../../common/types';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { getOrCreateAccount } from '../account';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { OwnableEntityKind } from '@subsocial/data-hub-sdk';
import { ArrayContains } from 'typeorm';

export async function ownershipTransferAccepted(
  ctx: Ctx,
  { callData, eventData }: OwnershipTransferAcceptedData
): Promise<void> {
  const newOwnerAccount = await getOrCreateAccount(
    eventData.params.accountId,
    ctx
  );

  switch (eventData.params.entity.kind) {
    case OwnableEntityKind.Space: {
      const entity = await getEntityWithRelations.space(
        eventData.params.entity.id,
        ctx
      );
      if (!entity) {
        new EntityProvideFailWarning(
          Space,
          eventData.params.entity.id,
          ctx,
          eventData.metadata
        );
        throw new CommonCriticalError();
      }
      await handleSpaceOwnershipTransferAccepted({
        space: entity,
        newOwner: newOwnerAccount,
        ctx,
        eventData
      });
      break;
    }
    case OwnableEntityKind.Post: {
      const entity = await ctx.store.get(Post, {
        where: {
          id: eventData.params.entity.id
        },
        relations: {
          ownedByAccount: true
        }
      });
      if (!entity) {
        new EntityProvideFailWarning(
          Space,
          eventData.params.entity.id,
          ctx,
          eventData.metadata
        );
        throw new CommonCriticalError();
      }

      await handlePostOwnershipTransferAccepted({
        post: entity,
        newOwner: newOwnerAccount,
        ctx,
        eventData
      });
      break;
    }

    case OwnableEntityKind.Domain: {
      await handleDomainOwnershipTransferAccepted({
        domain: eventData.params.entity.id,
        newOwner: newOwnerAccount,
        ctx,
        eventData
      });
      break;
    }
  }
}

async function handleSpaceOwnershipTransferAccepted({
  space,
  newOwner,
  ctx,
  eventData
}: {
  space: Space;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferAcceptedEventParsedData;
}) {
  const oldOwnerAccount = space.ownedByAccount;

  space.ownedByAccount = newOwner;

  await ctx.store.save(space);

  const activity = await setActivity({
    account: eventData.params.accountId,
    oldOwner: oldOwnerAccount,
    space,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceOwnershipTransferAccepted,
    {
      account: space.ownedByAccount,
      oldOwner: oldOwnerAccount,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceOwnershipTransferAccepted,
    {
      account: space.ownedByAccount,
      oldOwner: oldOwnerAccount,
      space,
      activity,
      ctx
    }
  );
}

async function handlePostOwnershipTransferAccepted({
  post,
  newOwner,
  ctx,
  eventData
}: {
  post: Post;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferAcceptedEventParsedData;
}) {
  const oldOwnerAccount = post.ownedByAccount;

  post.ownedByAccount = newOwner;

  await ctx.store.save(post);

  const activity = await setActivity({
    account: oldOwnerAccount,
    newOwner: newOwner,
    post,
    ctx,
    eventMetadata: eventData.metadata
  });
}

async function handleDomainOwnershipTransferAccepted({
  domain,
  newOwner,
  ctx,
  eventData
}: {
  domain: string;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferAcceptedEventParsedData;
}) {
  const oldOwnerAccount = await ctx.store.findOne(Account, {
    where: { usernames: ArrayContains([domain]) }
  });
  if (oldOwnerAccount) {
    oldOwnerAccount.usernames = (oldOwnerAccount.usernames || []).filter(
      (uname) => uname !== domain
    );
    await ctx.store.save(oldOwnerAccount);
  }
  newOwner.usernames = [...(newOwner.usernames || []), domain];

  await ctx.store.save(newOwner);

  const activity = await setActivity({
    account: newOwner,
    oldOwner: oldOwnerAccount,
    username: domain,
    ctx,
    eventMetadata: eventData.metadata
  });
}
