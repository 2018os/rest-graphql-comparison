import { Module } from '@nestjs/common';

import { AuthorsResolver } from './authors.resolvers';
import { AuthorsService } from './authors.service';

@Module({
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
