import { array, object, string, number } from 'yup';

export const typeInputSchema = array().of(object().shape({
  id: number(),
  name: string()
    .min(3)
    .max(30)
    .required(),
}));
