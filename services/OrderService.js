const { OrderRepository } = require('../repository');
const sequelize = require('sequelize');

class OrderService {
    constructor(container) {
        this.orderRepository = container.get(OrderRepository);
    }

}
module.exports = OrderService;