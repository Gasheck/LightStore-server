import { Module } from '@nestjs/common';
import { ImageGraphqlResolver } from './image-graphql.resolver';
import { ImageDbModule } from '../db/image-db.module';

@Module({
  imports: [ImageDbModule],
  providers: [ImageGraphqlResolver],
})
export class ImageGraphqlModule {}
