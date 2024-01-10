import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v13 from '../v13'
import * as v19 from '../v19'

export const setProfile =  {
    name: 'Profiles.set_profile',
    v13: new CallType(
        'Profiles.set_profile',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const resetProfile =  {
    name: 'Profiles.reset_profile',
    v13: new CallType(
        'Profiles.reset_profile',
        sts.unit()
    ),
}

export const forceSetSpaceAsProfile =  {
    name: 'Profiles.force_set_space_as_profile',
    v13: new CallType(
        'Profiles.force_set_space_as_profile',
        sts.struct({
            account: v13.AccountId32,
            spaceIdOpt: sts.option(() => sts.bigint()),
        })
    ),
}

export const createSpaceAsProfile =  {
    name: 'Profiles.create_space_as_profile',
    v19: new CallType(
        'Profiles.create_space_as_profile',
        sts.struct({
            content: v19.Content,
        })
    ),
}
