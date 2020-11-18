const Repository = require('./Repository'),
    { roles } = require('../models');
class RoleRepository extends Repository {
    constructor() {
        super(roles);
    }
}
module.exports = RoleRepository;