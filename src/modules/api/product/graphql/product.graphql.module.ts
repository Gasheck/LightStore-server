import { Module } from '@nestjs/common';
import { ProductGraphqlResolver } from './product.graphql.resolver';
import { ProductDbModule } from '../db/product.db.module';

@Module({
  imports: [ProductDbModule],
  providers: [ProductGraphqlResolver],
})
export class ProductGraphqlModule {}
