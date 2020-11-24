const Repository = require('./Repository'),
    { coupons, customers} = require('../models');
class CouponRepository extends Repository {
    constructor() {
        super(coupons);
    }

    async findCouponsByCustomerId(id) {
        return await customers.findByPk(id,{
            attributes: [],
            include: [
                {
                    model:coupons,
                    as:'coupons',
                    attributes:['id','name'],
                    through:{ attributes:[] }
                }
            ]
        })
    }
}
module.exports = CouponRepository;