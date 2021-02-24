import { Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Author[] {
    return this.authorsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Author {
    return this.authorsService.findOne(id);
  }
}
