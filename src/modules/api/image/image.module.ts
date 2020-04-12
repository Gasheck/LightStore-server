import { Module } from '@nestjs/common';
import { ImageDbModule } from './db/image-db.module';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {ImageGraphqlModule} from "./graphql/image-graphql.module";

@Module({
  imports: [
    ImageDbModule,
    ImageGraphqlModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}
