const express = require('express');
const HomeController = require('../controllers/web/HomeController')
const router = express.Router();
const {isAuthenticated,isUnAuthenticated} = require('../services/PassportService');

/* GET home page. */
router.get('/', HomeController.index)
    .get('/san-pham', HomeController.products)
    .get('/blogs/:slug', HomeController.blogDetail)
    .get('/danh-sach-bai-viet', HomeController.blogs)
    .get('/blogs', HomeController.paginate)
    .get('/products', HomeController.getProducts)
    .get('/products/:slug', HomeController.productDetail)
    .post('/reviews', HomeController.postReview)
    .get('/gio-hang', HomeController.carts)
    .get('/thanh-toan',isAuthenticated, HomeController.checkout)
    .get('/trang-ca-nhan',isAuthenticated, HomeController.dashboard)
    .get('/dang-ky',isUnAuthenticated, HomeController.register)
    .post('/dang-ky', HomeController.postRegister)
    .get('/verify-email',isUnAuthenticated, HomeController.verifyEmail)
    .get('/dang-nhap',isUnAuthenticated, HomeController.login)
    .post('/dang-nhap', HomeController.postLogin)
    .delete('/dang-xuat', HomeController.logout);

module.exports = router;
