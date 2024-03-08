import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const createSpace =  {
    name: 'Spaces.create_space',
    v100: new CallType(
        'Spaces.create_space',
        sts.struct({
            content: v100.Content,
            permissionsOpt: sts.option(() => v100.SpacePermissions),
        })
    ),
}

export const updateSpace =  {
    name: 'Spaces.update_space',
    v100: new CallType(
        'Spaces.update_space',
        sts.struct({
            spaceId: sts.bigint(),
            update: v100.SpaceUpdate,
        })
    ),
}

export const forceCreateSpace =  {
    name: 'Spaces.force_create_space',
    v100: new CallType(
        'Spaces.force_create_space',
        sts.struct({
            spaceId: sts.bigint(),
            created: v100.WhoAndWhen,
            owner: v100.AccountId32,
            content: v100.Content,
            hidden: sts.boolean(),
            permissionsOpt: sts.option(() => v100.SpacePermissions),
        })
    ),
}

export const forceSetNextSpaceId =  {
    name: 'Spaces.force_set_next_space_id',
    v100: new CallType(
        'Spaces.force_set_next_space_id',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}
