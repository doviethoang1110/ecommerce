const Repository = require('./Repository'),
    { categories,products } = require('../models');
class CategoryRepository extends Repository {
    constructor() {
        super(categories);
    }
}
module.exports = CategoryRepository;