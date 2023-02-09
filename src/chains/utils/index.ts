import { Content } from '../interfaces/sharedTypes';
import { ContentSrcDecorated } from '../../common/types';

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
      res.ipfsSrc = contentSrc.value.toString();
      break;
    case 'Other':
      res.otherSrc = contentSrc.value.toString();
      break;
    default:
      res.none = true;
  }

  return res;
}
