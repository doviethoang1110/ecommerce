const express = require('express');
const HomeController = require('../controllers/web/HomeController')
const router = express.Router();

/* GET home page. */
router.get('/', HomeController.index)
    .get('/san-pham', HomeController.products)
    .get('/blogs/:slug', HomeController.blogDetail)
    .get('/danh-sach-bai-viet', HomeController.blogs)
    .get('/blogs', HomeController.paginate)

module.exports = router;
