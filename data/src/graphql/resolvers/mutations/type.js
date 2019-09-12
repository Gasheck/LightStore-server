import Type from '../../../models/Type';
import { createTypeValidation } from '../../../../form-validation/src';

// eslint-disable-next-line import/prefer-default-export
export const { createType } = {
  createType: async (parent, { typeInput }) => {
    await createTypeValidation.validate(typeInput, { abortEarly: false });

    try {
      const type = new Type(typeInput);
      return await type.save();
    } catch (error) {
      throw error;
    }
  },
};
