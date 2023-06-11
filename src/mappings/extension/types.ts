export const ContentExtensionId = {
  'subsocial-donations': 'subsocial-donations',
  'subsocial-evm-nft': 'subsocial-evm-nft'
} as const;

type DonationsProperties = {
  chain: string;
  from: string;
  to: string;
  token: string;
  amount: string;
  decimals: number;
  txHash: string;
};
type EvmNftProperties = {
  chain: string;
  collectionId: string;
  nftId: string;
  url: string;
};

export type ContentExtensionData =
  | ({
      id: (typeof ContentExtensionId)['subsocial-donations'];
    } & {
      properties: DonationsProperties;
    })
  | ({
      id: (typeof ContentExtensionId)['subsocial-evm-nft'];
    } & {
      properties: EvmNftProperties;
    });

export type ExtensionPropertiesAll = Partial<
  DonationsProperties & EvmNftProperties
>;
