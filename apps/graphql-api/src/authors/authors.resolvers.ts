import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Author } from './models/author.model';
import { AuthorsService } from './authors.service';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query((returns) => Author, { name: 'author' })
  // name that generated on schema
  async getAuthor(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Author> {
    const user = await this.authorsService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query((returns) => [Author], { name: 'authors' })
  getAllAuthors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }
}
