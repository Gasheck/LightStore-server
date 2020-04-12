import { Module } from '@nestjs/common';
import { AttributeTypeDbModule } from './db/attribute_type.db.module';

@Module({
  imports: [AttributeTypeDbModule],
})
export class AttributeModule {}
