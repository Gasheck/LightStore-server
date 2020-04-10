import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeDbService } from './product_type.db.service';
import { ProductType } from "./product_type.db.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductType]),
  ],
  providers: [ProductTypeDbService],
  exports: [ProductTypeDbService],
})
export class ProductTypeDbModule {}
