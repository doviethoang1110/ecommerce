const router = require('express').Router(),
    { CategoryController } = require('../../controllers/api'),
    categoryValidate = require('../../validate_schema/category');

router.get('/', CategoryController.index)
    .get('/restore', CategoryController.getRestore)
    .patch('/restore/:id', CategoryController.restore)
    .get('/:id', CategoryController.show)
    .post('/', categoryValidate, CategoryController.store)
    .patch('/:id', CategoryController.remove)
    .put('/:id' ,categoryValidate, CategoryController.update);

module.exports = router;