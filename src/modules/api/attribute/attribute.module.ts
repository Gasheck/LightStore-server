import { Module } from '@nestjs/common';
import { AttributeDbModule } from './db/attribute.db.module';
import {AttributeDbService} from "./db/attribute.db.service";

@Module({
  imports: [AttributeDbModule],
})
export class AttributeModule {}
