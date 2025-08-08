'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles'
      });
      User.hasOne(models.Token, {
        foreignKey: 'user_id',
        as: 'token',
        onDelete: 'CASCADE'
      });
      User.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });
    }

    async checkPassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    async getCurrentToken() {
      return this.getToken();
    }

    async getUserRole() {
      return this.getRole();
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      Object.keys(values).forEach((key) => {
        if (key.includes('_')) {
          delete values[key];
        }
      });
      return values;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userKey: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        field: 'user_key'
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'first_name',
        validate: {
          notEmpty: {
            msg: 'First name cannot be empty'
          },
          len: {
            args: [2, 50],
            msg: 'First name must be between 2 and 50 characters'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'last_name',
        validate: {
          notEmpty: {
            msg: 'Last name cannot be empty'
          },
          len: {
            args: [2, 50],
            msg: 'Last name must be between 2 and 50 characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: 'Email address already exists'
        },
        validate: {
          isEmail: {
            msg: 'Please provide a valid email address'
          }
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: 'Password must be at least 6 characters long'
          }
        }
      },
      phone: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: true
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        defaultValue: '',
        allowNull: false,
        field: 'profile_picture'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        field: 'is_active'
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login'
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'company_id'
      },
      invitedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'invited_by'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        }
      }
    }
  );

  return User;
};
