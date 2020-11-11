const { check } = require("express-validator");
const currencyValidate = [
    check('name').isLength({min:2,max:20}).withMessage('Tên không được rỗng'),
    check('code').isLength({min:2,max:20}).withMessage('Ký hiệu không được rỗng'),
    check('rate').isFloat().withMessage('Tỷ lệ không được rỗng')
];
module.exports = currencyValidate;