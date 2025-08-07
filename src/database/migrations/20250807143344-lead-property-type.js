'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('property_types', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      property_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      type: {
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

    await queryInterface.addIndex('property_types', ['id']);
    await queryInterface.addIndex('property_types', ['property_key']);

    await queryInterface.bulkInsert('property_types', [
      {
        property_key: uuidv4(),
        type: 'apartment',
        description: 'Residential apartment property'
      },
      {
        property_key: uuidv4(),
        type: 'house',
        description: 'Standalone residential house'
      },
      {
        property_key: uuidv4(),
        type: 'office',
        description: 'Commercial office space'
      },
      {
        property_key: uuidv4(),
        type: 'other',
        description: 'Other property type'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('property_types');
  }
};
