import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValueDbService } from './attribute_value.db.service';
import { AttributeValue } from './attribute_value.db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue])],
  providers: [AttributeValueDbService],
  exports: [AttributeValueDbService],
})
export class AttributeValueDbModule {}
