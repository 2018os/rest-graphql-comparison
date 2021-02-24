import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  findAll(): Author[] {
    return this.authors;
  }
}
