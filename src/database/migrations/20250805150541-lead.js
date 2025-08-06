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
      source: {
        type: Sequelize.ENUM('website', 'referral', 'ads', 'other'),
        allowNull: true
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
      property_type: {
        type: Sequelize.ENUM('apartment', 'house', 'office', 'other'),
        allowNull: true
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
      status: {
        type: Sequelize.ENUM('new', 'contacted', 'in_progress', 'closed', 'converted'),
        allowNull: false,
        defaultValue: 'new'
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
        allowNull: false,
        defaultValue: 'medium'
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

    await queryInterface.addIndex('leads', ['assigned_to_company_id']);
    await queryInterface.addIndex('leads', ['assigned_to_employee_id']);
    await queryInterface.addIndex('leads', ['assigned_by']);
    await queryInterface.addIndex('leads', ['customer_email']);
    await queryInterface.addIndex('leads', ['customer_phone']);
    await queryInterface.addIndex('leads', ['status']);
    await queryInterface.addIndex('leads', ['priority']);
    await queryInterface.addIndex('leads', ['converted_to_job_id']);
    await queryInterface.addIndex('leads', ['created_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leads');
  }
};
