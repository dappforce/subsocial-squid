import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v102 from '../v102'

export const profileUpdated =  {
    name: 'Profiles.ProfileUpdated',
    /**
     * Profile's space id was updated for this account.
     */
    v102: new EventType(
        'Profiles.ProfileUpdated',
        sts.struct({
            account: v102.AccountId32,
            spaceId: sts.option(() => sts.bigint()),
        })
    ),
}
