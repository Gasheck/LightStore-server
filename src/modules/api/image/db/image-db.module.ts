import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image-db.model';
import { ImageDbService } from './image-db.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ImageDbService],
  exports: [ImageDbService],
})
export class ImageDbModule {}
