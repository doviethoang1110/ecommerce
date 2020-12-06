const Repository = require('./Repository'),
    { userRelationships, sequelize, Sequelize} = require('../models');
const { QueryTypes } = require('sequelize');

class UserRelationShipRepository extends Repository {
    constructor() {
        super(userRelationships);
    }

    async friendRequestReceived(id) {
        return await sequelize.query(`
            select u.id,u.email,u.name, ud.displayName, ud.image
            from UserRelationships ur inner join Users u on u.id = ur.requesterId 
            inner join UserDetails ud on ud.userId = u.id 
            where ur.addresserId = ${+id} and ur.status = 1
        `, {type: QueryTypes.SELECT})
    }

    async findListFriends(id) {
        return await sequelize.query(`
            select u.id,u.name,u.email,ud.displayName, ud.image FROM Users u 
            inner JOIN UserDetails ud on ud.userId = u.id
            where u.id in (
            select (CASE ur.addresserId WHEN ${+id} THEN ur.requesterId ELSE ur.addresserId END )
            from UserRelationships ur
            WHERE (ur.requesterId = ${+id} or ur.addresserId = ${+id})
            and ur.status = 2)
        `, {type: QueryTypes.SELECT});
    }

    async update({requesterId, addresserId, data}) {
        try {
            const document = await userRelationships.update(data,{where:{requesterId, addresserId},individualHooks:true});
            return document;
        }catch (err) {
            console.log(err)
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }

    async remove({requesterId, addresserId}) {
        return await userRelationships.destroy({where: {requesterId, addresserId},individualHooks:true});
    }

    async removeFriendShip({requesterId, addresserId}) {
        console.log(requesterId, addresserId)
        return await userRelationships.destroy({
            where: {
                [Sequelize.Op.or]: [
                    {requesterId: addresserId, addresserId:requesterId},
                    {requesterId, addresserId}
                ]
            },
            individualHooks: true
        });
    }
}
module.exports = UserRelationShipRepository;