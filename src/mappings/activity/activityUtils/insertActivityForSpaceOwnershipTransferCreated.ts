import { Account, Activity, Space } from '../../../model';
import { Ctx } from '../../../processor';
import { updateAggregatedStatus } from './aggregationUtils';

type InsertActivityForSpaceOwnershipTransferCreatedParams = {
  space: Space;
  newOwner: Account;
  activity: Activity;
  ctx: Ctx;
};

export async function insertActivityForSpaceOwnershipTransferCreated(
  params: InsertActivityForSpaceOwnershipTransferCreatedParams
): Promise<Activity> {
  const { activity, newOwner, space } = params;

  activity.space = space;
  activity.newOwner = newOwner;
  activity.aggregated = false;
  activity.aggCount = BigInt(0);
  return activity;
}
