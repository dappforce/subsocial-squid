import { Ctx } from '../../processor';
import { ParsedEventsDataScope } from '../../eventsCallsData';
import { EventName } from '../../model';
import { getOrderedListByBlockNumber } from '../../common/utils';

import { postFollowed } from './followed';
import { postUnfollowed } from './unfollowed';

export async function handlePostFollowUnfollow(
  ctx: Ctx,
  parsedEvents: ParsedEventsDataScope
) {
  const postFollowedEvents = [
    ...parsedEvents.getSectionByEventName(EventName.PostFollowed).values()
  ];
  const postUnfollowedEvents = [
    ...parsedEvents.getSectionByEventName(EventName.PostUnfollowed).values()
  ];

  for (const eventData of getOrderedListByBlockNumber(postFollowedEvents)) {
    await postFollowed(ctx, eventData);
  }

  for (const eventData of getOrderedListByBlockNumber(postUnfollowedEvents)) {
    await postUnfollowed(ctx, eventData);
  }
}
