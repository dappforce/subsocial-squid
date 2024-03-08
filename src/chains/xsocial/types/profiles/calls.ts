import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const setProfile =  {
    name: 'Profiles.set_profile',
    v102: new CallType(
        'Profiles.set_profile',
        sts.struct({
            spaceId: sts.bigint(),
        })
    ),
}

export const resetProfile =  {
    name: 'Profiles.reset_profile',
    v102: new CallType(
        'Profiles.reset_profile',
        sts.unit()
    ),
}

export const createSpaceAsProfile =  {
    name: 'Profiles.create_space_as_profile',
    v102: new CallType(
        'Profiles.create_space_as_profile',
        sts.struct({
            content: v102.Content,
        })
    ),
}
