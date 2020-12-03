const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { upload } = require('../../middlewares'),
    { UserController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_USER']), UserController.index)
    .get('/:id/listFriends', UserController.listFriends)
    .get('/:id/contacts', UserController.userDetails)
    .get('/:id/friendRequestReceived', UserController.friendRequestReceived)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_USER']), UserController.edit)
    .post('/login', UserController.login)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), UserController.update)
    .post('/register', UserController.register)
    .post('/:id', upload.single('image'), UserController.updateUser)

module.exports = router;