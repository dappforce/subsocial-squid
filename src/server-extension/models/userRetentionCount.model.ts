import { Field, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType()
export class UserRetentionCountModel {
  @Field({ nullable: false, defaultValue: 0 })
  retention_count!: number;

  constructor(props: Partial<UserRetentionCountModel>) {
    Object.assign(this, props);
  }
}
