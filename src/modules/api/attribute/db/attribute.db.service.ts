import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDbService } from '../../../db/base/base.db.service';
import { Attribute } from './attribute.db.entity';

@Injectable()
export class AttributeDbService extends BaseDbService<Attribute> {
  constructor(@InjectRepository(Attribute) repo) {
    super(repo);
  }
}
