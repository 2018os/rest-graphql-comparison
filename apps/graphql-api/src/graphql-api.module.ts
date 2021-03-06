import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/graphql-api/src/schema.gql'),
    }),
    AuthorsModule,
    PostsModule,
  ],
})
export class GraphqlApiModule {}
