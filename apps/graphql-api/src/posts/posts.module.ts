import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
