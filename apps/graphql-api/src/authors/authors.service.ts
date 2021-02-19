import { Injectable, NotFoundException } from '@nestjs/common';

import { Author } from './models/author.model';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  findOneById(id: number): Author {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException('Not Found Author');
    }
    return author as Author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  create(input: CreateAuthorInput): Author {
    const newAuthor = {
      id: this.authors.length + 1,
      ...input,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  delete(id: number): Author {
    const deletedAuthor = this.findOneById(id);
    this.authors = this.authors.filter((author) => author.id !== id);
    return deletedAuthor;
  }

  update(input: UpdateAuthorInput): Author {
    const { id } = input;
    const findedAuthor = this.findOneById(id);
    this.delete(id);
    const updatedAuthor = {
      ...findedAuthor,
      ...input,
    };
    this.authors.push(updatedAuthor);
    return updatedAuthor;
  }
}
