import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType()
class SearchTotals {
  @Field((type) => Int)
  totalRecords!: number;

  @Field((type) => Int)
  offset!: number;

  @Field((type) => Float)
  maxScore!: number;
}

@ObjectType()
export class ElasticSearchQueryResultEntity {
  @Field(() => [HitItem], { nullable: 'items' })
  hits!: HitItem[];

  @Field((type) => SearchTotals)
  total!: SearchTotals;

  constructor(props: Partial<ElasticSearchQueryResultEntity>) {
    Object.assign(this, props);
  }
}

@ObjectType()
class HitItemSource {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  handle?: string;

  @Field((type) => String, { nullable: true })
  about?: string;

  @Field((type) => [String], { nullable: true })
  tags?: string[];

  @Field((type) => String, { nullable: true })
  space?: string;

  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => String, { nullable: true })
  body?: string;
}

@ObjectType()
class HitItem {
  @Field((type) => String, { nullable: false })
  _index!: string;

  @Field((type) => String, { nullable: false })
  _type!: string;

  @Field((type) => String, { nullable: false })
  _id!: string;

  @Field((type) => Int, { nullable: false })
  _score!: number;

  @Field((type) => HitItemSource, { nullable: false })
  _source!: HitItemSource;
}
