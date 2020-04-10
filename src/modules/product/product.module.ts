import { Module } from '@nestjs/common';
import { ProductDbModule } from './db/product.db.module';
import { ProductGraphqlModule } from './graphql/product.graphql.module';

@Module({
  imports: [ProductGraphqlModule, ProductDbModule],
})
export class ProductModule {}
