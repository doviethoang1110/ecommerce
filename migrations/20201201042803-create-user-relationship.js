'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRelationships', {
      requesterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      addresserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      userActionId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserRelationships');
  }
};