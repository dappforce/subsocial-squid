import { Content } from '../interfaces/sharedTypes';
import { ContentSrcDecorated } from '../../common/types';
import { encodeAddress } from '@polkadot/util-crypto';
import { hexToString } from '@polkadot/util';
import { Event } from '../../processor';

export function getContentSrcDecorated(
  contentSrc: Content | undefined
): ContentSrcDecorated {
  const res: ContentSrcDecorated = {
    ipfsSrc: null,
    otherSrc: null,
    none: false
  };

  if (!contentSrc) return { ...res, none: true };

  switch (contentSrc.__kind) {
    case 'IPFS':
      res.ipfsSrc = hexToString(contentSrc.value);
      break;
    case 'Other':
      res.otherSrc = hexToString(contentSrc.value);
      break;
    default:
      res.none = true;
  }

  return res;
}

export function getCallSigner(eventCtx: Event): string | null {
  const extrinsic = eventCtx.extrinsic;

  if (
    extrinsic &&
    extrinsic.signature &&
    extrinsic.signature.address &&
    // @ts-ignore
    extrinsic.signature.address.__kind &&
    // @ts-ignore
    extrinsic.signature.address.__kind === 'Id'
  ) {
    // @ts-ignore
    return encodeAddress(extrinsic.signature.address.value, 28);
  }

  return null;
}
export function getCallNameFromCtx(eventCtx: Event): string {
  return eventCtx.call!.name.split('.')[1];
}
