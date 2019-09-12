import Type from '../../../models/Type';

// eslint-disable-next-line import/prefer-default-export
export const { getTypes } = {
  getTypes: async () => {
    try {
      return await Type.find();
    } catch (err) {
      throw err;
    }
  },
};
