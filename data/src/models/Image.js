import { Schema, model } from 'mongoose';

const imagesSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
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

export default model('Image', imagesSchema);
