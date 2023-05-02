import { EventName } from '../../model';
import { Ctx } from '../../processor';

export function InvalidNotificationHandlerParamsForTargetWarn(
  eventName: EventName,
  target: string,
  ctx: Ctx
) {
  const msg = `Notifications handlers on event "${eventName}" for target "${target}" receiver invalid parameters.`;
  if (ctx) {
    ctx.log.warn(msg);
  } else {
    console.log(msg);
  }
}
