import { Module } from '@nestjs/common';
import { ProductGraphqlResolver } from './product.graphql.resolver';
import { ProductDbModule } from '../db/product.db.module';
import { AttributeValueDbModule } from '../../attribute_value/db/attribute_value.db.module';

@Module({
  imports: [
    ProductDbModule,
    AttributeValueDbModule,
  ],
  providers: [ProductGraphqlResolver],
})
export class ProductGraphqlModule {}
