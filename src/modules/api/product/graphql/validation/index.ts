import { array, object, string, number } from 'yup';

const product = {
  id: number(),
  name: string()
    .min(3)
    .max(30)
    .required(),
};

export const productInputCreateSchema = array().of(object().shape(product));
export const productInputUpdateSchema = object().shape(product);
