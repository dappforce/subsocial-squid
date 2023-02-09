import { Activity, Space } from '../../../model';

type InsertActivityForAccountCreatedUpdatedParams = {
  activity: Activity;
  username: string;
  space?: Space;
  spacePrev?: Space;
};

export async function insertActivityForUsernameRegisteredUpdated(
  params: InsertActivityForAccountCreatedUpdatedParams
): Promise<Activity> {
  const { activity, username, space, spacePrev } = params;

  activity.username = username;

  if (space) activity.space = space;
  if (spacePrev) activity.spacePrev = spacePrev;

  activity.aggregated = false;
  activity.aggCount = BigInt(0);

  return activity;
}
