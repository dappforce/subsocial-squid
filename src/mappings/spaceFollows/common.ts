import { Account, Space, SpaceFollowers, EventName } from '../../model';
import {
  getSpaceFollowersEntityId,
  decorateEventName
} from '../../common/utils';
import { getOrCreateAccount } from '../account';
import { EventData } from '../../common/types';
import { Ctx } from '../../processor';

export async function processSpaceFollowingUnfollowingRelations(
  follower: Account | string,
  space: Space,
  ctx: Ctx,
  eventData: EventData
): Promise<void> {
  if (!space) return;
  const followerAccountInst =
    follower instanceof Account
      ? follower
      : await getOrCreateAccount(follower, ctx);

  const { name: eventName } = eventData;
  const eventNameDecorated = decorateEventName(eventName);

  const spaceFollowersEntityId = getSpaceFollowersEntityId(
    followerAccountInst.id,
    space.id
  );

  const spaceFollowers = await ctx.store.get(
    SpaceFollowers,
    spaceFollowersEntityId
  );

  let currentSpaceFollowersCount = space.followersCount || 0;

  if (
    eventNameDecorated === EventName.SpaceFollowed ||
    eventNameDecorated === EventName.SpaceCreated
  ) {
    if (spaceFollowers) return;
    currentSpaceFollowersCount += 1;

    const newSpaceFollowersEnt = new SpaceFollowers();

    newSpaceFollowersEnt.id = spaceFollowersEntityId;
    newSpaceFollowersEnt.followerAccount = followerAccountInst;
    newSpaceFollowersEnt.followingSpace = space;

    await ctx.store.save(newSpaceFollowersEnt);
  } else if (eventNameDecorated === EventName.SpaceUnfollowed) {
    if (!spaceFollowers) return;
    currentSpaceFollowersCount -= 1;
    await ctx.store.remove(SpaceFollowers, spaceFollowers.id);
  }

  space.followersCount = currentSpaceFollowersCount;

  await ctx.store.save(space);
}
