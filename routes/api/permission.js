const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { PermissionController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_PERMISSION']), PermissionController.index)
    .get('/select', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ROLE']), PermissionController.select)
    .get('/restore', hasRolesOrPermissions(['ADMIN_MANAGER']), PermissionController.getRestores)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_PERMISSION']), PermissionController.edit)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER']), PermissionController.store)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), PermissionController.update)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), PermissionController.remove)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), PermissionController.restore);

module.exports = router;