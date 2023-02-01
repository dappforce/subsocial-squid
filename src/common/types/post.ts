import { IpfsPostContent, IpfsSpaceContent } from '@subsocial/api/types/ipfs';
import { SummarizedContent } from '@subsocial/api/types/dto';
import { TweetAttachmentV2, ReferencedTweetV2 } from 'twitter-api-v2';

export type PostTweetDetailsIPFS = {
  id: string;
  created_at: string; // "2019-06-04T23:12:08.000Z"
  username: string;
  author_id: string;
  edit_history_tweet_ids: string[];
  conversation_id: string;
  in_reply_to_user_id: string;
  referenced_tweets: ReferencedTweetV2[];
  attachments: TweetAttachmentV2;
  lang: string; // BCP47 language tag e.g "en"
};

type SpaceContentWithInterests = {
  interests?: string[];
};

type PostContentWithTweet = {
  tweet?: PostTweetDetailsIPFS;
};

export type IpfsSpaceContentSummarized = IpfsSpaceContent &
  SummarizedContent &
  SpaceContentWithInterests;
export type IpfsPostContentSummarized = IpfsPostContent &
  SummarizedContent &
  PostContentWithTweet;
