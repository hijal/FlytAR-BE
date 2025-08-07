'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PropertyType extends Model {
    static associate(models) {
      PropertyType.belongsTo(models.Lead, {
        foreignKey: 'propertyType',
        as: 'lead',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  PropertyType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      propertyKey: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'property_key'
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'company_id'
      }
    },
    {
      sequelize,
      modelName: 'PropertyType',
      tableName: 'property_types',
      underscored: true,
      timestamps: true
    }
  );

  return PropertyType;
};
