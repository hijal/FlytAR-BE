'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lead_priorities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      priority_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Indexes
    await queryInterface.addIndex('lead_priorities', ['priority_key']);
    await queryInterface.addIndex('lead_priorities', ['priority']);

    // Seed data
    await queryInterface.bulkInsert('lead_priorities', [
      {
        priority_key: uuidv4(),
        priority: 'low',
        description: 'Low priority lead'
      },
      {
        priority_key: uuidv4(),
        priority: 'medium',
        description: 'Medium priority lead'
      },
      {
        priority_key: uuidv4(),
        priority: 'high',
        description: 'High priority lead'
      },
      {
        priority_key: uuidv4(),
        priority: 'urgent',
        description: 'Urgent priority lead'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lead_priorities');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lead_priorities_priority";');
  }
};
