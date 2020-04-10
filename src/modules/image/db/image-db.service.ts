import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image-db.model';
import { AddImageDto } from './types';

@Injectable()
export class ImageDbService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  add(addImageDto: AddImageDto): Promise<Image> {
    const createdImage = new this.imageModel(addImageDto);
    return createdImage.save();
  }

  findOne(fields: Partial<AddImageDto>): Promise<Image> {
    return this.imageModel.findOne(fields);
  }

  find(): Promise<Image[]> {
    return this.imageModel.find();
  }
}
