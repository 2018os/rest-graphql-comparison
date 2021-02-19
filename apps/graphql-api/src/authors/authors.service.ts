import { Injectable, NotFoundException } from '@nestjs/common';

import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  async findOneById(id: number): Promise<Author> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException('Not Found Author');
    }
    return author as Author;
  }

  async findAll(): Promise<Author[]> {
    return this.authors;
  }

  async create(firstName?: string, lastName?: string): Promise<Author> {
    const newAuthor = {
      id: this.authors.length + 1,
      firstName: firstName,
      lastName: lastName,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  async delete(id: number): Promise<Author> {
    const deletedAuthor = await this.findOneById(id);
    this.authors = this.authors.filter((author) => author.id !== id);
    return deletedAuthor;
  }

  async update(
    id: number,
    firstName?: string,
    lastName?: string,
  ): Promise<Author> {
    const findedAuthor = await this.findOneById(id);
    await this.delete(id);
    const updatedAuthor = {
      ...findedAuthor,
      firstName: firstName || findedAuthor.firstName,
      lastName: lastName || findedAuthor.lastName,
    };
    this.authors.push(updatedAuthor);
    return updatedAuthor;
  }
}
