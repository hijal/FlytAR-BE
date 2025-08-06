'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });

      Job.belongsTo(models.Lead, {
        foreignKey: 'leadId',
        as: 'lead'
      });

      Job.belongsTo(models.User, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      Job.belongsTo(models.User, {
        foreignKey: 'assignedSurveyorId',
        as: 'surveyor'
      });

      Job.belongsTo(models.User, {
        foreignKey: 'assignedMoverId',
        as: 'mover'
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

  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'company_id',
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      leadId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'lead_id',
        references: {
          model: 'leads',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'customer_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assignedSurveyorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'assigned_surveyor_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assignedMoverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'assigned_mover_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      customerName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'customer_name'
      },
      customerEmail: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'customer_email'
      },
      customerPhone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'customer_phone'
      },
      pickupAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'pickup_address'
      },
      deliveryAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'delivery_address'
      },
      jobDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'job_date'
      },
      status: {
        type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'scheduled'
      },
      estimatedHours: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'estimated_hours'
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'total_price'
      }
    },
    {
      sequelize,
      modelName: 'Job',
      tableName: 'jobs',
      timestamps: true,
      underscored: true
    }
  );

  return Job;
};
