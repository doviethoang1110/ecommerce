const { check } = require("express-validator");

const categoryValidate = [
    check('name').isLength({min:5,max:20}).withMessage('Tên từ 5-20 ký tự'),
    check('parentId').isNumeric().withMessage('Danh mục cha không được rỗng'),
    check('status').isBoolean().withMessage('Trạng thái không được rỗng')
];
module.exports = categoryValidate;