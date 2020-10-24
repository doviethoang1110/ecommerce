const { check } = require("express-validator");
const categoryValidate = [
    check('name').isLength({min:2,max:20}).withMessage('Tên từ 2-20 ký tự'),
    check('status').isBoolean().withMessage('Trạng thái không được rỗng')
];
module.exports = categoryValidate;