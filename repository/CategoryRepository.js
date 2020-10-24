const Repository = require('./Repository'),
    { categories,products } = require('../models');
class CategoryRepository extends Repository {
    constructor() {
        super(categories);
    }
    async findAll() {
        let list = await categories.findAll({
            attributes:['id','name'],
            include:'products'
        })
        return list;
    }
}
module.exports = CategoryRepository;