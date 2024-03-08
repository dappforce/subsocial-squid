import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v36 from '../v36'

export const linkPostToResource =  {
    name: 'ResourceDiscussions.link_post_to_resource',
    v36: new CallType(
        'ResourceDiscussions.link_post_to_resource',
        sts.struct({
            resourceId: sts.bytes(),
            postId: sts.bigint(),
        })
    ),
}

export const createResourceDiscussion =  {
    name: 'ResourceDiscussions.create_resource_discussion',
    v36: new CallType(
        'ResourceDiscussions.create_resource_discussion',
        sts.struct({
            resourceId: sts.bytes(),
            spaceId: sts.bigint(),
            content: v36.Content,
        })
    ),
}
