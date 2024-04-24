import { Account, Activity, EventName, Post, Space } from '../../model';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import {
  OwnershipTransferCreatedEventParsedData,
  OwnershipTransferOwnershipCreatedData
} from '../../common/types';
import { setActivity } from '../activity';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { getOrCreateAccount } from '../account';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { OwnableEntityKind } from '@subsocial/data-hub-sdk';

export async function ownershipTransferCreated(
  ctx: Ctx,
  { callData, eventData }: OwnershipTransferOwnershipCreatedData
): Promise<void> {
  const currentOwnerAccount = await getOrCreateAccount(
    eventData.params.currentOwnerId,
    ctx
  );
  const newOwnerAccount = await getOrCreateAccount(
    eventData.params.newOwnerId,
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
      await handleSpaceOwnershipTransferCreated({
        space: entity,
        newOwner: newOwnerAccount,
        currentOwner: currentOwnerAccount,
        ctx,
        eventData
      });
      break;
    }
    case OwnableEntityKind.Post: {
      const entity = await ctx.store.get(Post, eventData.params.entity.id);
      if (!entity) {
        new EntityProvideFailWarning(
          Post,
          eventData.params.entity.id,
          ctx,
          eventData.metadata
        );
        throw new CommonCriticalError();
      }

      await handlePostOwnershipTransferCreated({
        post: entity,
        newOwner: newOwnerAccount,
        currentOwner: currentOwnerAccount,
        ctx,
        eventData
      });
      break;
    }

    case OwnableEntityKind.Domain: {
      await handleDomainOwnershipTransferCreated({
        domain: eventData.params.entity.id,
        newOwner: newOwnerAccount,
        currentOwner: currentOwnerAccount,
        ctx,
        eventData
      });
      break;
    }
  }
}

async function handleSpaceOwnershipTransferCreated({
  space,
  newOwner,
  currentOwner,
  ctx,
  eventData
}: {
  space: Space;
  currentOwner: Account;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferCreatedEventParsedData;
}) {
  const activity = await setActivity({
    account: currentOwner,
    newOwner: newOwner,
    space,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData.metadata);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    EventName.SpaceOwnershipTransferCreated,
    {
      account: currentOwner,
      newOwner: newOwner,
      space,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    EventName.SpaceOwnershipTransferCreated,
    {
      account: currentOwner,
      newOwner: newOwner,
      space,
      activity,
      ctx
    }
  );
}

async function handlePostOwnershipTransferCreated({
  post,
  newOwner,
  currentOwner,
  ctx,
  eventData
}: {
  post: Post;
  currentOwner: Account;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferCreatedEventParsedData;
}) {
  const activity = await setActivity({
    account: currentOwner,
    newOwner: newOwner,
    post,
    ctx,
    eventMetadata: eventData.metadata
  });
}

async function handleDomainOwnershipTransferCreated({
  domain,
  newOwner,
  currentOwner,
  ctx,
  eventData
}: {
  domain: string;
  currentOwner: Account;
  newOwner: Account;
  ctx: Ctx;
  eventData: OwnershipTransferCreatedEventParsedData;
}) {
  const activity = await setActivity({
    account: currentOwner,
    newOwner: newOwner,
    username: domain,
    ctx,
    eventMetadata: eventData.metadata
  });
}
