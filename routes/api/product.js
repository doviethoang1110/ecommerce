const router = require('express').Router(),
    { ProductController } = require('../../controllers/api');


router.get('/', ProductController.index)
    .post('/',ProductController.store);

module.exports = router;