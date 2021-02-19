import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { Author } from './models/author.model';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

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
}
