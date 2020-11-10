const router = require('express').Router(),
    blogValidate = require('../../validate_schema/blog'),
    { BlogController } = require('../../controllers/api');

const { upload } = require('../../middlewares');
router.get('/', BlogController.index)
    .post('/',blogValidate,upload.single('image'), BlogController.store);

module.exports = router;