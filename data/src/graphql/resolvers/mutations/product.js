import Product from '../../../models/Product';
import Image from '../../../models/Image';
import FileUpload from '../../components/FileUpload';
import { createProductValidation } from '../../../../form-validation/src';

export const { createProduct, updateProduct, deleteProduct } = {
  createProduct: async (parent, { productInput }) => {
    await createProductValidation.validate(productInput, { abortEarly: false });

    const {
      name,
      quantity,
      price,
      description,
      type,
      mainPhoto = 0,
      photos = [],
    } = productInput;

    try {
      const savedPhotos = await FileUpload({ files: photos, FileModel: Image });
      const product = new Product({
        name,
        quantity,
        price,
        description,
        type,
        preview: savedPhotos[mainPhoto],
        photos: savedPhotos,
      });

      await product
        .populate('preview', 'filename')
        .populate('photos')
        .populate('type', 'name')
        .save();
      return await product.execPopulate();
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async args => {
    const { id, ...restArgs } = args.productInput;
    const product = await Product.findByIdAndUpdate(id, restArgs, {
      new: true,
    });
    return product._doc;
  },

  deleteProduct: async (parent, { id }) => {
    const product = await Product.findByIdAndDelete(id);
    return product._id;
  },
};
