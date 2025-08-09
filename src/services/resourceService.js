const { Resource, Permission, Role } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class ResourceService {
  static async getAllResources() {
    const resources = await Resource.findAll({
      order: [['created_at', 'DESC']]
    });

    return {
      data: {
        resources
      }
    };
  }

  static async createResource(resourceData) {
    return await Resource.create(resourceData);
  }

  static async updateResource(id, resourceData) {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      throw new AppError('No resource found with that ID', 404);
    }

    return await resource.update(resourceData);
  }

  static async deleteResource(id) {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      throw new AppError('No resource found with that ID', 404);
    }

    const permissions = await resource.getPermissions({
      include: [{ model: Role, as: 'roles' }]
    });

    const hasAssignedPermissions = permissions.some((p) => p.roles.length > 0);

    if (hasAssignedPermissions) {
      throw new AppError('Cannot delete resource with permissions assigned to roles', 400);
    }

    await Permission.destroy({
      where: {
        resource_id: id
      }
    });

    return await resource.destroy();
  }

  static async getResourceById(id) {
    const resource = await Resource.findByPk(id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          attributes: ['id', 'tag', 'action', 'description']
        }
      ]
    });

    if (!resource) {
      throw new AppError('No resource found with that ID', 404);
    }

    return resource;
  }
}

module.exports = ResourceService;
