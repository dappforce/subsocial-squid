export type InnerValue = InnerValue_Account | InnerValue_Space | InnerValue_Post

export interface InnerValue_Account {
  __kind: 'Account'
  value: Uint8Array
}

export interface InnerValue_Space {
  __kind: 'Space'
  value: bigint
}

export interface InnerValue_Post {
  __kind: 'Post'
  value: bigint
}