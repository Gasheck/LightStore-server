import { Module } from '@nestjs/common';
import { ProductTypeGraphqlResolver } from './product_type.graphql.resolver';
import { ProductTypeDbModule } from '../db/product_type.db.module';
import { ProductTypeModule } from '../../../db/product_type/product_type.module';

@Module({
  imports: [ProductTypeDbModule, ProductTypeModule],
  providers: [ProductTypeGraphqlResolver],
})
export class ProductTypeGraphqlModule {}
