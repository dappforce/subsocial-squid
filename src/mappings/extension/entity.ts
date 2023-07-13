import { Ctx } from '../../processor';
import { ContentExtension, ContentExtensionSchemaId, Post } from '../../model';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import {
  ContentExtensionData,
  ContentExtensionId,
  ExtensionPropertiesAll
} from './types';
import { getOrCreateAccount } from '../account';
import { toSubsocialAddress } from '@subsocial/utils';
import { isEvmAddress } from '../../common/utils';
import { getOrCreateEvmAccount } from '../evmAccount';
import BigNumber from 'bignumber.js';
import { isAddress } from '@polkadot/util-crypto';

export async function getOrCreateEvmNftExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const { properties }: { properties: ExtensionPropertiesAll; id: string } =
    extensionData!;

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: ContentExtensionSchemaId.subsocial_evm_nft,
    chain: properties.chain,
    collectionId: properties.collectionId,
    nftId: properties.nftId,
    url: properties.url,
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}

export async function getOrCreateDonationExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const { properties }: { properties: ExtensionPropertiesAll; id: string } =
    extensionData!;

  let amountBn = new BigNumber('0'); // TODO add fallback fetch of token contract decimal
  let amountBigInt = 0n;
  if (properties.amount && properties.decimals) {
    try {
      amountBn = new BigNumber(properties.amount);
      amountBigInt = amountBn.isNaN() ? BigInt(0) : BigInt(amountBn.toString());
    } catch (e) {
      ctx.log.info(e as Error, 'Donation amount conversion error - ');
    }
  }

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: ContentExtensionSchemaId.subsocial_donations,
    chain: properties.chain,
    token: properties.token,
    amount: amountBigInt,
    decimals: properties.decimals,
    txHash: properties.txHash,
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  let fromAccSubstrate = null;
  let toAccSubstrate = null;

  let fromAccEvm = null;
  let toAccEvm = null;

  if (properties.from && isEvmAddress(properties.from)) {
    fromAccEvm = await getOrCreateEvmAccount(properties.from, ctx);
  } else if (properties.from && isAddress(properties.from)) {
    fromAccSubstrate = await getOrCreateAccount(
      toSubsocialAddress(properties.from)!,
      ctx
    );
  }
  if (properties.to && isEvmAddress(properties.to)) {
    toAccEvm = await getOrCreateEvmAccount(properties.to, ctx);
  } else if (properties.to && isAddress(properties.to)) {
    toAccSubstrate = await getOrCreateAccount(
      toSubsocialAddress(properties.to)!,
      ctx
    );
  }

  newExtensionProps.fromEvm = fromAccEvm;
  newExtensionProps.toEvm = toAccEvm;
  newExtensionProps.fromSubstrate = fromAccSubstrate;
  newExtensionProps.toSubstrate = toAccSubstrate;

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}

export async function getOrCreateImageExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const { properties }: { properties: ExtensionPropertiesAll; id: string } =
    extensionData!;

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: ContentExtensionSchemaId.subsocial_image,
    image: properties.image,
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}

export async function getOrCreateSecretBoxExtension({
  extensionId,
  parentPost,
  extensionData,
  ctx
}: {
  extensionId: string;
  parentPost: Post;
  extensionData?: ContentExtensionData;
  ctx: Ctx;
}): Promise<ContentExtension | null> {
  if (extensionId === null || !extensionId)
    throw new Error(`Extension ID has unsupported value`);

  let extension = await getEntityWithRelations.contentExtension(
    extensionId,
    ctx
  );

  if (extension) return extension;

  if (!extensionData && !parentPost)
    throw new Error(`Extension parameters has not been provided!`);

  const {
    properties,
    id: extensionSchemaId
  }: { properties: ExtensionPropertiesAll; id: string } = extensionData!;

  if (!properties.recipient && !properties.nonce && !properties.message) {
    ctx.log.error(
      `Secret Box content is invalid. Extension ID - ${extensionId}`
    );
    return null;
  }

  const decoratedExtensionSchemaId = extensionSchemaId.replace(/-/g, '_');

  const newExtensionProps: Partial<ContentExtension> = {
    id: extensionId,
    extensionSchemaId: decoratedExtensionSchemaId as ContentExtensionSchemaId,
    nonce: properties.nonce,
    message: properties.message,
    recipient: await getOrCreateAccount(properties.recipient!, ctx),
    createdBy: parentPost.ownedByAccount,
    parentPost
  };

  extension = new ContentExtension(newExtensionProps);

  await ctx.store.save(extension);

  return extension;
}
