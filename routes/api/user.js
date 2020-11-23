const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { UserController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_USER']), UserController.index)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_USER']), UserController.edit)
    .post('/login', UserController.login)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), UserController.update)
    .post('/register', UserController.register);

module.exports = router;