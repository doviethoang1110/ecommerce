const Repository = require('./Repository'),
    { orders } = require('../models');
class OrderRepository extends Repository {
    constructor() {
        super(orders);
    }
}
module.exports = OrderRepository;