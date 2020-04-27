import { Module } from '@nestjs/common';
import { ProductTypeGraphqlResolver } from './product_type.graphql.resolver';
import { ProductTypeDbModule } from '../db/product_type.db.module';
import { AttributeDbModule } from '../../attribute/db/attribute.db.module';

@Module({
  imports: [ProductTypeDbModule, AttributeDbModule],
  providers: [ProductTypeGraphqlResolver],
})
export class ProductTypeGraphqlModule {}
