import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const createSpace =  {
    name: 'Spaces.create_space',
    v13: new CallType(
        'Spaces.create_space',
        sts.struct({
            content: v13.Content,
            permissionsOpt: sts.option(() => v13.SpacePermissions),
        })
    ),
}

export const updateSpace =  {
    name: 'Spaces.update_space',
    v13: new CallType(
        'Spaces.update_space',
        sts.struct({
            spaceId: sts.bigint(),
            update: v13.SpaceUpdate,
        })
    ),
}

export const forceCreateSpace =  {
    name: 'Spaces.force_create_space',
    v13: new CallType(
        'Spaces.force_create_space',
        sts.struct({
            spaceId: sts.bigint(),
            created: v13.WhoAndWhen,
            owner: v13.AccountId32,
            content: v13.Content,
            hidden: sts.boolean(),
            permissionsOpt: sts.option(() => v13.SpacePermissions),
        })
    ),
}

export const forceSetNextSpaceId =  {
    name: 'Spaces.force_set_next_space_id',
    v13: new CallType(
        'Spaces.force_set_next_space_id',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}
