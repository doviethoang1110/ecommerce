const Repository = require('./Repository'),
    { currencies } = require('../models');
class CurrencyRepository extends Repository {
    constructor() {
        super(currencies);
    }
}
module.exports = CurrencyRepository;