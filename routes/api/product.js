const router = require('express').Router(),
    {upload} = require('../../middlewares'),
    { ProductController } = require('../../controllers/api');


router.get('/', ProductController.index)
    .get('/restore', ProductController.getRestore)
    .get('/:id', ProductController.show)
    .put('/edit/:id/skus', ProductController.updateSkus)
    .post('/edit',upload.single('image'), ProductController.update)
    .post('/',ProductController.store)
    .patch('/restore/:id', ProductController.restore)
    .patch('/:id', ProductController.remove);

module.exports = router;