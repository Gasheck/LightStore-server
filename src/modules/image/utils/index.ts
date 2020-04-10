import { ImageDbService } from '../db/image-db.service';
import { Image } from '../db/image-db.model';
const crypto = require('crypto');
const fs = require('fs');

const UPLOAD_DIR = './client/images';

export const getChecksum: (data: Buffer) => Promise<string> = async buffer => {
  return crypto
    .createHash('md5')
    .update(buffer, 'utf8')
    .digest('hex');
};

export const getAvailableFile: (
  checksum: string,
  imageService: ImageDbService,
) => Promise<Image> = (checksum, imageService) => {
  return imageService.findOne({ checksum });
};

export const storeFS: (
  checksum: string,
  filename: string,
  buffer: Buffer,
) => Promise<string> = async (checksum, filename, buffer) => {
  const name = `${checksum}-${filename}`;
  const path = `${UPLOAD_DIR}/${name}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(path, buffer, error => {
      if (error) {
        reject();
      }

      resolve(name);
    });
  });
};
