import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/graphql-api/src/schema.gql'),
      sortSchema: true,
    }),
    AuthorsModule,
  ],
})
export class GraphqlApiModule {}
