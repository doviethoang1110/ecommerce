const Repository = require('./Repository'),
    { customers } = require('../models');
class CustomerRepository extends Repository {
    constructor() {
        super(customers);
    }
}
module.exports = CustomerRepository;