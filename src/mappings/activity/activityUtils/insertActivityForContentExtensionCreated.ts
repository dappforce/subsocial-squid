import { Activity, ContentExtension, Post, Space } from '../../../model';

type InsertActivityForAccountCreatedUpdatedParams = {
  activity: Activity;
  post: Post;
  extension: ContentExtension;
};

export async function insertActivityForContentExtensionCreated(
  params: InsertActivityForAccountCreatedUpdatedParams
): Promise<Activity> {
  const { activity, post, extension } = params;

  activity.extension = extension;
  activity.post = post;

  activity.aggregated = false;
  activity.aggCount = BigInt(0);

  return activity;
}
