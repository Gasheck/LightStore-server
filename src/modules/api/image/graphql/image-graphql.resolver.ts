import { Resolver, Query } from '@nestjs/graphql';
import { ImageDbService } from '../db/image-db.service';

@Resolver('Image')
export class ImageGraphqlResolver {
  constructor(private readonly imageService: ImageDbService) {}

  @Query()
  async images() {
    try {
      return await this.imageService.find();
    } catch (error) {
      throw error;
    }
  }
}
