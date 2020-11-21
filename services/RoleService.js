const { RoleRepository } = require('../repository');
const sequelize = require('sequelize');

class PermissionService {
    constructor(container) {
        this.roleRepository = container.get(RoleRepository);
    }

    async getAllRoles(id = undefined) {
        return await this.roleRepository.findRoles(id);
    }

    async getRoleSelect() {
        return await this.roleRepository.find({attributes: ['id', 'displayName']});
    }

    async findById(id) {
        return await this.roleRepository.findOne(id);
    }

    async store({name, displayName, permissions, removeItems = []}, id = undefined) {
        try {
            let role;
            if(id) {
                const obj = await this.roleRepository.update(id,{name, displayName});
                role = obj[1][0];
                if(permissions.length) await role.addPermissions(permissions);
                if(removeItems.length) await role.removePermissions(removeItems);
            }
            else {
                role = await this.roleRepository.create({name, displayName});
                await role.addPermissions(permissions);
            }
            const result = await this.getAllRoles(role.id);
            return { status: id ? 200 : 201, body: result };
        }catch (error) {
            console.log(error);
            throw { status: 400, body: error };
        }
    }

    async getRoleRestores() {
        return await this.roleRepository.find(
            { attributes: ['id','name','displayName'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});
    }

    async restore(id) {
        return await this.roleRepository.restore(id);
    }

    async remove(id) {
        try {
            let doc = await this.roleRepository.remove(id);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }
}
module.exports = PermissionService;