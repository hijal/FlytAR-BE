'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lead_statuses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      status: {
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
    await queryInterface.addIndex('lead_statuses', ['status_key']);
    await queryInterface.addIndex('lead_statuses', ['status']);

    // Seed data
    await queryInterface.bulkInsert('lead_statuses', [
      {
        status_key: uuidv4(),
        status: 'new',
        description: 'New lead added to the system'
      },
      {
        status_key: uuidv4(),
        status: 'contacted',
        description: 'Lead has been contacted'
      },
      {
        status_key: uuidv4(),
        status: 'in_progress',
        description: 'Lead is being nurtured'
      },
      {
        status_key: uuidv4(),
        status: 'closed',
        description: 'Lead has been closed without conversion'
      },
      {
        status_key: uuidv4(),
        status: 'converted',
        description: 'Lead has been successfully converted'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lead_statuses');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lead_statuses_status";');
  }
};
