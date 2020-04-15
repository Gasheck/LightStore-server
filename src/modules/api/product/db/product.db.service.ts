import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.db.entity';
import {BaseDbService} from "../../../db/base/base.db.service";
import {In} from "typeorm";

@Injectable()
export class ProductDbService extends BaseDbService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  async findMany(id?: number[]): Promise<Product[]> {
    if (id !== undefined) {
      return this.repo.find({
        where: { id: In(id) },
        relations: ['type'],
      });
    }

    return this.repo.find({ relations: ['type'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['type'],
    });
  }
}
