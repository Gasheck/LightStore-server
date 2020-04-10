import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductMock } from './product.mock';
import { ProductModule } from '../product.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../db/product.db.entity';
import { GraphqlModule } from '../../common/graphql/graphql.module';
import {
  MockType,
  repositoryMockFactory,
} from '../../base/db/test/repositoryMockFactory';
import { Repository } from 'typeorm';
import {
  CreateProductGraphqlMock,
  UpdateProductGraphqlMock,
} from './product.graphql.mock';

describe('Product (e2e)', () => {
  let app;
  let repositoryMock: MockType<Repository<Product>>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, GraphqlModule],
    })
      .overrideProvider(getRepositoryToken(Product))
      .useFactory({ factory: repositoryMockFactory })
      .compile();

    repositoryMock = moduleFixture.get(getRepositoryToken(Product));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Product', () => {
    it('Should return created product', () => {
      repositoryMock.save.mockReturnValueOnce([ProductMock]);
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: CreateProductGraphqlMock,
        })
        .expect(({ body }) => {
          const data = body.data.createProduct;
          const errors = body.errors;
          expect(errors).toBe(undefined);
          expect(data).toStrictEqual([ProductMock]);
        })
        .expect(200);
    });
  });

  describe('Update Product', () => {
    it('Should return updated product', () => {
      repositoryMock.save.mockReturnValueOnce([ProductMock]);
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: CreateProductGraphqlMock,
        })
        .expect(({ body }) => {
          const data = body.data.createProduct;
          const errors = body.errors;
          expect(errors).toBe(undefined);
          expect(data).toStrictEqual([ProductMock]);
        })
        .expect(200);
    });

    it('Should return an error', () => {
      repositoryMock.update.mockReturnValueOnce({ affected: 0 });
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: UpdateProductGraphqlMock,
        })
        .expect(({ body }) => {
          const data = body.data.updateProduct;
          const errors = body.errors;
          expect(data).toBe(null);
          expect(errors?.[0]?.message?.statusCode).toBe(406);
        })
        .expect(200);
    });
  });
});
