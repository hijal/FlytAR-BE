'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_statuses', {
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
    await queryInterface.addIndex('job_statuses', ['status_key']);
    await queryInterface.addIndex('job_statuses', ['status']);

    // Seed data
    await queryInterface.bulkInsert('job_statuses', [
      {
        status_key: uuidv4(),
        status: 'scheduled',
        description: 'Job is scheduled to begin'
      },
      {
        status_key: uuidv4(),
        status: 'in_progress',
        description: 'Job is currently in progress'
      },
      {
        status_key: uuidv4(),
        status: 'completed',
        description: 'Job has been completed'
      },
      {
        status_key: uuidv4(),
        status: 'cancelled',
        description: 'Job was cancelled before completion'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('job_statuses');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_job_statuses_status";');
  }
};
