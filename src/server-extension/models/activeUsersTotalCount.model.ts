import { Field, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType()
export class ActiveUsersTotalCount {
  @Field({ nullable: false, defaultValue: 0 })
  account_count!: number;

  constructor(props: Partial<ActiveUsersTotalCount>) {
    Object.assign(this, props);
  }
}
