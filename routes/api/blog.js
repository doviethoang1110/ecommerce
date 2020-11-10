const router = require('express').Router(),
    blogValidate = require('../../validate_schema/blog'),
    { BlogController } = require('../../controllers/api');

const { upload } = require('../../middlewares');
router.get('/', BlogController.index)
    .get('/restore', BlogController.getRestore)
    .get('/:id', BlogController.edit)
    .post('/:id',blogValidate, upload.single('image'), BlogController.update)
    .patch('/restore/:id', BlogController.restore)
    .patch('/:id', BlogController.remove)
    .post('/',blogValidate,upload.single('image'), BlogController.store)
    .delete('/:id', BlogController.remove);

module.exports = router;