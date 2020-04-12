import {FindManyOptions, Repository} from 'typeorm';
import { NotAcceptableException } from '@nestjs/common';

export class BaseDbService<T> {
  constructor(protected repo: Repository<T>) {}

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  async remove(id: number): Promise<number> {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return id;
  }

  save<S>(entity: S[]) {
    return this.repo.save<S>(entity as unknown as S[]);
  }

  async update(id: number, entity: T): Promise<T> {
    const result = await this.repo.update(id, entity);

    if (result.affected === 0) {
      throw new NotAcceptableException('No entity found');
    }

    return { ...entity, id };
  }
}
