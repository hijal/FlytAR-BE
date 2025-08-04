'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      per_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    // indexes
    await queryInterface.addIndex('Permissions', ['id']);
    await queryInterface.addIndex('Permissions', ['per_key']);
    await queryInterface.addIndex('Permissions', ['tag']);
    await queryInterface.addIndex('Permissions', ['resource']);
    await queryInterface.addIndex('Permissions', ['action']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Permissions');
  }
};
