import { Module } from '@nestjs/common';
import { AttributeDbModule } from './db/attribute.db.module';

@Module({
  imports: [AttributeDbModule],
})
export class AttributeModule {}
