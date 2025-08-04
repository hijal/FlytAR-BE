'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
      });
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: 'role_id',
        otherKey: 'permission_id',
        as: 'permissions'
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      roleKey: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        field: 'role_key'
      },
      name: {
        type: DataTypes.ENUM('Super Admin', 'Company Admin', 'Surveyor', 'Mover', 'Customer'),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Role name cannot be empty'
          },
          isIn: {
            args: [['Super Admin', 'Company Admin', 'Surveyor', 'Mover', 'Customer']],
            msg: 'Invalid role name'
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
      modelName: 'Role',
      tableName: 'roles',
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Role;
};
