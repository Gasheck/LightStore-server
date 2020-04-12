import { Schema, Document } from 'mongoose';

export const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  checksum: {
    type: String,
    required: true,
  },
});

export interface Image extends Document {
  _id: string;
  filename: string;
  mimetype: string;
  checksum: string;
}
