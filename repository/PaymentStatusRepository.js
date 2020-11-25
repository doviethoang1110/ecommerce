const Repository = require('./Repository'),
    { paymentStatus } = require('../models');
class PaymentStatusRepository extends Repository {
    constructor() {
        super(paymentStatus);
    }
}
module.exports = PaymentStatusRepository;