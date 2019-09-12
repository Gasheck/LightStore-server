import Category from '../../../models/Category';
import { getProductSet } from '../helpers';

const getCategoriesById = id => getProductSet(Category, id);

// eslint-disable-next-line import/prefer-default-export
export const { getCategories } = {
  /*
  query($id: ID) {
    groups(id: $id) {
      name
    }
  }

  {
    "id": "5cc7796eb8e8a60008c6477b"
  }
  */
  getCategories: (parent, args = {}) => {
    const { id } = args;
    return getCategoriesById(id);
  },
};
