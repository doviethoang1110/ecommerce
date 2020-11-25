const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { OrderController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ORDER']), OrderController.index)

module.exports = router;