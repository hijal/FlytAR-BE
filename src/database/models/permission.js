const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: 'permissionId',
        as: 'roles'
      });

      Permission.belongsToMany(models.User, {
        through: models.UserPermission,
        foreignKey: 'permissionId',
        as: 'users'
      });
    }
  }

  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Format: resource:action (e.g., account:get, transaction:create)'
      },
      resource: {
        type: DataTypes.STRING,
        allowNull: false
      },
      action: {
        type: DataTypes.ENUM('get', 'list', 'create', 'update', 'delete'),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'Permissions',
      timestamps: true
    }
  );

  return Permission;
};
