const express = require('express');
const HomeController = require('../controllers/web/HomeController')
const router = express.Router();
const {isAuthenticated,isUnAuthenticated} = require('../services/PassportService');

/* GET home page. */
router.get('/', HomeController.index)
    .get('/san-pham', HomeController.products)
    .get('/tim-kiem', HomeController.search)
    .get('/customers/:id/orders', HomeController.getOrders)
    .get('/products/index', HomeController.productIndex)
    .get('/filter', HomeController.filterProducts)
    .get('/blogs/:slug', HomeController.blogDetail)
    .get('/danh-sach-bai-viet', HomeController.blogs)
    .get('/blogs', HomeController.paginate)
    .get('/products/:slug', HomeController.productDetail)
    .post('/reviews', HomeController.postReview)
    .get('/reviews/:productId', HomeController.reviews)
    .get('/gio-hang', HomeController.carts)
    .get('/thanh-toan',isAuthenticated, HomeController.checkout)
    .post('/thanh-toan', isAuthenticated, HomeController.postCheckout)
    .get('/trang-ca-nhan',isAuthenticated, HomeController.dashboard)
    .post('/wishLists', HomeController.postWishList)
    .delete('/wishLists/:id', HomeController.removeWishList)
    .get('/customers/:id/wishLists', HomeController.wishLists)
    .get('/dang-ky',isUnAuthenticated, HomeController.register)
    .post('/dang-ky', HomeController.postRegister)
    .get('/verify-email',isUnAuthenticated, HomeController.verifyEmail)
    .get('/dang-nhap',isUnAuthenticated, HomeController.login)
    .post('/dang-nhap', HomeController.postLogin)
    .delete('/dang-xuat', HomeController.logout)
    .get('/coupons/customers/:id', HomeController.coupons)
    .get('/coupons/:code/customers/:id', HomeController.useCoupon);

module.exports = router;
