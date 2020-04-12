import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeTypeDbService } from './attribute_type.db.service';
import { AttributeType } from './attribute_type.db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeType])],
  providers: [AttributeTypeDbService],
  exports: [AttributeTypeDbService],
})
export class AttributeTypeDbModule {}
