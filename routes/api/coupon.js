const router = require('express').Router(),
    { CouponController } = require('../../controllers/api'),
    couponValidate = require('../../validate_schema/coupon'),
    { hasRolesOrPermissions } = require('../../helpers');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER']), CouponController.index)
    .get('/restore',hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_COUPON']), CouponController.getRestore)
    .get('/customers', hasRolesOrPermissions(['ADMIN_MANAGER']),CouponController.deliver)
    .post('/deliver', hasRolesOrPermissions(['ADMIN_MANAGER']), CouponController.postDeliver)
    .get('/customers/:id/remove', hasRolesOrPermissions(['ADMIN_MANAGER']), CouponController.removeCoupon)
    .put('/customers/:id/remove', hasRolesOrPermissions(['ADMIN_MANAGER']), CouponController.postRemoveCoupon)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), CouponController.edit)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER','CREATE_COUPON']), couponValidate, CouponController.store)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_COUPON']), CouponController.update)
    .patch('/restore/:id', hasRolesOrPermissions(['ADMIN_MANAGER','UPDATE_COUPON']), CouponController.restore)
    .patch('/:id', hasRolesOrPermissions('ADMIN_MANAGER','DELETE_COUPON'), CouponController.remove)

module.exports = router;