const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: 'permissionId',
        as: 'roles'
      });
    }
  }

  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      per_key: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Format: resource:action (e.g., user:get, company:create)',
        validate: {
          notEmpty: {
            msg: 'Permission tag cannot be empty'
          },
          is: {
            args: /^[a-z]+:[a-z]+$/i,
            msg: 'Permission tag must be in format "resource:action"'
          }
        }
      },
      resource: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Resource cannot be empty'
          }
        }
      },
      action: {
        type: DataTypes.ENUM('get', 'list', 'create', 'update', 'delete'),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Action cannot be empty'
          },
          isIn: {
            args: [['get', 'list', 'create', 'update', 'delete']],
            msg: 'Invalid action value'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 255],
            msg: 'Description must be less than 255 characters'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'Permissions',
      timestamps: true,
      underscored: true
    }
  );

  return Permission;
};
