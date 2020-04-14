import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.db.entity';
import {BaseDbService} from "../../../db/base/base.db.service";

@Injectable()
export class ProductDbService extends BaseDbService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  find(): Promise<Product[]> {
    return this.repo.find({ relations: ['type'] });
  }

  findOne(options?) {
    return this.repo.findOne(options);
  }
}
