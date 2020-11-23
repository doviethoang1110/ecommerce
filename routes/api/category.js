const router = require('express').Router(),
    { CategoryController } = require('../../controllers/api'),
    { hasRolesOrPermissions } = require('../../helpers'),
    categoryValidate = require('../../validate_schema/category');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','READ_CATEGORY']), CategoryController.index)
    .get('/restore', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','UPDATE_CATEGORY']), CategoryController.getRestore)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','UPDATE_CATEGORY']), CategoryController.restore)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','READ_CATEGORY']), CategoryController.show)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','CREATE_CATEGORY']), categoryValidate, CategoryController.store)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','REMOVE_CATEGORY']), CategoryController.remove)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','ADMIN_CATEGORY','UPDATE_CATEGORY']), categoryValidate, CategoryController.update);

module.exports = router;