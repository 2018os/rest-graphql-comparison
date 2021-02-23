import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, forwardRef } from '@nestjs/common';

import { AuthorsResolver } from './authors.resolvers';
import { AuthorsService } from './authors.service';
import { PostsModule } from '../posts/posts.module';

describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => PostsModule)],
      providers: [AuthorsResolver, AuthorsService],
    }).compile();

    resolver = module.get<AuthorsResolver>(AuthorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array', () => {
      const result = resolver.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a author', () => {
      resolver.create({
        firstName: 'Test',
      });
      const author = resolver.findOneById(1);
      expect(author).toBeDefined();
      expect(author.id).toEqual(1);
    });
    it('should throw NotFoundException Error', () => {
      try {
        resolver.findOneById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a author', () => {
      resolver.create({
        firstName: 'Test',
      });
      const beforeDelete = resolver.findAll().length;
      resolver.delete(1);
      const afterDelete = resolver.findAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw NotFoundException Error', () => {
      try {
        resolver.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = resolver.findAll().length;
      resolver.create({
        firstName: 'Test',
      });
      const afterCreate = resolver.findAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a author', () => {
      resolver.create({
        firstName: 'Test',
      });
      resolver.update({
        id: 1,
        firstName: 'Updated',
        lastName: 'Test',
      });
      const author = resolver.findOneById(1);
      expect(author.firstName).toEqual('Updated');
      expect(author.lastName).toEqual('Test');
    });
    it('should throw NotFoundException Error', () => {
      try {
        resolver.update({
          id: 999,
          firstName: 'Updated',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });
});
