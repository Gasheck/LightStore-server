import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import {BaseDbService} from "../base/base.db.service";

@Injectable()
export class ProductService extends BaseDbService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  findAll(): Promise<Product[]> {
    return this.repo.find({ relations: ['type'] });
  }
}
