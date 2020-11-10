const { check } = require("express-validator");
const blogValidate = [
    check('title').isEmpty().withMessage('Tên từ 2-20 ký tự'),
    check('content').isEmpty().withMessage('Nội dung tối thiểu 10 ký tự')
];
module.exports = blogValidate;