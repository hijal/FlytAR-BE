'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
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

  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      comKey: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'com_key'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Company name is required' },
          len: { args: [1, 100], msg: 'Name must be between 1 and 100 characters' }
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: { msg: 'Must be a valid email address' }
        }
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          len: { args: [0, 20], msg: 'Phone number can be up to 20 characters' }
        }
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      logoUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'logo_url',
        validate: {
          isUrl: { msg: 'Logo URL must be a valid URL' }
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
      },
      subscription: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'subscriptions',
          key: 'id'
        }
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'created_by'
      }
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'companies',
      underscored: true,
      timestamps: true
    }
  );

  return Company;
};
