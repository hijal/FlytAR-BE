'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      UserRole.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });

      UserRole.belongsTo(models.User, {
        foreignKey: 'assigned_by',
        as: 'assignedByUser'
      });
    }
    toJSON() {
      const values = { ...this.get() };
      Object.keys(values).forEach((key) => {
        if (key.includes('_')) {
          delete values[key];
        }
      });
      return values;
    }
  }

  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      assignedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'assigned_by',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      assignedAt: {
        type: DataTypes.DATE,
        field: 'assigned_at',
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      timestamps: true,
      underscored: true
    }
  );

  return UserRole;
};
