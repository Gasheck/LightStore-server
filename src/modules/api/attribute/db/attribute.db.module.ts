import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeDbService } from './attribute.db.service';
import { Attribute } from './attribute.db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  providers: [AttributeDbService],
  exports: [AttributeDbService],
})
export class AttributeDbModule {}
