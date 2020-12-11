const Repository = require('./Repository'),
    { users,roles, permissions, userDetails, conversations, Sequelize, messages, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class UserRepository extends Repository {
    constructor() {
        super(users);
    }

    async findUsers(id) {
        return id ? await users.findByPk(id,{
                attributes: ['id','name','email'],
                include: [
                    {
                        model:roles,
                        as:'roles',
                        attributes:['id','displayName'],
                        through:{ attributes:[] }
                    },
                ]
            })
            : await users.findAll({
                attributes: ['id','name','email'],
                include: [
                    {
                        model:roles,
                        as:'roles',
                        attributes:['displayName'],
                        through:{ attributes:[] }
                    },
                ]
            });
    }

    async findById(id) {
        return await users.findByPk(id,{
            attributes: [],
            include: [
                {
                    model:roles,
                    as:'roles',
                    attributes:['id','displayName'],
                    through:{ attributes:[] }
                },
            ]
        })
    }

    async findOneByAttribute(email) {
        return await users.findOne({
            attributes: ['id', 'name', 'email', 'password'],
            include: [
                {
                    model: userDetails,
                    as: 'userDetail',
                    attributes: ['displayName','job','skill','image','education','location','notes']
                },
                {
                    model: roles,
                    as: 'roles',
                    attributes: ['name'],
                    through: {attributes:[]},
                    include: [
                        {
                            model: permissions,
                            as: 'permissions',
                            attributes: ['name'],
                            through: {attributes:[]},
                        }
                    ]
                }
            ],
            where: {email}
        })
    }

    async findUserDetails(id) {
        return await users.findAll({
            attributes: ['id','name','email'],
            include: {
                model: userDetails,
                as: 'userDetail',
                attributes: ['displayName','job','skill','image','location']
            },
            where: {id: {[Sequelize.Op.not]: +id}},
        });
    }

    async profile(loginId, id) {
        return await sequelize.query(`
            select u.id,u.email,u.name,ud.displayName,ud.skill,ud.image,ud.education,ud.location,ud.job,ud.notes,
            (select ur.status from UserRelationships ur where (
            ur.addresserId = ${loginId} and ur.requesterId = ${id}) 
            or (ur.requesterId = ${loginId} and ur.addresserId = ${id})) as 'status',
            (select ur.userActionId from UserRelationships ur where (
            ur.addresserId = ${loginId} and ur.requesterId = ${id}) 
            or (ur.requesterId = ${loginId} and ur.addresserId = ${id})) as 'userActionId'
            from Users u INNER JOIN UserDetails ud on ud.userId = u.id WHERE u.id = ${id}
        `, {type: QueryTypes.SELECT});
    }
// (ur.requesterId = ${id} or ur.addresserId = ${id}) and (ur.addresserId = ${id} or ur.requesterId = ${id})
    async findUserStatus(id) {
        return await sequelize.query(`
            select ur.addresserId, ur.requesterId, ur.status, ur.userActionId
            from UserRelationships ur
            where ur.requesterId != ${id}
        `, {type: QueryTypes.SELECT})
    }

}
module.exports = UserRepository;