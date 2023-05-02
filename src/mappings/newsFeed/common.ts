import { EventName } from '../../model';
import { Ctx } from '../../processor';

export function InvalidFeedHandlerParamsForTargetWarn(
  eventName: EventName,
  target: string,
  ctx: Ctx
) {
  const msg = `Feed publication handlers on event "${eventName}" for target "${target}" receiver invalid parameters.`;
  if (ctx) {
    ctx.log.warn(msg);
  } else {
    console.log(msg);
  }
}
