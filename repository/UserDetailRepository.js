const Repository = require('./Repository'),
    { userDetails } = require('../models');
class UserDetailRepository extends Repository {
    constructor() {
        super(userDetails);
    }
}
module.exports = UserDetailRepository;