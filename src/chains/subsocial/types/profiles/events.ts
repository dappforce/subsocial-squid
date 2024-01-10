import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v13 from '../v13'

export const profileUpdated =  {
    name: 'Profiles.ProfileUpdated',
    /**
     * Profile's space id was updated for this account.
     */
    v13: new EventType(
        'Profiles.ProfileUpdated',
        sts.struct({
            account: v13.AccountId32,
            spaceId: sts.option(() => sts.bigint()),
        })
    ),
}
