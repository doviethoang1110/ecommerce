const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { ReviewController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_REVIEW']), ReviewController.index)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), ReviewController.update)
    .delete('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), ReviewController.remove);

module.exports = router;