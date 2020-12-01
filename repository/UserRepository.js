const Repository = require('./Repository'),
    { users,roles, permissions, userDetails } = require('../models');
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
}
module.exports = UserRepository;