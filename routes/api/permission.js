const router = require('express').Router(),
    { PermissionController } = require('../../controllers/api');

router.get('/', PermissionController.index)
    .get('/select', PermissionController.select)
    .get('/restore', PermissionController.getRestores)
    .get('/:id', PermissionController.edit)
    .post('/', PermissionController.store)
    .put('/:id', PermissionController.update)
    .patch('/:id', PermissionController.remove)
    .patch('/restore/:id', PermissionController.restore);

module.exports = router;