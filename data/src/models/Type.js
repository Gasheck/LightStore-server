import { Schema, model } from 'mongoose';

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  attributes: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        values: {
          type: [String],
          required: true,
        },
      },
    ],
    required: true,
  },
});

export default model('Type', typeSchema);
