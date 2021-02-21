import { NotFoundException } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Author } from './entities/author.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

import { PostsService } from '../posts/posts.service';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query((returns) => Author, { name: 'author' })
  // name that generated on schema
  findOneById(@Args('id', { type: () => Int }) id: number): Author {
    const author = this.authorsService.findOneById(id);
    if (!author) {
      throw new NotFoundException(id);
    }
    return author;
  }

  @Query((returns) => [Author], { name: 'authors' })
  findAll(): Author[] {
    return this.authorsService.findAll();
  }

  @Mutation((returns) => Author, { name: 'createAuthor' })
  create(@Args('input') input: CreateAuthorInput): Author {
    return this.authorsService.create(input);
  }

  @Mutation((returns) => Author, { name: 'deleteAuthor' })
  delete(@Args('id', { type: () => Int }) id: number): Author {
    return this.authorsService.delete(id);
  }

  @Mutation((returns) => Author, { name: 'updateAuthor' })
  update(@Args('input') input: UpdateAuthorInput): Author {
    return this.authorsService.update(input);
  }

  @ResolveField()
  posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ author: id });
  }
}
