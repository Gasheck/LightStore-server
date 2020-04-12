import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeService } from './product_type.service';
import { ProductType } from "./product_type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductType]),
  ],
  providers: [ProductTypeService],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
