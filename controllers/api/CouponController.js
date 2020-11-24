const { CouponService } = require('../../container');
const { validateRequest } = require('../../middlewares');

module.exports.index = async (req, res) => {
    const list = await CouponService.getAllCoupons();
    res.api(200, list);
}

module.exports.deliver = async (req, res) => {
    const list = await CouponService.getCustomers();
    res.api(200, list);
}

module.exports.postDeliver = async (req, res, next) => {
    try{
        const coupon = await CouponService.deliver(req.body);
        res.api(coupon.status, coupon.body);
    }catch(err){
        next(err);
    }
}

module.exports.store = async function(req, res, next) {
    try{
        validateRequest(req);
        const coupon = await CouponService.store(req.body);
        res.api(coupon.status, coupon.body);
    }catch(err){
        next(err);
    }
}

module.exports.edit = async function (req ,res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CouponService.findById(id);
        res.api(200, doc);
    }catch (error) {
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.update = async function (req, res, next) {
    try {
        validateRequest(req);
        let param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let coupon = await CouponService.update(param,req.body);
        res.api(coupon.status, coupon.body);
    } catch (err) {
        next(err);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = req.method === 'PATCH'
            ? await CouponService.remove(id)
            : await CouponService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.removeCoupon = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CouponService.removeCoupon(id);
        res.api(200, doc.coupons);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.postRemoveCoupon = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CouponService.postRemoveCoupon(id, req.body);
        res.api(200, doc.coupons);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}


module.exports.getRestore = async function (req, res, next) {
    let list = await CouponService.getRestore();
    res.api(200, list);
}

module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CouponService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}
