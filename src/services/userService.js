const { Op } = require('sequelize');
const { jwt } = require('../config/app');
const { signToken } = require('../middleware/auth');
const { User, Token, Role, Permission } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class UserService {
  static async getAllUsers(query) {
    const { page = 1, limit = 10, search, isActive } = query;
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (isActive !== undefined) whereClause.isActive = isActive;

    const users = await User.findAll({
      include: [{ model: Role, as: 'role' }],
      order: [['created_at', 'DESC']]
    });

    return {
      data: {
        users
      }
    };
  }

  static async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('No user found with that ID', 404);
    }
    return user;
  }

  static async createUser(userData) {
    return await User.create(userData);
  }

  static async updateUser(id, userData, currentUserId) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('No user found with that ID', 404);
    }
    if (user.id !== currentUserId) {
      throw new AppError('You do not have permission to update this user', 401);
    }
    return await user.update(userData);
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password))) {
      throw new AppError('Incorrect credentials', 401);
    }
    if (!user.isActive) {
      throw new AppError('Your account has been deactivated', 401);
    }

    await user.update({ lastLogin: new Date() });
    const token = signToken(user.id);
    const userToken = await user.getCurrentToken();

    if (userToken) {
      await Token.destroy({ where: { user_id: user.id } });
    }

    await Token.create({
      token,
      expires_at: new Date(Date.now() + jwt.expireIn),
      user_id: user.id
    });

    return { token, user };
  }
}

module.exports = UserService;
