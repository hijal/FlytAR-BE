'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LeadStatus extends Model {
    static associate(models) {
      LeadStatus.hasMany(models.Lead, {
        foreignKey: 'status_id',
        as: 'lead',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  LeadStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      statusKey: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'status_key'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'new'
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
      modelName: 'LeadStatus',
      tableName: 'lead_statuses',
      underscored: true,
      timestamps: true
    }
  );

  return LeadStatus;
};
