const { OrderStatusRepository } = require('../repository');

class OrderStatusService {

    constructor(container) {
        this.orderStatusRepository = container.get(OrderStatusRepository);
    }

    async getAll() {
        return await this.orderStatusRepository.find({attributes: ['id','name']});
    }

}
module.exports = OrderStatusService;