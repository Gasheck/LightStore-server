import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './product_type.entity';
import { BaseDbService } from '../base/base.db.service';

@Injectable()
export class ProductTypeService extends BaseDbService<ProductType> {
  constructor(@InjectRepository(ProductType) repo) {
    super(repo);
  }
}
