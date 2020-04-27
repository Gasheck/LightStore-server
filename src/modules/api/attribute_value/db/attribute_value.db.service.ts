import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDbService } from '../../../db/base/base.db.service';
import { AttributeValue } from './attribute_value.db.entity';

@Injectable()
export class AttributeValueDbService extends BaseDbService<AttributeValue> {
  constructor(@InjectRepository(AttributeValue) repo) {
    super(repo);
  }
}
