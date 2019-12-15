import Product from '../../../models/Product';

// eslint-disable-next-line import/prefer-default-export
export const { getProducts } = {
  getProducts: async () => {
    try {
      return await Product.find()
        .populate('preview', 'filename')
        .populate('photos')
        .populate('type', 'name');
    } catch (err) {
      throw err;
    }
  },
};
