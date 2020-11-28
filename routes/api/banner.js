const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { BannerController } = require('../../controllers/api');

const { upload } = require('../../middlewares');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_BANNER']), BannerController.index)
    .get('/restore', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_BANNER']), BannerController.restore)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_BANNER']), BannerController.edit)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER','CREATE_BANNER']), upload.single('image'), BannerController.store)
    .post('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_BANNER']), upload.single('image'), BannerController.update)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_BANNER']), BannerController.postRestore)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','DELETE_BANNER']), BannerController.remove)
    .delete('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','DELETE_BANNER']), BannerController.remove)

module.exports = router;