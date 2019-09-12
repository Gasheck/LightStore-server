import crypt from 'simplecrypt';
import User from '../../../models/User';

// eslint-disable-next-line import/prefer-default-export
export const { createUser } = {
  createUser: async ({ userInput: { email, password } }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = crypt.encrypt(password);

      const user = new User({
        email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
