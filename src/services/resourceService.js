const { Resource } = require('../database/models');
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

    return await resource.destroy();
  }
}

module.exports = ResourceService;
