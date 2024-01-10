import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v7 from '../v7'
import * as v13 from '../v13'
import * as v27 from '../v27'

export const registerDomain =  {
    name: 'Domains.register_domain',
    /**
     * Registers a domain ([full_domain]) using origin with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     * [full_domain] is a full domain name including a dot (.) and TLD.
     * Example of a [full_domain]: `mytoken.ksm`
     */
    v7: new CallType(
        'Domains.register_domain',
        sts.struct({
            fullDomain: v7.BoundedVec,
            content: v7.Content,
            expiresIn: sts.number(),
        })
    ),
    /**
     * Registers a domain ([full_domain]) using origin with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     * [full_domain] is a full domain name including a dot (.) and TLD.
     * Example of a [full_domain]: `mytoken.ksm`
     */
    v13: new CallType(
        'Domains.register_domain',
        sts.struct({
            fullDomain: v13.BoundedVec,
            content: v13.Content,
            expiresIn: sts.number(),
        })
    ),
    /**
     * Registers a domain ([full_domain]) using origin with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     * [full_domain] is a full domain name including a dot (.) and TLD.
     * Example of a [full_domain]: `mytoken.ksm`
     */
    v27: new CallType(
        'Domains.register_domain',
        sts.struct({
            altRecipient: sts.option(() => v27.MultiAddress),
            fullDomain: v27.BoundedVec,
            content: v27.Content,
            expiresIn: sts.number(),
        })
    ),
}

export const forceRegisterDomain =  {
    name: 'Domains.force_register_domain',
    /**
     * Registers a domain ([full_domain]) using root on behalf of a [target] with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     */
    v7: new CallType(
        'Domains.force_register_domain',
        sts.struct({
            target: v7.MultiAddress,
            fullDomain: v7.BoundedVec,
            content: v7.Content,
            expiresIn: sts.number(),
        })
    ),
    /**
     * Registers a domain ([full_domain]) using root on behalf of a [target] with [content],
     * and set the domain to expire in [expires_in] number of blocks.
     */
    v13: new CallType(
        'Domains.force_register_domain',
        sts.struct({
            target: v13.MultiAddress,
            fullDomain: v13.BoundedVec,
            content: v13.Content,
            expiresIn: sts.number(),
        })
    ),
}

export const setInnerValue =  {
    name: 'Domains.set_inner_value',
    /**
     * Sets the domain inner_value to be one of subsocial account, space, or post.
     */
    v7: new CallType(
        'Domains.set_inner_value',
        sts.struct({
            domain: v7.BoundedVec,
            valueOpt: sts.option(() => v7.InnerValue),
        })
    ),
}

export const forceSetInnerValue =  {
    name: 'Domains.force_set_inner_value',
    /**
     * Sets the domain inner_value to be one of subsocial account, space, or post.
     */
    v7: new CallType(
        'Domains.force_set_inner_value',
        sts.struct({
            domain: v7.BoundedVec,
            valueOpt: sts.option(() => v7.InnerValue),
        })
    ),
}

export const setOuterValue =  {
    name: 'Domains.set_outer_value',
    /**
     * Sets the domain outer_value to be a custom string.
     */
    v7: new CallType(
        'Domains.set_outer_value',
        sts.struct({
            domain: v7.BoundedVec,
            valueOpt: sts.option(() => sts.bytes()),
        })
    ),
}

export const setDomainContent =  {
    name: 'Domains.set_domain_content',
    /**
     * Sets the domain content to be an outside link.
     */
    v7: new CallType(
        'Domains.set_domain_content',
        sts.struct({
            domain: v7.BoundedVec,
            newContent: v7.Content,
        })
    ),
    /**
     * Sets the domain content to be an outside link.
     */
    v13: new CallType(
        'Domains.set_domain_content',
        sts.struct({
            domain: v13.BoundedVec,
            newContent: v13.Content,
        })
    ),
}

export const reserveWords =  {
    name: 'Domains.reserve_words',
    /**
     * Mark set of domains as not reservable by users.
     */
    v7: new CallType(
        'Domains.reserve_words',
        sts.struct({
            words: sts.array(() => v7.BoundedVec),
        })
    ),
}

export const supportTlds =  {
    name: 'Domains.support_tlds',
    /**
     * Add support for a set of top-level domains.
     */
    v7: new CallType(
        'Domains.support_tlds',
        sts.struct({
            tlds: sts.array(() => v7.BoundedVec),
        })
    ),
}

export const setPaymentBeneficiary =  {
    name: 'Domains.set_payment_beneficiary',
    v27: new CallType(
        'Domains.set_payment_beneficiary',
        sts.struct({
            paymentBeneficiary: v27.AccountId32,
        })
    ),
}

export const setPricesConfig =  {
    name: 'Domains.set_prices_config',
    v27: new CallType(
        'Domains.set_prices_config',
        sts.struct({
            newPricesConfig: sts.array(() => sts.tuple(() => [sts.number(), sts.bigint()])),
        })
    ),
}
