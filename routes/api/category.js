const router = require('express').Router(),
    { CategoryController } = require('../../controllers/api'),
    categoryValidate = require('../../validate_schema/category');

router.get('/', CategoryController.index)
    .get('/:id', CategoryController.show)
    .post('/', categoryValidate, CategoryController.store)
    .put('/:id' ,categoryValidate, CategoryController.update);

module.exports = router;