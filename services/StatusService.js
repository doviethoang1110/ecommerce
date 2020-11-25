const { RoleRepository } = require('../repository');
const sequelize = require('sequelize');

class StatusService {
    constructor(container) {
        this.statusRepository = container.get(RoleRepository);
    }

}
module.exports = StatusService;