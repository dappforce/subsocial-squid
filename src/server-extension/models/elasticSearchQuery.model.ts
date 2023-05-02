import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType()
class ESError {
  @Field((type) => Int, { nullable: true, description: 'Error status code.' })
  status?: string;

  @Field((type) => String, {
    description: 'Error message text message.'
  })
  reason!: string;
}

@ObjectType()
class SearchTotals {
  @Field((type) => Int, {
    description: 'Total number of hits matched to this particular request'
  })
  totalResults!: number;

  @Field((type) => Int, {
    description: 'Page offset, which has been used for this particular request.'
  })
  offset!: number;

  @Field((type) => Int, {
    description:
      'Number of search hits per page, which has been used for this particular request.'
  })
  limit!: number;

  @Field((type) => Float, {
    description:
      'Maximum score within results scope of this particular search request.'
  })
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
  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `name` (actual only for Space entity)'
  })
  name?: string;

  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `about` (actual only for Space entity)'
  })
  about?: string;

  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `username` (actual only for Space entity)'
  })
  username?: string;

  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `title` (actual only for Post entity)'
  })
  title?: string;

  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `body` (actual only for Post entity)'
  })
  body?: string;

  @Field((type) => String, {
    nullable: true,
    description: 'Value of field `spaceId` (actual only for Post entity)'
  })
  spaceId?: string;

  @Field((type) => [String], { nullable: true, description: 'List of tags' })
  tags?: string[];
}

@ObjectType()
class HitItem {
  @Field((type) => String, {
    nullable: false,
    description: 'Index particular document is located in'
  })
  _index!: string;

  @Field((type) => String, {
    nullable: false,
    description: 'Document ID (equal to on-chain entity ID)'
  })
  _id!: string;

  @Field((type) => Float, {
    nullable: false,
    description: 'Search score of particular document'
  })
  _score!: number;

  @Field((type) => HitItemContent, {
    nullable: false,
    description: 'Document source'
  })
  _content!: HitItemContent;
}
