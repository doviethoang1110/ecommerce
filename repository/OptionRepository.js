const Repository = require('./Repository'),
    { options } = require('../models');
class OptionRepository extends Repository {
    constructor() {
        super(options);
    }
}
module.exports = OptionRepository;