import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { Author } from './models/author.model';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query((returns) => Author, { name: 'author' })
  // name that generated on schema
  async getAuthor(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Author> {
    const author = await this.authorsService.findOneById(id);
    if (!author) {
      throw new NotFoundException(id);
    }
    return author;
  }

  @Query((returns) => [Author], { name: 'authors' })
  getAllAuthors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Mutation((returns) => Author, { name: 'createAuthor' })
  async create(@Args('input') input: CreateAuthorInput): Promise<Author> {
    const { firstName, lastName } = input;
    return this.authorsService.create(firstName, lastName);
  }
}
