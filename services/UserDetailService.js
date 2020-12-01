const { UserDetailRepository } = require('../repository');
const sequelize = require('sequelize');

class UserDetailService {
    constructor(container) {
        this.userDetailRepository = container.get(UserDetailRepository);
    }
}
module.exports = UserDetailService;