'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LeadSource extends Model {
    static associate(models) {
      LeadSource.belongsTo(models.Lead, {
        foreignKey: 'source',
        as: 'lead',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  LeadSource.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      leadKey: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'lead_key'
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'LeadSource',
      tableName: 'lead_sources',
      underscored: true,
      timestamps: true
    }
  );

  return LeadSource;
};
