'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class JobStatus extends Model {
    static associate(models) {
      JobStatus.belongsTo(models.Job, {
        foreignKey: 'status',
        as: 'job',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  JobStatus.init(
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
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'JobStatus',
      tableName: 'job_statuses',
      underscored: true,
      timestamps: true
    }
  );

  return JobStatus;
};
