'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.ENUM('Super Admin', 'Company Admin', 'Surveyor', 'Mover', 'Customer'),
        allowNull: false,
        unique: true
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

    // indexes
    await queryInterface.addIndex('roles', ['id']);
    await queryInterface.addIndex('roles', ['role_key']);

    await queryInterface.bulkInsert('roles', [
      {
        role_key: uuidv4(), // Generate UUID using uuid package
        name: 'Super Admin',
        description: 'Has full access to the system'
      },
      {
        role_key: uuidv4(),
        name: 'Company Admin',
        description: 'Administers company-specific resources'
      },
      {
        role_key: uuidv4(),
        name: 'Surveyor',
        description: 'Responsible for surveys'
      },
      {
        role_key: uuidv4(),
        name: 'Mover',
        description: 'Handles moving operations'
      },
      {
        role_key: uuidv4(),
        name: 'Customer',
        description: 'End user of the system'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  }
};
