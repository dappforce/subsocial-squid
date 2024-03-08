import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v103 from '../v103'

export const linkPostToResource =  {
    name: 'ResourceDiscussions.link_post_to_resource',
    v103: new CallType(
        'ResourceDiscussions.link_post_to_resource',
        sts.struct({
            resourceId: v103.BoundedVec,
            postId: sts.bigint(),
        })
    ),
}

export const createResourceDiscussion =  {
    name: 'ResourceDiscussions.create_resource_discussion',
    v103: new CallType(
        'ResourceDiscussions.create_resource_discussion',
        sts.struct({
            resourceId: v103.BoundedVec,
            spaceId: sts.bigint(),
            content: v103.Content,
        })
    ),
}
