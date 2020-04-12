import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageDbService } from './db/image-db.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddImageDto } from './types';
import { Image } from './db/image-db.model';
import { getChecksum, getAvailableFile, storeFS } from './utils';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageDbService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async add(@UploadedFile() file: AddImageDto): Promise<Image | never> {
    const { mimetype, originalname, buffer } = file;

    try {
      const checksum = await getChecksum(buffer);
      const availableFile = await getAvailableFile(checksum, this.imageService);

      if (availableFile !== null && availableFile._id) {
        return Promise.resolve(availableFile);
      }

      const name = await storeFS(checksum, originalname, buffer);

      return this.imageService.add({
        checksum,
        mimetype,
        filename: name,
      });
    } catch (error) {
      throw error;
    }
  }
}
