import { Repository } from 'typeorm';
import { NotAcceptableException } from '@nestjs/common';
import { omit } from 'lodash';

export class BaseDbService<T> {
  constructor(protected repo: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async remove(id: number): Promise<number> {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return id;
  }

  save(type: T): Promise<T> {
    return this.repo.save(type);
  }

  async update(id: number, entity: T): Promise<T> {
    const newEntity = omit(entity, ['id']);

    const result = await this.repo.update(id, newEntity);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return { id, ...newEntity };
  }
}
