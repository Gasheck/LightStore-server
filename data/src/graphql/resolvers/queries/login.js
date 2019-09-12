import jwt from 'jsonwebtoken';
import crypt from 'simplecrypt';
import User from '../../../models/User';
import { tokenExpiresIn, tokenKey, tokenCookieName } from '../../../cfg/auth';
import { isUserAdmin } from '../helpers';

export default async ({ email, password }, { res }) => {
  const {
    id: userId,
    password: userPassword,
    email: userEmail,
  } = await User.findOne({ email });
  if (!userId) {
    throw new Error('User does not exist!');
  }
  const isEqual = crypt.decrypt(userPassword) === password;
  if (!isEqual) {
    throw new Error('Password is incorrect!');
  }
  const token = jwt.sign({ userId, email: userEmail }, tokenKey, {
    expiresIn: `${tokenExpiresIn}h`,
  });
  res.cookie(tokenCookieName, token, {
    expires: new Date(Date.now() + tokenExpiresIn * 3600000),
    httpOnly: true,
  });
  return { isAdmin: isUserAdmin(userId) };
};
