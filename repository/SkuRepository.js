const Repository = require('./Repository'),
    { Sku } = require('../models');
class SkuRepository extends Repository {
    constructor() {
        super(Sku);
    }
    async createMany(array) {
        try {
            return Sku.insertMany(array);
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}
module.exports = SkuRepository;