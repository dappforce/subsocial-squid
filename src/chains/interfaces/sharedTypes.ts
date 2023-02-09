/**
 * Types, which are actual for all chains and won't be changed pretty often.
 */

/**
 * ==== InnerValue ====
 */
export type InnerValue =
  | InnerValue_Account
  | InnerValue_Space
  | InnerValue_Post;

export interface InnerValue_Account {
  __kind: 'Account';
  value: Uint8Array;
}

export interface InnerValue_Space {
  __kind: 'Space';
  value: bigint;
}

export interface InnerValue_Post {
  __kind: 'Post';
  value: bigint;
}

/**
 * ==== Content ====
 */
export type Content = Content_None | Content_Other | Content_IPFS;

export interface Content_None {
  __kind: 'None';
}

export interface Content_Other {
  __kind: 'Other';
  value: Uint8Array;
}

export interface Content_IPFS {
  __kind: 'IPFS';
  value: Uint8Array;
}
