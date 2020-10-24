'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Brands',
          [
              {
                name: 'Platinum',
                slug: 'platinum',
                image: '2020-10-17T03:52:53.541Z1.png',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            {
              name: 'Prfmium',
              slug: 'prfmium',
              image: '2020-10-17T03:57:11.224Z2.png',
              status: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },{
            name: 'Elegant',
            slug: 'elegant',
            image: '2020-10-17T03:57:43.980Z3.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },{
            name: 'Philipplain',
            slug: 'philipplain',
            image: '2020-10-17T04:01:26.841Z4.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },{
            name: 'Emerald',
            slug: 'emerald',
            image: '2020-10-17T04:20:32.854Z5.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },{
            name: 'Zaraman',
            slug: 'zaraman',
            image: '2020-10-17T04:30:44.606Z6.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },{
            name: 'Diamonds',
            slug: 'diamonds',
            image: '2020-10-17T09:58:28.066Z7.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },{
            name: 'Rolex',
            slug: 'rolex',
            image: '2020-10-17T09:59:37.550Z8.png',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
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
