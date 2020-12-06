'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RequestStatuses',
        [
          {name: 'Yêu cầu đã gửi'},
          {name: 'Bạn bè'},
          {name: 'Chặn'}
        ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
