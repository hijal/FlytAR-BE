const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RolePermission extends Model {
    static associate(models) {
      RolePermission.belongsTo(models.Role, {
        foreignKey: 'roleId'
      });

      RolePermission.belongsTo(models.Permission, {
        foreignKey: 'permissionId'
      });
    }
  }

  RolePermission.init(
    {
      roleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      permissionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Permissions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'RolePermission',
      tableName: 'RolePermissions',
      timestamps: true
    }
  );

  return RolePermission;
};
