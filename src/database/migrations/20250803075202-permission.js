'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Format: resource:action (e.g., account:get, transaction:create)'
      },
      resource: {
        type: Sequelize.STRING,
        allowNull: false
      },
      action: {
        type: Sequelize.ENUM('get', 'list', 'create', 'update', 'delete'),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Permissions');
  }
};
