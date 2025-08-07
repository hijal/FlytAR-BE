'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('users', {
      fields: ['company_id'],
      type: 'foreign key',
      name: 'fk_users_company',
      references: { table: 'companies', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('users', 'fk_users_company');
  }
};
