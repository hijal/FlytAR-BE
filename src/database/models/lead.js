'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      Lead.belongsTo(models.Company, {
        foreignKey: 'assignedToCompanyId',
        as: 'assignedCompany'
      });

      Lead.belongsTo(models.User, {
        foreignKey: 'assignedToEmployeeId',
        as: 'assignedEmployee'
      });

      Lead.belongsTo(models.User, {
        foreignKey: 'assignedBy',
        as: 'assigner'
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

  Lead.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      source: {
        type: DataTypes.ENUM('website', 'referral', 'ads', 'other'),
        allowNull: true
      },
      assignedToCompanyId: {
        type: DataTypes.INTEGER,
        field: 'assigned_to_company_id',
        allowNull: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assignedToEmployeeId: {
        type: DataTypes.INTEGER,
        field: 'assigned_to_employee_id',
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assignedBy: {
        type: DataTypes.INTEGER,
        field: 'assigned_by',
        allowNull: true,
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
      propertyType: {
        type: DataTypes.ENUM('apartment', 'house', 'office', 'other'),
        allowNull: true,
        field: 'property_type'
      },
      residentsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'residents_count'
      },
      movingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'moving_date'
      },
      estimatedPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'estimated_price'
      },
      status: {
        type: DataTypes.ENUM('new', 'contacted', 'in_progress', 'closed', 'converted'),
        allowNull: false,
        defaultValue: 'new'
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
        allowNull: false,
        defaultValue: 'medium'
      },
      contactedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'contacted_at'
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      convertedToJobId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'converted_to_job_id'
      },
      convertedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'converted_at'
      }
    },
    {
      sequelize,
      modelName: 'Lead',
      tableName: 'leads',
      timestamps: true,
      underscored: true
    }
  );

  return Lead;
};
