import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Author)
  author: Author;

  @Field()
  content: string;
}
