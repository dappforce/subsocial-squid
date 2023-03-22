import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType()
class ESError {
  @Field((type) => Int, { nullable: true, description: 'Error status.' })
  status?: string;

  @Field((type) => String, {
    description:
      'Error message.'
  })
  reason!: string;
}

@ObjectType()
class SearchTotals {
  @Field((type) => Int, { description: 'Total search results count.' })
  totalResults!: number;

  @Field((type) => Int, {
    description:
      'Offset value which has been used in particular search request.'
  })
  offset!: number;

  @Field((type) => Int, {
    description:
      'Results per page limit value which has been used in particular search request.'
  })
  limit!: number;

  @Field((type) => Float, { description: 'Maximum score of search results.' })
  maxScore!: number;
}

@ObjectType()
export class ElasticSearchQueryResultEntity {
  @Field(() => [HitItem], {
    nullable: 'items',
    description: 'Search results list.'
  })
  hits!: HitItem[];

  @Field((type) => SearchTotals, {
    description: 'General information about particular search query result.'
  })
  total!: SearchTotals;

  @Field((type) => ESError, {
    nullable: true,
    description: 'Occurred error.'
  })
  err?: ESError;

  constructor(props: Partial<ElasticSearchQueryResultEntity>) {
    Object.assign(this, props);
  }
}

@ObjectType()
class HitItemContent {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  username?: string;

  @Field((type) => String, { nullable: true })
  about?: string;

  @Field((type) => [String], { nullable: true })
  tags?: string[];

  @Field((type) => String, { nullable: true })
  spaceId?: string;

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
  _id!: string;

  @Field((type) => Float, { nullable: false })
  _score!: number;

  @Field((type) => HitItemContent, { nullable: false })
  _content!: HitItemContent;
}
