const Repository = require('./Repository'),
    { coupons, customers} = require('../models');
class CouponRepository extends Repository {
    constructor() {
        super(coupons);
    }

    async findCouponsByCustomerId(id, attributes = ['id','name']) {
        return await customers.findByPk(id,{
            attributes: [],
            include: [
                {
                    model:coupons,
                    as:'coupons',
                    attributes,
                    through:{ attributes:[] }
                }
            ]
        })
    }

    async useCoupon(id, code) {
        return await coupons.findOne({
            attributes: ['detail','type'],
            where: {code},
            include: [
                {
                    model:customers,
                    as:'customers',
                    attributes: [],
                    where: {id},
                    through:{ attributes:[] }
                }
            ]
        })
    }
}
module.exports = CouponRepository;