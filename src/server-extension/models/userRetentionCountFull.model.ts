import { Field, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType()
export class UserRetentionCountFullModel {
  @Field({ nullable: false, defaultValue: 0 })
  retention_count!: number;

  constructor(props: Partial<UserRetentionCountFullModel>) {
    Object.assign(this, props);
  }
}
