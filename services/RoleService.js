const { RoleRepository } = require('../repository');
const sequelize = require('sequelize');

class RoleService {
    constructor(container) {
        this.roleRepository = container.get(RoleRepository);
    }


}
module.exports = RoleService;