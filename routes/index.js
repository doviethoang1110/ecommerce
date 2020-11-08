const express = require('express');
const HomeController = require('../controllers/web/HomeController')
const router = express.Router();

/* GET home page. */
router.get('/', HomeController.index);

router.get('/san-pham', HomeController.products)

module.exports = router;
