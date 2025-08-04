'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
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
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // indexes
    await queryInterface.addIndex('Roles', ['id']);
    await queryInterface.addIndex('Roles', ['role_key']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Roles');
  }
};
