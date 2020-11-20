const Repository = require('./Repository'),
    { roles, permissions } = require('../models');
class RoleRepository extends Repository {
    constructor() {
        super(roles);
    }

    async findRoles(id) {
        return id ? await roles.findByPk(id,{
            attributes: ['id','name','displayName'],
            include: [
                {
                    model:permissions,
                    as:'permissions',
                    attributes:['id','displayName'],
                    through:{ attributes:[] }
                },
            ]
        })
            : await roles.findAll({
                attributes: ['id','name','displayName'],
                include: [
                    {
                        model:permissions,
                        as:'permissions',
                        attributes:['displayName'],
                        through:{ attributes:[] }
                    },
                ]
            });
    }

    async findOne(id) {
        return await roles.findByPk(id,{
            attributes: ['id','name','displayName'],
            include: [
                {
                    model:permissions,
                    as:'permissions',
                    attributes:['id','displayName'],
                    through:{ attributes:[] }
                },
            ]
        })
    }

    async restore(id) {
        try {
            let data = await Promise.all([roles.restore({where: {id}}),
                roles.findByPk(id,{
                    attributes: ['id','name','displayName'],
                    include: [
                        {
                            model:permissions,
                            as:'permissions',
                            attributes:['displayName'],
                            through:{ attributes:[] }
                        },
                    ]
                })]);
            return data[1];
        }catch (err) {
            console.log(err);
            if(err) throw err;
        }
    }
}
module.exports = RoleRepository;