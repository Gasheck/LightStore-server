import { createProductSet } from '../helpers';
import Category from '../../../models/Category';

// eslint-disable-next-line import/prefer-default-export
export const { createCategory } = {
  createCategory: ({ categoryInput: { name } }) =>
    createProductSet(Category, name),
};
