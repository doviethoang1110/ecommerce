const { CouponRepository, CustomerRepository } = require('../repository');
const sequelize = require('sequelize');

class CouponService {
    constructor(container) {
        this.couponRepository = container.get(CouponRepository);
        this.customerRepository = container.get(CustomerRepository);
    }

    async getAllCoupons() {
        return this.couponRepository.find({attributes:['id','name','code','startDate','endDate','type','detail']});
    }

    async store(coupon) {
        try {
            let doc = await this.couponRepository.create(coupon);
            let {id,name,code,startDate,endDate,type,detail} = doc;
            return { status: 201, body: {id,name,code,startDate,endDate,type,detail} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async findById(id) {
        return await this.couponRepository.findOne(id, {
            attributes: ['id','name','code','startDate','endDate','type','detail']
        });
    }

    async update(param,coupon) {
        try {
            let doc = await this.couponRepository.update(param,coupon);
            let {id,name,code,startDate,endDate,type,detail} = doc[1][0].dataValues;
            return { status: 200, body: {id,name,code,startDate,endDate,type,detail} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async remove(id,force) {
        try {
            let doc = await this.couponRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async removeCoupon(id) {
        try {
            return await this.couponRepository.findCouponsByCustomerId(id, []);
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async postRemoveCoupon(id,data) {
        try {
            const array = await this.couponRepository.findCouponsByCustomerId(id);
            const newArray = array.coupons.map(c => c.id);
            const customer = await this.customerRepository.findOne(id,{});
            await customer.removeCoupons(newArray.filter(d => !data.includes(d)));
            return await this.couponRepository.findCouponsByCustomerId(id);
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async getRestore() {
        return await this.couponRepository.find(
            { attributes: ['id','name','code','type','detail'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});
    }

    async restore(id) {
        return await this.couponRepository.restore(id,['id','name','code','startDate','endDate','type','detail']);
    }

    async getCustomers() {
        return await this.customerRepository.find(
            { attributes: ['id','name','phone','email']});
    }

    async deliver({couponId, customers}) {
        try {
            const doc = await this.couponRepository.findOne(couponId, {});
            doc.addCustomers(customers);
            return { status: 200, body: {message: 'Phát coupon thành công'} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async getCouponsForCheckout(id) {
        return await this.couponRepository.findCouponsByCustomerId(id, ['code','type','detail']);
    }

    async useCoupon(id, code) {
        return await this.couponRepository.useCoupon(id, code);
    }

}
module.exports = CouponService;