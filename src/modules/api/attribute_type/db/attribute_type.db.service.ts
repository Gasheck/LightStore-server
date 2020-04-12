import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDbService } from '../../../db/base/base.db.service';
import { AttributeType } from './attribute_type.db.entity';

@Injectable()
export class AttributeTypeDbService extends BaseDbService<AttributeType> {
  constructor(@InjectRepository(AttributeType) repo) {
    super(repo);
  }
}
