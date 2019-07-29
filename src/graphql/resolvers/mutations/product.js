import Product from '../../../models/Product';

export const { createProduct, updateProduct, deleteProduct } = {
  /*
  mutation($name: String!, $price: Float!, $description: String!, $group: ID!) {
    createProduct(productInput: {
      name: $name,
      price: $price,
      description: $description,
      group: $group,
    }) {
      name
    }
  }

  {
    "name": "p1",
    "price": 10,
    "description": "p1 desc",
    "group": "5cc7796eb8e8a60008c6477b"
  }
  */
  createProduct: async ({
    productInput: {
      name,
      quantity = 1,
      price,
      description,
      preview = '',
      photos = [],
      category,
    },
  }) => {
    const product = new Product({
      name,
      quantity,
      price,
      description,
      preview,
      photos,
      category,
    });
    const result = await product.save();
    return result._doc;
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
