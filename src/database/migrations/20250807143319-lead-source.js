'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lead_sources', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      lead_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.addIndex('lead_sources', ['lead_key']);
    await queryInterface.addIndex('lead_sources', ['source']);

    // Seed data
    await queryInterface.bulkInsert('lead_sources', [
      {
        lead_key: uuidv4(),
        source: 'website',
        description: 'Lead came through the website'
      },
      {
        lead_key: uuidv4(),
        source: 'referral',
        description: 'Lead referred by another customer'
      },
      {
        lead_key: uuidv4(),
        source: 'ads',
        description: 'Lead generated through ads'
      },
      {
        lead_key: uuidv4(),
        source: 'other',
        description: 'Lead came from another source'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lead_sources');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lead_sources_source";');
  }
};
