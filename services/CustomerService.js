const { CustomerRepository, TokenRepository } = require('../repository');
const { sendMail } = require('../services/EmailService');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { customers } = require('../models');
class CustomerService {
    constructor(container) {
        this.customerRepository = container.get(CustomerRepository);
        this.tokenRepository = container.get(TokenRepository);
    }

    async findCustomerByEmail(email) {
        return await this.customerRepository.findOneByAttribute({
            attributes: ['id','name','email','address','phone','password'],
            where: {email}
        })
    }

    async store(customer) {
        try {
            customer.password = await bcrypt.hash(customer.password, 10);
            const { id } = await this.customerRepository.create(customer);
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            const data = {
                token: await bcrypt.hash(uuid(),10),
                customerId: id,
                expireDate
            }
            await this.tokenRepository.create(data);
            const html = this.mailVerify(data.token)
            await sendMail({to: customer.email, html });
            return { status: 201, body: {icon:'success', message: 'Đăng ký thành công'} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async verifyEmail(token) {
        try {
            let { expireDate, customer } = await this.tokenRepository.findOneByAttribute({attributes: ['expireDate'], where: {token}, include: [{
                    model: customers,
                    as:'customer',
                    attributes:['id', 'enabled']
                }]});
            if(!expireDate) return  {error: 'Token không tồn tại'};
            if(new Date() > expireDate) return  {error: 'Token này đã hết hạn'};
            customer.enabled = true;
            await this.customerRepository.update(customer.id, {id: customer.id,enabled: customer.enabled});
            return {success: 'Kích hoạt tài khoản thành công'};
        }catch (error) {
            console.log(error)
            throw error;
        }
    }
    mailVerify = (param) => {
        return "<h3>Vui lòng bấm vào đây để xác thực email</h3><br>" +
            "<a href='http://localhost:4200/verify-email?token="+param+"' style='background-color: #008CBA;\n" +
            "border: none;\n" +
            "  color: white;\n" +
            "  padding: 20px 100px;\n" +
            "  text-align: center;\n" +
            "  text-decoration: none;\n" +
            "  display: inline-block;\n" +
            "  font-size: 16px;\n" +
            "  margin: 4px 2px;\n" +
            "  cursor: pointer;'>Verify your email</a>"
    };

}
module.exports = CustomerService;