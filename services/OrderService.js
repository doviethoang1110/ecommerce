const { OrderRepository, OrderDetailRepository, CustomerRepository, CouponRepository } = require('../repository');
const sequelize = require('sequelize');
const { sendMail } = require('../services/EmailService');

class OrderService {

    constructor(container) {
        this.orderRepository = container.get(OrderRepository);
        this.orderDetailRepository = container.get(OrderDetailRepository);
        this.customerRepository = container.get(CustomerRepository);
        this.couponRepository = container.get(CouponRepository);
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

}
module.exports = OrderService;