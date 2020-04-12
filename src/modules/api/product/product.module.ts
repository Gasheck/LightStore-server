import { Module } from '@nestjs/common';
import { ProductGraphqlModule } from './graphql/product.graphql.module';

@Module({
  imports: [ProductGraphqlModule],
})
export class ProductModule {}
