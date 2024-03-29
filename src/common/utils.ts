import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { isAddress as isEthAddress } from 'ethers';

import * as ss58 from '@subsquid/ss58';
import md5 from 'md5';
import {
  EventName,
  PostKind,
  Post,
  TweetDetails,
  ReferencedTweetDetails,
  TweetAttachmentsDetails,
  PinnedResourceType
} from '../model';
import { EventMetadata, HasTitleOrBody, ParsedEventsData } from './types';
import { PostTweetDetailsIPFS } from '@subsocial/data-hub-sdk';
import { summarizeMd, nonEmptyStr, summarize } from '@subsocial/utils';
import { NamedLink } from '@subsocial/api/types/ipfs';
import { IpfsContent } from '../storage/types';
import { supportedIpfsContentMap } from '@subsocial/data-hub-sdk';
import { Ctx } from '../processor';
import { Entity } from '@subsquid/typeorm-store/lib/store';
// import slugify from '@sindresorhus/slugify';
import slugify from 'slugify';
import { stringToU8a } from '@polkadot/util';

let subsocialSs58CodecInst: ss58.Codec | null = null;

export function isEvmAddress(maybeAddress?: string): boolean {
  if (!maybeAddress) return false;
  try {
    return isEthAddress(maybeAddress);
  } catch (e) {
    return false;
  }
}

/**
 * Remove pallet name from event name. It's required for using in conditions
 * together with enum values "EventName" as enum value cannot be defined in
 * format "PalletName.EventName".
 * @param rawEventName
 */
export const decorateEventName = (rawEventName: string): string => {
  return rawEventName.split('.')[1];
};

export const getActivityEntityId = (
  blockNumber: string,
  indexInBlock: string,
  eventName: string | EventName,
  contentExtensionIndex?: number
): string => {
  return `${blockNumber}-${indexInBlock}-${md5(eventName)}${
    contentExtensionIndex ? `-${contentExtensionIndex}` : ''
  }`;
};

export const getNotificationEntityId = (
  accountId: string,
  activityId: string
): string => {
  return `${accountId}-${activityId}`;
};

export const getAccountFollowersEntityId = (
  followerId: string,
  followingId: string
): string => {
  return `${followerId}-${followingId}`;
};

export const getEvmSubstrateAccountLinkEntityId = (
  evmAccountId: string,
  substrateAccountId: string
): string => {
  return `${evmAccountId}-${substrateAccountId}`;
};

export const getNewsFeedEntityId = (
  accountId: string,
  activityId: string
): string => {
  return `${accountId}-${activityId}`;
};

export const getSpaceFollowersEntityId = (
  followerId: string,
  spaceId: string
): string => {
  return `${followerId}-${spaceId}`;
};

export const getPostFollowersEntityId = (
  followerId: string,
  postId: string
): string => {
  return `${followerId}-${postId}`;
};

export const getContentExtensionEntityId = (
  postId: string,
  extensionIndex: number
): string => {
  return `${postId}-${extensionIndex}`;
};

export const getExtensionPinnedResourceEntityId = ({
  extensionId,
  resourceType,
  resourceId
}: {
  extensionId: string;
  resourceType: PinnedResourceType;
  resourceId: string;
}): string => {
  return `${extensionId}-${resourceType}-${resourceId}`;
};

export const getSubsocialSs58Codec = (): ss58.Codec => {
  if (!subsocialSs58CodecInst) subsocialSs58CodecInst = ss58.codec('subsocial');
  return subsocialSs58CodecInst;
};

// export const addressSs58ToString = (address: Uint8Array) => {
//   const codecInst = getSubsocialSs58Codec();
//   return codecInst.encode(address);
// };
//
// export const addressStringToSs58 = (address: string): Uint8Array => {
//   const codecInst = getSubsocialSs58Codec();
//   return codecInst.decode(address);
// };

export const ensurePositiveOrZeroValue = (inputValue: number): number => {
  return inputValue < 0 ? 0 : inputValue;
};

export const stringDateToTimestamp = (date: string | undefined) =>
  date && date !== '' && new Date(Number(date)).getTime();

export const getDateWithoutTime = (date: Date | undefined): Date | undefined =>
  date ? new Date(dayjs(date).format('YYYY-MM-DD')) : undefined;

export const getSyntheticEventName = (
  originEvent: EventName,
  post: Post
): EventName => {
  switch (originEvent) {
    case EventName.PostCreated:
      if (!post.rootPost) return EventName.PostCreated;
      if (post.rootPost && !post.parentPost) return EventName.CommentCreated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyCreated;
      break;

    case EventName.PostFollowed:
      if (!post.rootPost) return EventName.PostFollowed;
      if (post.rootPost) return EventName.CommentFollowed;
      break;

    case EventName.PostUnfollowed:
      if (!post.rootPost) return EventName.PostUnfollowed;
      if (post.rootPost) return EventName.CommentUnfollowed;
      break;

    case EventName.PostShared:
      if (!post.rootPost) return EventName.PostShared;
      if (post.rootPost && !post.parentPost) return EventName.CommentShared;
      if (post.rootPost && post.parentPost) return EventName.CommentReplyShared;
      break;

    case EventName.PostMoved:
      /**
       * Only RegularPost can be moved to another not "null" space
       */
      if (post.space) return EventName.PostMoved;

      if (!post.rootPost) return EventName.PostDeleted;
      if (post.rootPost && !post.parentPost) return EventName.CommentDeleted;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyDeleted;
      break;

    case EventName.PostUpdated:
      if (!post.rootPost) return EventName.PostUpdated;
      if (post.rootPost && !post.parentPost) return EventName.CommentUpdated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyUpdated;
      break;

    case EventName.PostReactionCreated:
      if (!post.rootPost) return EventName.PostReactionCreated;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionCreated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionCreated;
      break;

    case EventName.PostReactionUpdated:
      if (!post.rootPost) return EventName.PostReactionUpdated;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionUpdated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionUpdated;
      break;

    case EventName.PostReactionDeleted:
      if (!post.rootPost) return EventName.PostReactionDeleted;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionDeleted;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionDeleted;
      break;

    default:
      return originEvent;
  }
  return originEvent;
};

export async function batchCaller<T>({
  srcList,
  handler,
  batchSize = 100,
  timeout = 0
}: {
  srcList: Array<T>;
  handler: (batch: Array<T>, batchIndex?: number) => Promise<void>;
  batchSize?: number;
  timeout?: number;
}) {
  const promises = [];
  let delayIndex = 1;

  while (srcList.length > 0) {
    const batch = srcList.splice(0, batchSize);
    promises.push(
      new Promise<void>(async (res) => {
        await new Promise<void>((waitRes) =>
          setTimeout(async () => {
            const batchIndex = delayIndex;
            await handler(batch, batchIndex);
            waitRes();
          }, delayIndex * timeout)
        );
        res();
      })
    );
    delayIndex++;
  }
  await Promise.all(promises);
}

export function getOrderedListByBlockNumber<T extends ParsedEventsData>(
  eventsList: Array<T>
): Array<T> {
  return eventsList.sort((a, b) =>
    a.eventData.metadata.blockNumber < b.eventData.metadata.blockNumber
      ? -1
      : b.eventData.metadata.blockNumber < a.eventData.metadata.blockNumber
      ? 1
      : 0
  );
}

export function* splitIntoBatches<T>(
  list: T[],
  maxBatchSize: number
): Generator<T[]> {
  if (list.length <= maxBatchSize) {
    yield list;
  } else {
    let offset = 0;
    while (list.length - offset > maxBatchSize) {
      yield list.slice(offset, offset + maxBatchSize);
      offset += maxBatchSize;
    }
    yield list.slice(offset);
  }
}

export function getBodySummary(body: string | undefined | null): {
  summary: string | null;
  isShowMore: boolean;
} {
  const sum = {
    summary: null,
    isShowMore: false
  };
  if (!body) return sum;

  return summarizeMd(body);
}

export function getJoinedList(src: string[] | NamedLink[] | string) {
  if (!Array.isArray(src)) return src;
  return src
    .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
    .join(',');
}

export function isTweetDetailsIPFSValid(srcData: PostTweetDetailsIPFS | null) {
  return srcData && typeof srcData !== 'string';
}

export function getTweetDetailsEntity(
  srcData: PostTweetDetailsIPFS | null
): TweetDetails | null {
  if (!srcData || !isTweetDetailsIPFSValid(srcData)) return null;

  return new TweetDetails({
    createdAt: srcData.created_at,
    username: srcData.username ?? null,
    authorId: srcData.author_id ?? null,
    conversationId: srcData.conversation_id ?? null,
    inReplyToUserId: srcData.in_reply_to_user_id ?? null,
    lang: srcData.lang ?? null,
    editHistoryTweetIds: srcData.edit_history_tweet_ids ?? null,
    referencedTweets:
      srcData.referenced_tweets && Array.isArray(srcData.referenced_tweets)
        ? srcData.referenced_tweets.map(
            (i) => new ReferencedTweetDetails({ id: i.id, type: i.type })
          )
        : null,
    attachments:
      srcData.attachments &&
      (srcData.attachments.hasOwnProperty('media_keys') ||
        srcData.attachments.hasOwnProperty('poll_ids'))
        ? new TweetAttachmentsDetails({
            mediaKeys: srcData.attachments.media_keys ?? null,
            pollIds: srcData.attachments.poll_ids ?? null
          })
        : null
  });
}

export function getExperimentalFieldsFromIPFSContent<
  T extends 'post' | 'space'
>(srcData: IpfsContent<T>, entity: T, ctx: Ctx): Record<string, any> | null {
  const experimentalFields: Record<string, any> = {};

  try {
    for (const contentField of Object.getOwnPropertyNames(srcData)) {
      if (!supportedIpfsContentMap.get(entity)!.has(contentField))
        // @ts-ignore
        experimentalFields[contentField] = srcData[contentField]; // We should ignore type checking here as we don't know field name of experimental field.
    }
  } catch (e) {
    ctx.log.error(
      `Experimental fields cannot be extracted from IPFS content for entity "${entity}"`
    );
  }

  if (Object.getOwnPropertyNames(experimentalFields).length > 0)
    return experimentalFields;
  return null;
}

export function getEntityIdFromEntityOrString(
  entityOrString: Entity | string
): string {
  return typeof entityOrString === 'string'
    ? entityOrString
    : entityOrString.id;
}

const MAX_SLUG_LENGTH = 60;
const SLUG_SEPARATOR = '-';

export function createPostSlug(postId: string, content?: HasTitleOrBody) {
  let slug: string = '' + postId;

  if (content) {
    const { title, body } = content;
    const titleOrBody = nonEmptyStr(title) ? title : body;
    const summary = summarize(titleOrBody, {
      limit: MAX_SLUG_LENGTH,
      omission: ''
    });
    // const slugifiedSummary = slugify(summary, {
    //   separator: SLUG_SEPARATOR
    // });
    const slugifiedSummary = slugify(summary, SLUG_SEPARATOR);

    if (nonEmptyStr(slugifiedSummary)) {
      slug = slugifiedSummary + '-' + slug;
    }
  }

  return slug;
}
