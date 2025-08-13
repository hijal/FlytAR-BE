const { Permission } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class PermissionService {
  static async getAllPermissions() {
    const permissions = await Permission.findAll();

    return permissions;
  }

  static async createPermission(permissionData) {
    return await Permission.create(permissionData);
  }

  static async updatePermission(id, permissionData) {
    const permission = await Permission.findByPk(id);

    if (!permission) {
      throw new AppError('No permission found with that ID', 404);
    }

    return await permission.update(permissionData);
  }

  static async deletePermission(id) {
    const permission = await Permission.findByPk(id);

    if (!permission) {
      throw new AppError('No permission found with that ID', 404);
    }

    const rolesCount = await permission.countRoles();
    if (rolesCount > 0) {
      throw new AppError('Cannot delete permission that is assigned to roles', 400);
    }

    return await permission.destroy();
  }
}

module.exports = PermissionService;
