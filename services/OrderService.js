const { OrderRepository,
    OrderDetailRepository,
    CustomerRepository,
    CouponRepository,
    ProductRepository
} = require('../repository');
const sequelize = require('sequelize');
const { sendMail } = require('../services/EmailService');

class OrderService {

    constructor(container) {
        this.orderRepository = container.get(OrderRepository);
        this.orderDetailRepository = container.get(OrderDetailRepository);
        this.customerRepository = container.get(CustomerRepository);
        this.couponRepository = container.get(CouponRepository);
        this.productRepository = container.get(ProductRepository);
    }

    async checkout(
        {
            customerId, name, email, phone, address, currency, rate, note, subTotal,
            total, shipping, coupon, shippingMethod, paymentMethod, orderDetails
        }) {
        try {
            if(+rate !== 1) {
                total = Math.round(total/rate/1000);
                subTotal = Math.round(subTotal/rate/1000);
                shipping = Math.round(shipping/rate/1000);
            }
            if(coupon) {
                const [customer, key] = await Promise.all([
                    this.customerRepository.findOne(customerId, {}),
                    this.couponRepository.findOneByAttribute({where: {code: coupon}})
                ]);
                customer.removeCoupons(key);
            }
            const order = await this.orderRepository.create({
                name, customerId, email, phone, address, currency, rate, note, subTotal,
                total, shipping, coupon, shippingMethod, paymentMethod, paymentStatusId: 1,
                orderStatusId: 1, shippingStatusId: 1
            });
            let html = `<h2 style="color: orange">Mã đơn hàng: #${order.id}</h2>
                        <table style='width:800px' border='1' cellspacing='1'>
                            <thead>
                                <th>Số thứ tự</th>
                                <th>Tên sản phẩm</th>
                                <th>Mã kho</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Thành tiền</th>
                            </thead>
                            <tbody>

                        `;
            const array = orderDetails.map((o,index) => {
                html += `
                    <tr>
                        <td>${index+1}</td>
                        <td>${o.productName}</td>
                        <td>${o.sku}</td>
                        <td>${o.quantity}</td>
                        <td>${Math.round(o.price) + " " + currency}</td>
                        <td>${Math.round(o.price * o.quantity) + " " + currency}</td>
                    </tr>
                `;
                return {...o,orderId: order.id,price: Math.round(o.price)};
            });
            html += `
                <tr>
                    <td colspan='5'>Tạm tính</td>
                    <td>${Math.round(subTotal) + " " + currency}</td>
                </tr>
                <tr>
                    <td colspan='5'>Phí vận chuyển</td>
                    <td>${Math.round(shipping) + " " + currency}</td>
                </tr>
                <tr>
                    <td colspan='5'>Mã giảm giá</td>
                    <td>${coupon}</td>
                </tr>
                <tr>
                    <td colspan='5'>Tổng tiền</td>
                    <td>${Math.round(total) + " " + currency}</td>
                </tr>
                </tbody>
                </table>
            `;
            await this.orderDetailRepository.bulkCreate(array);
            await sendMail({to: email, html, subject: 'Xác thực đơn hàng' });
            return {status: 201, body: "Đặt hàng thành công"};
        }catch (error) {
            console.log(error)
            throw {status: 500, body: error};
        }
    }

    async getOrders() {
        return await this.orderRepository.getOrders();
    }

    async getOrderDetail(id) {
        return await this.orderRepository.getOrderDetail(id);
    }

    async update(id, data) {
        try {
            const { orderStatusId } = await this.orderRepository.findOne(id,{});
            const statusId = orderStatusId;
            if(+(data.orderStatusId) <= +statusId) throw new Error('Không thể cập nhật về trạng thái cũ hơn');
            else {
                if(+statusId === 3) throw new Error('Đơn hàng đã hoàn tất không thể hủy');
                const result = await this.orderRepository.update(id, {...data,shippingStatusId: data.orderStatusId, paymentStatusId: data.orderStatusId});
                const { orderStatusId } = result[1][0].dataValues;
                const res = await this.orderRepository.updateResponse(id);
                console.log(res);
                return {status : 200, body: res};
            }
        }catch (error) {
            throw {status : 400, body: error};
        }
    }

    async getOrdersForCustomer(id) {
        try {
            return await this.orderRepository.findOrderForCustomer(id);
        }catch (error) {
            throw {status : 400, body: error};
        }
    }

    async chart() {
        const customers = await this.customerRepository.count();
        const orders = await this.orderRepository.count({where : {orderStatusId: 1}});
        const products = await this.productRepository.count();
        const res = await this.orderRepository.find({
            attributes: [
                [sequelize.literal(`SUM(CASE rate WHEN 1 THEN total ELSE total * rate * 1000 END)`), 'totalAmount']
            ]
        });
        const chart = await this.orderRepository.find({
            attributes: [
                [sequelize.literal(`SUM(CASE rate WHEN 1 THEN total ELSE total * rate * 1000 END)`), 'totalAmount'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrder'],
                [sequelize.fn('date_format', sequelize.col('createdAt'),"%m"), 'month'],
            ],
            where: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), new Date().getFullYear()),
            group: 'month'
        });
        const totalAmountEachMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
        const totalOrderEachMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
        chart.forEach(r => {
            totalAmountEachMonth[(+r.dataValues.month - 1)] = r.dataValues.totalAmount;
            totalOrderEachMonth[(+r.dataValues.month - 1)] = r.dataValues.totalOrder;
        });
        return {totalOrderEachMonth, totalAmountEachMonth, totalAmount: res[0].dataValues.totalAmount, orders, customers, products};
    }

}
module.exports = OrderService;