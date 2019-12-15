import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
  ],
  preview: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
  ],
});

export default model('Product', productSchema);
