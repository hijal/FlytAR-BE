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
    const usersCount = await role.countUsers();
    if (usersCount > 0) {
      throw new AppError('Cannot delete role that is assigned to users', 400);
    }
    return await role.destroy();
  }

  static async assignPermissions(roleId, permissionData) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }

    const { permissionIds } = permissionData;
    const permissions = await Permission.findAll({
      where: {
        id: permissionIds
      }
    });

    await role.setPermissions(permissions);
    return role;
  }

  static async removePermissions(roleId, permissionData) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }

    const { permissionIds } = permissionData;
    const permissions = await Permission.findAll({
      where: {
        id: permissionIds
      }
    });

    if (permissions.length === 0) {
      throw new AppError('No permissions found with that ID', 404);
    }

    await role.removePermissions(permissions);
    return role;
  }

  static async rolePermissions(roleId) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      throw new AppError('No role found with that ID', 404);
    }

    const allPermissions = await Permission.findAll({
      attributes: ['id', 'tag']
    });

    if (role.slug === 'super-admin') {
      return {
        role: role.name,
        permissions: allPermissions.map((p) => ({
          id: p.id,
          tag: p.tag,
          assigned: true
        }))
      };
    }

    const assignedRolePermissions = await role.getPermissions({
      attributes: ['id']
    });

    const assignedIds = new Set(assignedRolePermissions.map((p) => p.id));

    return {
      role: role.name,
      permissions: allPermissions.map((p) => ({
        id: p.id,
        tag: p.tag,
        assigned: assignedIds.has(p.id)
      }))
    };
  }
}

module.exports = RoleService;
