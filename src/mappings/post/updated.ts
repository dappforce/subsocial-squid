import {
  createPostSlug,
  getBodySummary,
  getExperimentalFieldsFromIPFSContent,
  getJoinedList,
  getSyntheticEventName,
  getTweetDetailsEntity,
  isTweetDetailsIPFSValid
} from '../../common/utils';
import { Post, Account, EventName, Space, IpfsFetchLog } from '../../model';
import { getOrCreateAccount } from '../account';
import { updatePostsCountersInSpace } from '../space';
import { setActivity } from '../activity';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostUpdatedData, SpaceCountersAction } from '../../common/types';
import { Ctx } from '../../processor';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { ElasticSearchManager } from '../../elasticsearch';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { processContentExtensions } from '../extension';
import { getUrlFromText } from './common';

export async function postUpdated(
  ctx: Ctx,
  eventCallData: PostUpdatedData
): Promise<void> {
  const { eventData, callData } = eventCallData;
  const post = await getEntityWithRelations.post({
    postId: eventData.params.postId,
    ctx
  });
  if (!post || !callData.args) {
    new EntityProvideFailWarning(
      Post,
      eventData.params.postId,
      ctx,
      eventData.metadata
    );
    throw new CommonCriticalError();
  }

  const prevVisStateHidden = post.hidden;

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const postIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'post',
    callData.args.ipfsSrc ?? null,
    async (errorMsg: string | null) => {
      await ctx.store.save(
        new IpfsFetchLog({
          id: eventData.params.postId,
          cid: callData.args?.ipfsSrc ?? '',
          blockHeight: eventData.metadata.blockNumber,
          errorMsg: errorMsg
        })
      );
    }
  );

  const ownedByAccount = await getOrCreateAccount(
    post.ownedByAccount.id || eventData.params.accountId,
    ctx
  );

  if (typeof callData.args.hidden === 'boolean')
    post.hidden = callData.args.hidden;
  if (callData.args.ipfsSrc) post.content = callData.args.ipfsSrc;

  post.ownedByAccount = ownedByAccount;
  post.updatedAtTime = eventData.metadata.timestamp;

  if (postIpfsContent) {
    const bodySummary = getBodySummary(postIpfsContent.body);
    post.title = postIpfsContent.title ?? null;
    post.image = postIpfsContent.image ?? null;

    post.link = null;
    if (postIpfsContent.link) {
      post.link = postIpfsContent.link;
    } else if (!postIpfsContent.link && postIpfsContent.body) {
      post.link = getUrlFromText(postIpfsContent.body);
    }

    post.format = null;
    post.canonical = postIpfsContent.canonical ?? null;
    post.body = postIpfsContent.body ?? null;
    post.summary = bodySummary.summary;
    post.isShowMore = bodySummary.isShowMore;
    post.slug =
      !postIpfsContent.title && !postIpfsContent.body
        ? eventData.params.postId
        : createPostSlug(eventData.params.postId, {
            title: postIpfsContent.title,
            body: postIpfsContent.body
          }) ?? null;
    // post.appId = postIpfsContent.appId ?? null;

    post.experimental =
      getExperimentalFieldsFromIPFSContent(postIpfsContent, 'post', ctx) ??
      null;

    if (postIpfsContent.tags) {
      post.tagsOriginal = getJoinedList(postIpfsContent.tags);
    }
    if (postIpfsContent.tweet) {
      post.tweetDetails = getTweetDetailsEntity(postIpfsContent.tweet);
      post.tweetId = isTweetDetailsIPFSValid(postIpfsContent.tweet)
        ? postIpfsContent.tweet.id
        : null;
    }

    // TODO Implementation is needed
    // const { meta } = postContent;
    // if (meta && !isEmptyArray(meta)) {
    //   post.proposalIndex = meta[0].proposalIndex;
    // }
  } else {
    post.slug = eventData.params.postId;
  }

  await ctx.store.save(post);

  if (postIpfsContent && postIpfsContent.extensions)
    await processContentExtensions(
      postIpfsContent.extensions,
      post,
      eventCallData,
      ctx
    );

  ElasticSearchManager.index(ctx).addToQueue(post);

  await updatePostsCountersInSpace({
    space: post.space ?? null,
    post,
    isPrevVisStateHidden: prevVisStateHidden,
    action: SpaceCountersAction.PostUpdated,
    ctx
  });

  const syntheticEventName = getSyntheticEventName(EventName.PostUpdated, post);

  const activity = await setActivity({
    syntheticEventName,
    account: eventData.params.accountId,
    post,
    ctx,
    eventMetadata: eventData.metadata
  });

  if (!activity) return;

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      post,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account: post.ownedByAccount, activity, ctx }
  );
}
