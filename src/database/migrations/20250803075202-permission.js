'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      per_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
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
    await queryInterface.addIndex('permissions', ['id']);
    await queryInterface.addIndex('permissions', ['per_key']);
    await queryInterface.addIndex('permissions', ['tag']);
    await queryInterface.addIndex('permissions', ['resource']);
    await queryInterface.addIndex('permissions', ['action']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('permissions');
  }
};
