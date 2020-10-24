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
    await queryInterface.bulkInsert(
        'Categories',
        [
          {
            name: 'Quần áo',
            slug: 'quan-ao',
            parentId:0,
            status:true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, {
          name: 'Thời trang nam',
          slug: 'thoi-trang-nam',
          parentId:1,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Thời trang nữ',
          slug: 'thoi-trang-nu',
          parentId:1,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Áo nam',
          slug: 'ao-nam',
          parentId:2,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Áo nữ',
          slug: 'ao-nu',
          parentId:3,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Váy',
          slug: 'vay',
          parentId:3,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Chân váy',
          slug: 'chan-vay',
          parentId:3,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Quần âu',
          slug: 'quan-au',
          parentId:2,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Quần kaki',
          slug: 'quan-kaki',
          parentId:2,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Áo thể thao',
          slug: 'ao-the-thao',
          parentId:2,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Túi xách',
          slug: 'tui-xach',
          parentId:0,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Túi mua sắm',
          slug: 'tui-mua-sam',
          parentId:11,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Cặp sách',
          slug: 'cap-sach',
          parentId:11,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Ví',
          slug: 'vi',
          parentId:11,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Ví-nam',
          slug: 'vi-nam',
          parentId:14,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Ví nữ',
          slug: 'vi-nu',
          parentId:14,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Giày dép',
          slug: 'giay-dep',
          parentId:0,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Giày thể thao',
          slug: 'giay-the-thao',
          parentId:17,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Giày da',
          slug: 'giay-da',
          parentId:17,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dép',
          slug: 'dep',
          parentId:17,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dép tông',
          slug: 'dep-tong',
          parentId:20,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dép quai hậu',
          slug: 'dep-quai-hau',
          parentId:20,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Phụ kiện',
          slug: 'phu-kien',
          parentId:0,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Đồng hồ',
          slug: 'dong-ho',
          parentId:23,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dây chuyền',
          slug: 'day-chuyen',
          parentId:23,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Nhẫn',
          slug: 'nhan',
          parentId:23,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dây chuyền kim cương',
          slug: 'day-chuyen-kim-cuong',
          parentId:25,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Dây chuyền vàng',
          slug: 'day-chuyen-vang',
          parentId:25,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Nhẫn vàng',
          slug: 'nhan-vang',
          parentId:26,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Nhẫn bạc',
          slug: 'nhan-bac',
          parentId:26,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Đồ gia dụng',
          slug: 'do-gia-dung',
          parentId:0,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Giấy dán',
          slug: 'giay-dan',
          parentId:0,
          status:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        ],
    )
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
