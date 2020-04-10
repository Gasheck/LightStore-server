import { Module } from '@nestjs/common';
import { ProductTypeDbModule } from './db/product_type.db.module';
import { ProductTypeGraphqlModule } from './graphql/product_type.graphql.module';

@Module({
  imports: [ProductTypeDbModule, ProductTypeGraphqlModule],
})
export class ProductTypeModule {}
