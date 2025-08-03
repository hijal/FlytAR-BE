const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users'
      });

      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: 'roleId',
        as: 'permissions'
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.ENUM('super-admin', 'admin', 'user'),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles',
      timestamps: true
    }
  );

  return Role;
};
