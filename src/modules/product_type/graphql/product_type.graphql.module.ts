import { Module } from '@nestjs/common';
import { ProductTypeGraphqlResolver } from './product_type.graphql.resolver';
import { ProductTypeDbModule } from 'src/modules/product_type/db/product_type.db.module';

@Module({
  imports: [ProductTypeDbModule],
  providers: [ProductTypeGraphqlResolver],
})
export class ProductTypeGraphqlModule {}
