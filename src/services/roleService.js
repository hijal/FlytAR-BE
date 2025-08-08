const { Role, Permission } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class RoleService {
  static async getAllRoles() {
    const roles = await Role.findAll({
      order: [['created_at', 'DESC']]
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

  static async getRoleById(id) {
    const role = await Role.findByPk(id, {
      include: [{ model: Permission, as: 'permissions' }]
    });
    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }
    return role;
  }

  static async updateRole(id, roleData) {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }
    const { permissionIds, ...updateData } = roleData;

    const updatedRole = await role.update(updateData);

    if (permissionIds) {
      const permissions = await Permission.findAll({ where: { id: permissionIds } });
      await role.setPermissions(permissions);
    }
    return updatedRole;
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
