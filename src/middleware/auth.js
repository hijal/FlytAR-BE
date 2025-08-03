const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { AppError } = require('./errorHandler');
const app = require('../config/app');

const signToken = (id) => {
  return jwt.sign({ id }, app.jwt.secret, {
    expiresIn: app.jwt.expireIn
  });
};

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access', 401));
    }

    const decoded = jwt.verify(token, app.jwt.secret);

    const currentUser = await User.findByPk(decoded.id);

    const currentToken = await currentUser.getCurrentToken();

    if (currentToken.token !== token) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    if (!currentUser.isActive) {
      return next(new AppError('Your account has been deactivated', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { signToken, protect };
