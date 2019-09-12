// import { flatten, isEmpty, map } from 'lodash';
// import { getProductSet } from '../helpers';
// import Product from '../../../models/Product';
// import Category from '../../../models/Category';

// const getGroupsById = id => getProductSet(Group, id);
// const getCategoriesById = id => getProductSet(Category, id);

// eslint-disable-next-line import/prefer-default-export
export const { getProducts } = {
  /*
  query($groupId: ID) {
    products(groupId: $groupId) {
      name
      category {
        name
      }
    }
  }

  {
    "groupId": "5ce70a4a3b722f0008656795"
  }
  */
  getProducts: async (/* parent, args = {} */) => {
    // const { categoryId: receivedCategoryId, groupId } = args;
    // try {
    //   const groupsById = await getGroupsById(groupId);
    //
    //   const categoryId = isEmpty(receivedCategoryId)
    //     ? flatten(map(groupsById, group => group.category))
    //     : receivedCategoryId;
    //
    //   const productsByCategoriesId = isEmpty(categoryId)
    //     ? await Product.find()
    //     : await Product.find({ category: { $in: categoryId } });
    //
    //   return productsByCategoriesId.map(product => ({
    //     ...product._doc,
    //     id: product._doc._id,
    //     category: getCategoriesById.bind(this, product._doc.category),
    //     group: groupsById,
    //   }));
    // } catch (err) {
    //   throw err;
    // }
  },
};
