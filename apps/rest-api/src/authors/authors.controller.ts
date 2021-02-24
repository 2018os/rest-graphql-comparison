import { Controller, Get } from '@nestjs/common';

@Controller('authors')
export class AuthorsController {
  @Get()
  findAll(): string {
    return 'Hello';
  }
}
