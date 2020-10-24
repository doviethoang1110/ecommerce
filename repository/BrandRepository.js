const Repository = require('./Repository'),
    { brands } = require('../models');
class BrandRepository extends Repository {
    constructor() {
        super(brands);
    }
}
module.exports = BrandRepository;