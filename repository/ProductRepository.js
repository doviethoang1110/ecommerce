const Repository = require('./Repository'),
    { Product } = require('../models');
class ProductRepository extends Repository {
    constructor() {
        super(Product);
    }
    async getAllProducts() {
        let res = Product
            .find({}, 'name status vision priority image')
            .populate('brand', '-_id name')
            .populate('categories' , '-_id name')
            .sort({updatedAt: -1}).exec();
        return res;
    }
}
module.exports = ProductRepository;