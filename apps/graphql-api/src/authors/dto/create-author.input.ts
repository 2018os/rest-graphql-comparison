import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: true, defaultValue: 'anonymous' })
  firstName?: string;

  @Field({ nullable: true, defaultValue: 'author' })
  lastName?: string;
}
