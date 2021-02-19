import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
