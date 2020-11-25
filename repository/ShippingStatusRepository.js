const Repository = require('./Repository'),
    { shippingStatus } = require('../models');
class ShippingStatusRepository extends Repository {
    constructor() {
        super(shippingStatus);
    }
}
module.exports = ShippingStatusRepository;