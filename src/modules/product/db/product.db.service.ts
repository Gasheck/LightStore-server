import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.db.entity';
import {BaseDbService} from "../../base/db/base.db.service";

@Injectable()
export class ProductDbService extends BaseDbService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  findAll(): Promise<Product[]> {
    return this.repo.find({ relations: ['type'] });
  }
}
