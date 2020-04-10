import { Injectable, PipeTransform } from '@nestjs/common';
import { cloneDeep } from 'lodash';

@Injectable()
export class PrototypeFullObjectPipe implements PipeTransform {
  async transform(value: any) {
    if (Array.isArray(value)) {
      return [...value];
    }
    return cloneDeep(value);
  }
}
