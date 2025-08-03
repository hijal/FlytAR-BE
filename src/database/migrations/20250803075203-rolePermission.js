'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      roleId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      permissionId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Permissions',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('RolePermissions');
  }
};
