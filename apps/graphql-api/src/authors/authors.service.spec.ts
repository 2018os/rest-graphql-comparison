import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { NotFoundException } from '@nestjs/common';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a author', () => {
      service.create({
        firstName: 'Test',
      });
      const author = service.findOneById(1);
      expect(author).toBeDefined();
      expect(author.id).toEqual(1);
    });
    it('should throw NotFoundException Error', () => {
      try {
        service.findOneById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a author', () => {
      service.create({
        firstName: 'Test',
      });
      const beforeDelete = service.findAll().length;
      service.delete(1);
      const afterDelete = service.findAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw NotFoundException Error', () => {
      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.findAll().length;
      service.create({
        firstName: 'Test',
      });
      const afterCreate = service.findAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a author', () => {
      service.create({
        firstName: 'Test',
      });
      service.update({
        id: 1,
        firstName: 'Updated',
        lastName: 'Test',
      });
      const author = service.findOneById(1);
      expect(author.firstName).toEqual('Updated');
      expect(author.lastName).toEqual('Test');
    });
    it('should throw NotFoundException Error', () => {
      try {
        service.update({
          id: 999,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });
});
