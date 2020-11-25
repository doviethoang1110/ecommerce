const Repository = require('./Repository'),
    { orderStatus } = require('../models');
class OrderStatusRepository extends Repository {
    constructor() {
        super(orderStatus);
    }
}
module.exports = OrderStatusRepository;