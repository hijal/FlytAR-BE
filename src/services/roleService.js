const { Role } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class RoleService {
  static async getAllRoles() {
    const roles = await Role.findAll({
      order: [['createdAt', 'DESC']]
    });

    return {
      data: {
        roles
      }
    };
  }
  static async createRole(roleData) {
    return await Role.create(roleData);
  }

  static async updateRole(id, roleData) {
    const role = await Role.findByPk(id);
    
    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }
    return await role.update(roleData);
  }

  static async deleteRole(id) {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }
    return await role.destroy();
  }
}

module.exports = RoleService;
