const Repository = require('./Repository'),
    { wishlists, sequelize } = require('../models'),
    { QueryTypes } = require('sequelize');
class WishListRepository extends Repository {
    constructor() {
        super(wishlists);
    }

    async findWishList(id) {
        return await
            sequelize.query("select w.id,p.name,p.slug,p.image,min(s.exportPrice) as `priceFrom`, max(s.exportPrice) as `priceTo`" +
                " from WishLists w inner join Products p on w.productId = p.id inner join Skus s on s.product_id = p.id " +
                "where w.customerId = "+id+" group by w.id", { type: QueryTypes.SELECT });
    }
}
module.exports = WishListRepository;