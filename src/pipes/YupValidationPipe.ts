import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema<{}>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
    } catch (err) {
      throw err;
    }
    return value;
  }
}
