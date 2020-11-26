const { OrderService, OrderStatusService } = require('../../container');

module.exports.index = async (req, res) => {
    let list = await OrderService.getOrders();
    res.api(200, list);
}

module.exports.detail = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('Không tồn tại id');
        const order = await OrderService.getOrderDetail(id);
        res.api(200, order);
    }catch (error) {
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.orderStatus = async (req, res) => {
    const list = await OrderStatusService.getAll();
    res.api(200, list);
}

module.exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('Không tồn tại id');
        const order = await OrderService.update(id, req.body);
        res.api(order.status, order.body);
    }catch (error) {
        console.log(error.body.message)
        error = {status:400,body:error.body.message};
        next(error)
    }
}