const router = require('express').Router(),
    blogValidate = require('../../validate_schema/blog'),
    { hasRolesOrPermissions } = require('../../helpers'),
    { BlogController } = require('../../controllers/api');

const { upload } = require('../../middlewares');
router.get('/', BlogController.index)
    .get('/restore', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','UPDATE_BLOG']), BlogController.getRestore)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','READ_BLOG']), BlogController.edit)
    .post('/:id',hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','CREATE_BLOG']), blogValidate, upload.single('image'), BlogController.update)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','UPDATE_BLOG']), BlogController.restore)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','DELETE_BLOG']), BlogController.remove)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','CREATE_BLOG']), blogValidate,upload.single('image'), BlogController.store)
    .delete('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_BLOG','DELETE_BLOG']), BlogController.remove);

module.exports = router;