import { Module } from '@nestjs/common';
import { AttributeValueDbModule } from './db/attribute_value.db.module';

@Module({
  imports: [AttributeValueDbModule],
})
export class AttributeValueModule {}
