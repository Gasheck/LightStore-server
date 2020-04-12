import { Module } from '@nestjs/common';
import { ProductTypeDbService } from './product_type.db.service';
import { ProductTypeModule } from '../../../db/product_type/product_type.module';
import { AttributeDbModule } from '../../attribute/db/attribute.db.module';

@Module({
  imports: [ProductTypeModule, AttributeDbModule],
  providers: [ProductTypeDbService],
  exports: [ProductTypeDbService],
})
export class ProductTypeDbModule {}
