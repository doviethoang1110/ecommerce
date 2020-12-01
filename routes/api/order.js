const router = require('express').Router(),
    { hasRolesOrPermissions } = require('../../helpers'),
    { OrderController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ORDER']), OrderController.index)
    .get('/chart', OrderController.chart)
    .get('/select', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ORDER']), OrderController.orderStatus)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_ORDER']), OrderController.detail)
    .patch('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_ORDER']), OrderController.update)

module.exports = router;