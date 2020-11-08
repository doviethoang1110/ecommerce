const Repository = require('./Repository'),
    { skus } = require('../models');
class SkuRepository extends Repository {
    constructor() {
        super(skus);
    }
}
module.exports = SkuRepository;