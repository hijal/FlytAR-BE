'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LeadPriority extends Model {
    static associate(models) {
      LeadPriority.hasMany(models.Lead, {
        foreignKey: 'priority_id',
        as: 'lead',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  LeadPriority.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      priorityKey: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'priority_key'
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'LeadPriority',
      tableName: 'lead_priorities',
      underscored: true,
      timestamps: true
    }
  );

  return LeadPriority;
};
