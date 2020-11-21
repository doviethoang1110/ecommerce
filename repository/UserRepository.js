const Repository = require('./Repository'),
    { users,roles } = require('../models');
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
}
module.exports = UserRepository;