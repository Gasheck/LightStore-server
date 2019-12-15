import Category from '../../../models/Category';
import { getProductSet } from '../helpers';

const getCategoriesById = id => getProductSet(Category, id);

// eslint-disable-next-line import/prefer-default-export
export const { getCategories } = {
  getCategories: (parent, args = {}) => {
    const { id } = args;
    return getCategoriesById(id);
  },
};
