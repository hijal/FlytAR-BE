'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Resource extends Model {
    static associate(models) {
      Resource.hasMany(models.Permission, {
        foreignKey: 'resource_id',
        as: 'permissions'
      });
    }
  }

  Resource.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      resKey: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: 'res_key',
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'Resource',
      tableName: 'resources',
      timestamps: true,
      underscored: true,
      hooks: {
        async afterCreate(resource, options) {
          const actions = ['create', 'get', 'update', 'delete'];
          const Permission = sequelize.models.Permission;

          const permissions = actions.map((action) => ({
            tag: `${resource.slug}:${action}`,
            resource_id: resource.id,
            action,
            description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${resource.name}`
          }));

          await Permission.bulkCreate(permissions, {
            transaction: options.transaction
          });
        }
      }
    }
  );

  return Resource;
};
