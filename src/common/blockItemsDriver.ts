import assert from 'assert';
import {
  Block,
  BlockItem__DEPRECATED,
  Call,
  Event
} from '../processor';

const CALL_FIRST = 1; // 1 means TRUE, -1 means FALSE

export function orderItems(block: Block): BlockItem__DEPRECATED[] {
  const items: BlockItem__DEPRECATED[] = [];

  for (const call of block.calls) {
    items.push({
      kind: 'call',
      value: call
    });
  }

  for (const event of block.events) {
    items.push({
      kind: 'event',
      value: event
    });
  }

  items.sort((a, b) => {
    switch (a.kind) {
      case 'call':
        switch (b.kind) {
          case 'call':
            return compareCalls(a.value as Call, b.value as Call);
          case 'event':
            return compareCallEvent(a.value as Call, b.value as Event);
        }
      case 'event':
        switch (b.kind) {
          case 'call':
            return (
              compareCallEvent(a.value as Call, b.value as Event) * -1
            );
          case 'event':
            return compareEvents(a.value as Event, b.value as Event);
        }
    }
  });

  return items;
}

function compareEvents(a: { index: number }, b: { index: number }) {
  return a.index - b.index;
}

function compareCalls(a: Call, b: Call) {
  return (
    a.extrinsicIndex - b.extrinsicIndex ||
    a.address.length - b.address.length ||
    (a.address.length == 0 ? 0 : last(a.address) - last(b.address))
  );
}

function compareCallEvent(a: Call, b: Event) {
  return b.extrinsicIndex == null || b.callAddress == null
    ? 1
    : a.extrinsicIndex - b.extrinsicIndex ||
        a.address.length - b.callAddress.length ||
        (a.address.length == 0 ? 0 : last(a.address) - last(b.callAddress)) ||
        CALL_FIRST;
}

function last<T>(arr: T[]): T {
  assert(arr.length > 0);
  return arr[arr.length - 1];
}
