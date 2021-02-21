import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
export class Author {
  @Field((type) => Int)
  // number is required because GraphQL have Int, Float
  // so, string or boolean is not required
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
