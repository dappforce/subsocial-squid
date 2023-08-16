import { Account, Activity, Space } from '../../../model';

type InsertActivityForAccountCreatedUpdatedParams = {
  activity: Activity;
  username: string;
  space?: Space;
  spacePrev?: Space;
  domainRecipient?: Account;
};

export async function insertActivityForUsernameRegisteredUpdated(
  params: InsertActivityForAccountCreatedUpdatedParams
): Promise<Activity> {
  const { activity, username, space, spacePrev, domainRecipient } = params;

  activity.username = username;

  if (space) activity.space = space;
  if (spacePrev) activity.spacePrev = spacePrev;
  if (domainRecipient) activity.domainRecipient = domainRecipient;

  activity.aggregated = false;
  activity.aggCount = BigInt(0);

  return activity;
}
