import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GraphqlApiModule } from '../src/graphql-api.module';
import { Author } from '../src/authors/models/author.model';

describe('GraphqlApiController (e2e)', () => {
  let app: INestApplication;
  const GRAPHQL_ENDPOINT = '/graphql';

  const send = (data?: Record<string, unknown>) =>
    request(app.getHttpServer()).post(GRAPHQL_ENDPOINT).send(data);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GraphqlApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  describe('Query about Author', () => {
    describe('Query authors', () => {
      it('should return an Array', (done) => {
        send({
          query: `
            authors {
              authors {
                id
              }
            }
          `,
        })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.authors).toBeInstanceOf(Array);
          });
        done();
      });
    });

    describe('Query author', () => {
      it('should return an Author', (done) => {
        send({
          query: `
            author {
              author(id: 1) {
                id
              }
            }
          `,
        })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.author).toBeInstanceOf(Author);
          });
        done();
      });
    });

    describe('Mutation createAuthor', () => {
      it('should return an Author id greater than 0', (done) => {
        send({
          mutation: `
            createAuthor {
              createAuthor(input: {}) {
                id
              }
            }
          `,
        })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createAuthor.id).toBeGreaterThan(0);
          });
        done();
      });

      it('should return an Author about had default name', (done) => {
        send({
          mutation: `
            createAuthor {
              createAuthor(input: {}) {
                firstName
                lastName
              }
            }
          `,
        })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createAuthor.firstName).toBe('anonymous');
            expect(res.body.data.createAuthor.lastName).toBe('author');
          });
        done();
      });

      it('should return an Author about had name', (done) => {
        const firstName = 'Kim';
        const lastName = '123';
        send({
          mutation: `
            createAuthor {
              createAuthor(input: {
                firstName: "${firstName}",
                lastName: "${lastName}"
              })
            }
          `,
        })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createAuthor.firstName).toBe(firstName);
            expect(res.body.data.createAuthor.lastName).toBe(lastName);
          });
        done();
      });

      it.todo('failure create Author same name');
    });

    describe('Mutation updateAuthor', () => {
      it.todo('Update author');
    });

    describe('Mutation deleteAuthor', () => {
      it.todo('Delete author');
    });
  });
});
