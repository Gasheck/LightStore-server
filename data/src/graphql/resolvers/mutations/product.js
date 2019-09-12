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
      photos,
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
      return await product.save();
    } catch (error) {
      throw error;
    }
  },

  /*
  mutation($id: ID!, $name: String!) {
    updateProduct(productInput: {
      id: $id,
      name: $name,
    }) {
      name
    }
  }

  {
    "id": "5cc77ae1b8e8a60008c64781",
    "name": "Гель-алоэ"
  }
  */
  updateProduct: async args => {
    const { id, ...restArgs } = args.productInput;
    const product = await Product.findByIdAndUpdate(id, restArgs, {
      new: true,
    });
    return product._doc;
  },

  /*
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      name
    }
  }

  {
    "id": "5cc7370518430d00086994ed"
  }
  */
  deleteProduct: async ({ id }) => {
    const product = await Product.findByIdAndDelete(id);
    return product._doc;
  },
};
