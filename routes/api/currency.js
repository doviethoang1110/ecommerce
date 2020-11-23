const router = require('express').Router(),
    currencyValidate = require('../../validate_schema/currency'),
    { hasRolesOrPermissions } = require('../../helpers'),
    { CurrencyController } = require('../../controllers/api');

router.get('/', hasRolesOrPermissions(['ADMIN_MANAGER','READ_CURRENCY']), CurrencyController.index)
    .get('/:id', hasRolesOrPermissions(['ADMIN_MANAGER','READ_CURRENCY']), CurrencyController.edit)
    .post('/', hasRolesOrPermissions(['ADMIN_MANAGER']), currencyValidate, CurrencyController.store)
    .put('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), currencyValidate, CurrencyController.update)
    .delete('/:id', hasRolesOrPermissions(['ADMIN_MANAGER']), CurrencyController.remove);

module.exports = router;