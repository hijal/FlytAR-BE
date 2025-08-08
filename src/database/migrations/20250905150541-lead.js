'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leads', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      lead_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      source_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'lead_sources',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assigned_to_company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assigned_to_employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      assigned_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      customer_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      customer_email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      customer_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      pickup_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      delivery_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      property_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'property_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      residents_count: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      moving_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      estimated_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lead_statuses',
          key: 'id'
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      priority_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lead_priorities',
          key: 'id'
        },
        defaultValue: 2,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      contacted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      converted_to_job_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      converted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('leads', ['source_id'], { name: 'idx_leads_source_id' });
    await queryInterface.addIndex('leads', ['assigned_to_company_id'], { name: 'idx_leads_assigned_to_company_id' });
    await queryInterface.addIndex('leads', ['assigned_to_employee_id'], { name: 'idx_leads_assigned_to_employee_id' });
    await queryInterface.addIndex('leads', ['assigned_by'], { name: 'idx_leads_assigned_by' });
    await queryInterface.addIndex('leads', ['customer_email'], { name: 'idx_leads_customer_email' });
    await queryInterface.addIndex('leads', ['customer_phone'], { name: 'idx_leads_customer_phone' });
    await queryInterface.addIndex('leads', ['status_id'], { name: 'idx_leads_status_id' });
    await queryInterface.addIndex('leads', ['priority_id'], { name: 'idx_leads_priority_id' });
    await queryInterface.addIndex('leads', ['converted_to_job_id'], { name: 'idx_leads_converted_to_job_id' });
    await queryInterface.addIndex('leads', ['created_at'], { name: 'idx_leads_created_at' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('leads', 'idx_leads_source_id');
    await queryInterface.removeIndex('leads', 'idx_leads_assigned_to_company_id');
    await queryInterface.removeIndex('leads', 'idx_leads_assigned_to_employee_id');
    await queryInterface.removeIndex('leads', 'idx_leads_assigned_by');
    await queryInterface.removeIndex('leads', 'idx_leads_customer_email');
    await queryInterface.removeIndex('leads', 'idx_leads_customer_phone');
    await queryInterface.removeIndex('leads', 'idx_leads_status_id');
    await queryInterface.removeIndex('leads', 'idx_leads_priority_id');
    await queryInterface.removeIndex('leads', 'idx_leads_converted_to_job_id');
    await queryInterface.removeIndex('leads', 'idx_leads_created_at');

    await queryInterface.dropTable('leads');
  }
};
