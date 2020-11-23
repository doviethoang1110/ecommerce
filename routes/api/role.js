const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { RoleController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ROLE']), RoleController.index)
    .get('/select', hasRolesOrPermissions(['ADMIN_MANAGER','READ_USER']), RoleController.select)
    .get('/restore', hasRolesOrPermissions(['ADMIN_MANAGER']), RoleController.getRestores)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ROLE']), RoleController.edit)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER','CREATE_ROLE']), RoleController.store)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_ROLE']), RoleController.update)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','DELETE_ROLE']), RoleController.remove)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_ROLE']), RoleController.restore);

module.exports = router;