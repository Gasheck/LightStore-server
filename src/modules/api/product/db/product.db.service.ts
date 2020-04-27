import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.db.entity';
import { BaseDbService } from '../../../db/base/base.db.service';
import { AttributeValue } from '../../attribute_value/db/attribute_value.db.entity';
import { Attribute } from '../../attribute/db/attribute.db.entity';
import { AttributeType } from '../../attribute_type/db/attribute_type.db.entity';
import { ProductType } from '../../product_type/db/product_type.db.entity';

@Injectable()
export class ProductDbService extends BaseDbService<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }

  async findMany(id?: number[]): Promise<ProductRawData[]> {
    return this.repo
      .createQueryBuilder('p')
      .innerJoin(AttributeValue, 'av', 'av.product = p.id')
      .innerJoin(Attribute, 'a', 'p.type = a.product_type')
      .innerJoin(AttributeType, 'at', 'a.attribute_type = at.id')
      .innerJoin(ProductType, 'pt', 'p.type = pt.id')
      .where('p.id IN (:...id)', { id })
      .select([
        'p',
        'pt',
        'a.id',
        'a.name',
        'at',
        'av.id',
        'av.string_value',
        'av.number_value',
      ])
      .getRawMany<ProductRawData>();
  }

  find() {
    return this.repo.find({ relations: ['type'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['type'],
    });
  }
}
