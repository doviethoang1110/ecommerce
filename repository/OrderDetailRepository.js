const Repository = require('./Repository'),
    { orderDetails } = require('../models');
class OrderDetailRepository extends Repository {
    constructor() {
        super(orderDetails);
    }
}
module.exports = OrderDetailRepository;