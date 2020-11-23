const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { BrandController } = require('../../controllers/api');

const { upload } = require('../../middlewares');
router.get('/', hasRolesOrPermissions(['READ_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), BrandController.index)
    .post('/' ,hasRolesOrPermissions(['CREATE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), upload.single('image'), BrandController.store)
    .post('/:id', hasRolesOrPermissions(['UPDATE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), upload.single('image'), BrandController.update)
    .get('/restore',hasRolesOrPermissions(['UPDATE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), BrandController.getRestore)
    .patch('/restore/:id', hasRolesOrPermissions(['UPDATE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), BrandController.restore)
    .patch('/:id', hasRolesOrPermissions(['DELETE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), BrandController.remove)
    .delete('/:id', hasRolesOrPermissions(['DELETE_BRAND','ADMIN_BRAND','ADMIN_MANAGER']), BrandController.remove);

module.exports = router;