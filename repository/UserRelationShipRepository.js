const Repository = require('./Repository'),
    { userRelationships, sequelize} = require('../models');
const { QueryTypes } = require('sequelize');

class UserRelationShipRepository extends Repository {
    constructor() {
        super(userRelationships);
    }

    async findListFriends(id, status, key) {
        return await sequelize.query(`
            select u.id,u.email,u.name, ud.displayName, ud.image
            from UserRelationships ur inner join Users u on u.id = ur.${key === 'requesterId' ? 'addresserId' : 'requesterId'} 
            inner join UserDetails ud on ud.userId = u.id 
            where ur.${key} = ${+id} and ur.status = ${status}
        `, {type: QueryTypes.SELECT})
    }
}
module.exports = UserRelationShipRepository;