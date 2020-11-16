const { CustomerRepository } = require('../repository');
const bcrypt = require('bcrypt');

class CustomerService {
    constructor(container) {
        this.customerRepository = container.get(CustomerRepository);
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
            await this.customerRepository.create(customer);
            return { status: 201, body: {icon:'success', message: 'Đăng ký thành công'} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

}
module.exports = CustomerService;