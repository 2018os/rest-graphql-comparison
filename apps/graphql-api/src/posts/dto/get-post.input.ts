import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetPostInput {
  @Field(() => Int, { nullable: true })
  author?: number;
}
