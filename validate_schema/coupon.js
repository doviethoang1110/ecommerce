const { check } = require("express-validator");

const couponValidate = [
    check('name').isLength({min:2,max:20}).withMessage('Tên từ 2-20 ký tự'),
    check('code').isLength({min:5,max:20}).withMessage('Mã từ 5-20 ký tự'),
    check('type').isNumeric().withMessage('Loại không được rỗng'),
    check('detail').isFloat().withMessage('Chi tiết không được rỗng')
];
module.exports = couponValidate;