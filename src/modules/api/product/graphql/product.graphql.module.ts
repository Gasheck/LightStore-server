import { Module } from '@nestjs/common';
import { ProductGraphqlResolver } from './product.graphql.resolver';
import { ProductModule } from '../../../db/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [ProductGraphqlResolver],
})
export class ProductGraphqlModule {}
