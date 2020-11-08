const router = require('express').Router(),
    { BrandController } = require('../../controllers/api');

const { upload } = require('../../middlewares');
router.get('/', BrandController.index)
    .post('/' ,upload.single('image'), BrandController.store)
    .post('/:id',upload.single('image'), BrandController.update)
    .get('/restore', BrandController.getRestore)
    .patch('/restore/:id', BrandController.restore)
    .patch('/:id', BrandController.remove)
    .delete('/:id', BrandController.remove);

module.exports = router;