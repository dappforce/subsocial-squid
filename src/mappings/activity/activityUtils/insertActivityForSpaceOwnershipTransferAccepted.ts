import { Account, Activity, EventName, Space } from '../../../model';
import { Ctx } from '../../../processor';
import { updateAggregatedStatus } from './aggregationUtils';

type InsertActivityForSpaceOwnershipTransferParams = {
  space: Space;
  oldOwner: Account;
  activity: Activity;
  ctx: Ctx;
};

export async function insertActivityForSpaceOwnershipTransferAccepted(
  params: InsertActivityForSpaceOwnershipTransferParams
): Promise<Activity> {
  const { activity, oldOwner, space, ctx } = params;

  activity.space = space;
  activity.newOwner = space.ownedByAccount;
  activity.oldOwner = oldOwner;
  activity.aggregated = true;
  activity.aggCount = BigInt(0);

  await updateAggregatedStatus({
    eventName: activity.event,
    space,
    ctx
  });

  await updateAggregatedStatus({
    eventName: EventName.SpaceOwnershipTransferCreated,
    space,
    ctx
  });

  return activity;
}
