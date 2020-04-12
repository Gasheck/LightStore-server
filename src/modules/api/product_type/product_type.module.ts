import { Module } from '@nestjs/common';
import { ProductTypeGraphqlModule } from './graphql/product_type.graphql.module';

@Module({
  imports: [ProductTypeGraphqlModule],
})
export class ProductTypeModule {}
