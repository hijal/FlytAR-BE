'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
      Lead.belongsTo(models.Company, {
        foreignKey: 'assigned_to_company_id',
        as: 'assignedCompany'
      });

      Lead.belongsTo(models.User, {
        foreignKey: 'assigned_to_employee_id',
        as: 'assignedEmployee'
      });

      Lead.belongsTo(models.User, {
        foreignKey: 'assigned_by',
        as: 'assigner'
      });

      Lead.belongsTo(models.LeadSource, {
        foreignKey: 'source_id',
        as: 'source'
      });

      Lead.belongsTo(models.PropertyType, {
        foreignKey: 'property_type_id',
        as: 'propertyType'
      });

      Lead.belongsTo(models.LeadStatus, {
        foreignKey: 'status_id',
        as: 'status'
      });

      Lead.belongsTo(models.LeadPriority, {
        foreignKey: 'priority_id',
        as: 'priority'
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
      leadKey: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'lead_key'
      },
      source_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'source_id',
        references: {
          model: 'lead_sources',
          key: 'id'
        }
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
      propertyTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'property_type_id',
        references: {
          model: 'property_types',
          key: 'id'
        }
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
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'status_id',
        defaultValue: 1,
        references: {
          model: 'lead_statuses',
          key: 'id'
        }
      },
      priorityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'priority_id',
        defaultValue: 2,
        references: {
          model: 'lead_priorities',
          key: 'id'
        }
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
      underscored: true,
      paranoid: true
    }
  );

  return Lead;
};
