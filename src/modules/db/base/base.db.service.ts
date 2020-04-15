import {FindManyOptions, In, Repository} from 'typeorm';
import { NotAcceptableException } from '@nestjs/common';

export class BaseDbService<T> {
  constructor(protected repo: Repository<T>) {}

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  async remove(id: number[]): Promise<number[]> {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return id;
  }

  save<T>(entity: T[]) {
    return this.repo.save<T>(entity as unknown as T[]);
  }

  async update(id: number, entity: T): Promise<number> {
    const result = await this.repo.update(id, entity);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return id;
  }
}
