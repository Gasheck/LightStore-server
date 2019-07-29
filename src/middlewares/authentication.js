import jwt from 'jsonwebtoken';
import { isUserAdmin } from '../graphql/resolvers/helpers';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token || token === '') {
    req.isAuth = false;
    req.isAdmin = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.isAdmin = isUserAdmin(decodedToken.userId);
  req.userId = decodedToken.userId;
  return next();
};
