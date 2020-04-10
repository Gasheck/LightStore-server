import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDbService } from './product.db.service';
import { Product } from "./product.db.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductDbService],
  exports: [ProductDbService],
})
export class ProductDbModule {}
