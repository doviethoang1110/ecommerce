const router = require('express').Router(),
    { RoleController } = require('../../controllers/api');

router.get('/', RoleController.index)
    .get('/select', RoleController.select)
    .get('/restore', RoleController.getRestores)
    .get('/:id', RoleController.edit)
    .post('/', RoleController.store)
    .put('/:id', RoleController.update)
    .patch('/:id', RoleController.remove)
    .patch('/restore/:id', RoleController.restore);

module.exports = router;