const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../database/models');
const { AppError } = require('./errorHandler');
const app = require('../config/app');

const signToken = (id) => {
  return jwt.sign({ id }, app.jwt.secret, {
    expiresIn: app.jwt.expireIn
  });
};

const authenticate = async (req, res, next) => {
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

    const currentUser = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: 'roles',
          include: [
            {
              model: Permission,
              as: 'permissions'
            }
          ]
        }
      ]
    });

    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    if (!currentUser.isActive) {
      return next(new AppError('Your account has been deactivated', 401));
    }

    const currentToken = await currentUser.getCurrentToken();

    if (!currentToken) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    if (currentToken.token !== token) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError('You are not logged in! Please log in to get access', 401));
      }

      const userPermissions = [];

      req.user.roles.forEach((role) => {
        role.permissions.forEach((permission) => {
          userPermissions.push(permission.tag);
        });
      });

      const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));

      if (!hasPermission) {
        return next(
          new AppError(
            `You do not have permission to perform this action (required permissions: ${requiredPermissions.join(
              ', '
            )})`,
            403
          )
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError('You are not logged in! Please log in to get access', 401));
      }

      const userRoles = req.user.roles.map((role) => role.name);
      const hasRole = roles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        return next(
          new AppError(`You do not have permission to perform this action (required roles: ${roles.join(', ')})`, 403)
        );
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { signToken, authenticate, authorize, checkRole };
