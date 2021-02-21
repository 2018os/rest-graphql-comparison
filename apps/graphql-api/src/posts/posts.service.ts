import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GetPostInput } from './dto/get-post.input';
import { Post } from './entities/post.entity';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class PostsService {
  constructor(private readonly authorsService: AuthorsService) {}

  private posts: Post[] = [
    {
      id: 1,
      author: {
        id: 1,
      },
      content: 'hello',
    },
  ];

  create(createPostInput: CreatePostInput): Post {
    const author = this.authorsService.findOneById(createPostInput.author);
    const newPost = {
      id: this.posts.length + 1,
      author,
      content: createPostInput.content,
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(getPostInput?: GetPostInput): Post[] {
    const { author } = getPostInput;
    if (author) {
      const results = this.posts.filter((post) => post.author.id === author);
      return results;
    }
    return this.posts;
  }

  findOneById(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Not Found Post');
    }
    return post as Post;
  }

  update(id: number, updatePostInput: UpdatePostInput): Post {
    const author = this.authorsService.findOneById(1);
    const findedPost = this.findOneById(id);
    this.delete(id);
    const updatedPost = {
      ...findedPost,
      ...updatePostInput,
      author,
    };
    this.posts.push(updatedPost);
    return updatedPost;
  }

  delete(id: number): Post {
    const deletedPost = this.findOneById(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    return deletedPost;
  }
}
