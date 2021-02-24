import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException('Not Found Author');
    }
    return author;
  }
}
