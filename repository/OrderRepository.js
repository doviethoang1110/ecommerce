const Repository = require('./Repository'),
    { orders, orderStatus, customers, paymentStatus, shippingStatus, orderDetails, products } = require('../models');
class OrderRepository extends Repository {
    constructor() {
        super(orders);
    }

    async getOrders() {
        return await orders.findAll({
            attributes: ['id','email','total','paymentMethod','currency','createdAt'],
            include: {
                model: orderStatus,
                as:'orderStatus',
                attributes:['name']
            }
        });
    }

    async getOrderDetail(id) {
        return await orders.findByPk(id,{
            attributes: ['id','name','phone','address','rate','shipping','shippingMethod'
                ,'coupon','subTotal','email','total','paymentMethod','currency','note'],
            include: [
                {
                    model: orderStatus,
                    as:'orderStatus',
                    attributes:['id'],
                },
                {
                    model: shippingStatus,
                    as:'shippingStatus',
                    attributes:['name'],
                },
                {
                    model: paymentStatus,
                    as:'paymentStatus',
                    attributes:['name'],
                },
                {
                    model: customers,
                    as:'customer',
                    attributes:['name','email','phone','address'],
                },
                {
                    model: orderDetails,
                    as:'orderDetails',
                    attributes:['sku','price','quantity'],
                    include: {
                        model: products,
                        as:'product',
                        attributes:['name'],
                    }
                }
            ]
        });
    }

    async updateResponse(id) {
        return await orders.findByPk(id,{
            attributes: [],
            include: [
                {
                    model: orderStatus,
                    as:'orderStatus',
                    attributes:['id','name'],
                },
                {
                    model: shippingStatus,
                    as:'shippingStatus',
                    attributes:['name'],
                },
                {
                    model: paymentStatus,
                    as:'paymentStatus',
                    attributes:['name'],
                }
            ]
        });
    }

    async findOrderForCustomer(id) {
        return await orders.findAll({
            attributes: ['id','shippingMethod','paymentMethod','currency','total'],
            where: {customerId: id},
            include: [
                {
                    model: orderDetails,
                    as:'orderDetails',
                    attributes:['sku','price','quantity'],
                    include: {
                        model: products,
                        as:'product',
                        attributes:['name'],
                    }
                },
                {
                    model: orderStatus,
                    as:'orderStatus',
                    attributes:['name'],
                },
                {
                    model: shippingStatus,
                    as:'shippingStatus',
                    attributes:['name'],
                },
            ]
        })
    }
}
module.exports = OrderRepository;