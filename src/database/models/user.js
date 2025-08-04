'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
      User.hasOne(models.Token, {
        foreignKey: 'userId',
        as: 'token',
        onDelete: 'CASCADE'
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
      user_key: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      invitedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
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
