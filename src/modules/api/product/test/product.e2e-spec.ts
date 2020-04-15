import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ProductMock } from './product.mock';
import { ProductModule } from '../product.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../db/product.db.entity';
import { CommonGraphqlModule } from '../../../common/graphql/common.graphql.module';
import { Repository } from 'typeorm';
import {
  CreateProductGraphqlMock,
  RemoveProductGraphqlMock,
  UpdateProductGraphqlMock,
} from './product.graphql.mock';
import { Attribute } from '../../attribute/db/attribute.db.entity';
import {
  MockType,
  repositoryMockFactory,
} from '../../../db/base/test/repositoryMockFactory';
import { AttributeModule } from '../../attribute/attribute.module';

const errorRequestTest = (app, query, dataKey?) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query,
      operationName: null,
    })
    .expect(({ body }) => {
      const data = dataKey ? body.data[dataKey] : body.data;
      const errors = body.errors;
      expect(data).toBe(null);
      expect(errors?.[0]?.message?.statusCode).toBe(406);
    })
    .expect(200);
};

const successRequestTest = (app, query, expected, dataKey?) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .send({
      operationName: null,
      query: query,
    })
    .expect(({ body }) => {
      const data = dataKey ? body.data[dataKey] : body.data;
      const errors = body.errors;
      expect(errors).toBe(undefined);
      expect(data).toStrictEqual(expected);
    })
    .expect(200);
};

describe('Product (e2e)', () => {
  let app;
  let productRepositoryMock: MockType<Repository<Product>>;
  let attributeRepositoryMock: MockType<Repository<Attribute>>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, AttributeModule, CommonGraphqlModule],
    })
      .overrideProvider(getRepositoryToken(Product))
      .useFactory({ factory: repositoryMockFactory })
      .overrideProvider(getRepositoryToken(Attribute))
      .useFactory({ factory: repositoryMockFactory })
      .compile();

    productRepositoryMock = moduleFixture.get(getRepositoryToken(Product));
    attributeRepositoryMock = moduleFixture.get(getRepositoryToken(Attribute));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Product', () => {
    it('Should return created product', () => {
      productRepositoryMock.save.mockReturnValueOnce([ProductMock]);
      return successRequestTest(
        app,
        CreateProductGraphqlMock,
        [ProductMock],
        'createProduct',
      );
    });
  });

  describe('Update Product', () => {
    it('Should return updated product', () => {
      productRepositoryMock.update.mockReturnValueOnce({ affected: 1 });
      productRepositoryMock.findOne.mockReturnValueOnce(ProductMock);
      return successRequestTest(
        app,
        UpdateProductGraphqlMock,
        ProductMock,
        'updateProduct',
      );
    });

    it('Should return an error', () => {
      productRepositoryMock.update.mockReturnValueOnce({ affected: 0 });
      return errorRequestTest(app, UpdateProductGraphqlMock);
    });
  });

  describe('Remove Product', () => {
    it('Should return id array', () => {
      productRepositoryMock.delete.mockReturnValueOnce({ affected: 1 });
      productRepositoryMock.find.mockReturnValueOnce([ProductMock]);
      return successRequestTest(
        app,
        RemoveProductGraphqlMock,
        [ProductMock],
        'removeProduct',
      );
    });

    it('Should return an error', () => {
      productRepositoryMock.delete.mockReturnValueOnce({ affected: 0 });
      return errorRequestTest(app, RemoveProductGraphqlMock, 'removeProduct');
    });
  });
});
