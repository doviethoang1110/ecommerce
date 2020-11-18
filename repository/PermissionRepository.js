const Repository = require('./Repository'),
    { permissions } = require('../models');
class PermissionRepository extends Repository {
    constructor() {
        super(permissions);
    }
}
module.exports = PermissionRepository;