const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserPermission extends Model {
    static associate(models) {}
  }

  UserPermission.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
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
      modelName: 'UserPermission',
      tableName: 'UserPermissions',
      timestamps: true
    }
  );

  return UserPermission;
};
