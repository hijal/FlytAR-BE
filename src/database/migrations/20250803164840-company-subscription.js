'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subscription_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(100),
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
    await queryInterface.addIndex('subscriptions', ['id']);
    await queryInterface.addIndex('subscriptions', ['subscription_key']);

    await queryInterface.bulkInsert('subscriptions', [
      {
        subscription_key: uuidv4(),
        name: 'Basic',
        slug: 'basic',
        description: 'Basic subscription plan'
      },
      {
        subscription_key: uuidv4(),
        name: 'Premium',
        slug: 'premium',
        description: 'Premium subscription plan'
      },
      {
        subscription_key: uuidv4(),
        name: 'Enterprise',
        slug: 'enterprise',
        description: 'Enterprise subscription plan'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscriptions');
  }
};
