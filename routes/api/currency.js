const router = require('express').Router(),
    currencyValidate = require('../../validate_schema/currency'),
    { CurrencyController } = require('../../controllers/api');

router.get('/', CurrencyController.index)
    .get('/:id', CurrencyController.edit)
    .post('/', currencyValidate, CurrencyController.store)
    .put('/:id',currencyValidate, CurrencyController.update)
    .delete('/:id', CurrencyController.remove);

module.exports = router;