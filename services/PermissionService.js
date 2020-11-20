const { PermissionRepository } = require('../repository');
const sequelize = require('sequelize');

class PermissionService {
    constructor(container) {
        this.permissionRepository = container.get(PermissionRepository);
    }

    async getAllPermissions() {
        return await this.permissionRepository.find({
            attributes: ['id','name','displayName','createdAt']
        })
    }

    async getPermissionSelect() {
        return await this.permissionRepository.find({
            attributes: ['id','displayName']
        })
    }

    async findById(id) {
        return await this.permissionRepository.findOne(id,{attributes:['id','name','displayName']});
    }

    async store(data) {
        try {
            let result = await this.permissionRepository.bulkCreate(data);
            result = result.map(r => ({id: r.id,name:r.name,displayName:r.displayName,createdAt:r.createdAt}));
            return { status: 201, body: result };
        }catch (error) {
            console.log(error);
            throw { status: 400, body: error };
        }
    }

    async update(param,permission) {
        try {
            let doc = await this.permissionRepository.update(param,permission);
            let {id,name,displayName,createdAt} = doc[1][0].dataValues;
            return { status: 200, body: {id,name,displayName,createdAt} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async getPermissionRestores() {
        return await this.permissionRepository.find(
            { attributes: ['id','name','displayName'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});
    }

    async restore(id) {
        return await this.permissionRepository.restore(id,['id','name','displayName','createdAt']);
    }

    async remove(id) {
        try {
            let doc = await this.permissionRepository.remove(id);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }
}
module.exports = PermissionService;