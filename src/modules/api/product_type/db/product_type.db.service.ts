import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './product_type.db.entity';
import { BaseDbService } from '../../../db/base/base.db.service';

@Injectable()
export class ProductTypeDbService extends BaseDbService<ProductType> {
  constructor(@InjectRepository(ProductType) repo) {
    super(repo);
  }
}
