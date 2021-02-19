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
    it('should return an array', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a author', async () => {
      service.create({
        firstName: 'Test',
      });
      const author = await service.findOneById(1);
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
    it('delete a author', async () => {
      await service.create({
        firstName: 'Test',
      });
      const beforeDelete = (await service.findAll()).length;
      await service.delete(1);
      const afterDelete = (await service.findAll()).length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw NotFoundException Error', async () => {
      try {
        await service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const beforeCreate = (await service.findAll()).length;
      service.create({
        firstName: 'Test',
      });
      const afterCreate = (await service.findAll()).length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a author', async () => {
      await service.create({
        firstName: 'Test',
      });
      await service.update({
        id: 1,
        firstName: 'Updated',
        lastName: 'Test',
      });
      const author = await service.findOneById(1);
      expect(author.firstName).toEqual('Updated');
      expect(author.lastName).toEqual('Test');
    });
    it('should throw NotFoundException Error', async () => {
      try {
        await service.update({
          id: 999,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Author');
      }
    });
  });
});
