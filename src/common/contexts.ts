import { Store } from '@subsquid/typeorm-store';
import {
  EventHandlerContext as PrEventHandlerContext,
} from '@subsquid/substrate-processor';
import {
  EventDataRequest
} from '@subsquid/substrate-processor/lib/interfaces/dataSelection';

export type EventHandlerContext<
  T extends EventDataRequest = { event: true; call: true }
> = PrEventHandlerContext<Store, T>;

export { CallContext, EventContext } from '../chains/subsocial/types/support'; // These types should be the same for all networks.
