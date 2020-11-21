const { UserRepository } = require('../repository');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {
    constructor(container) {
        this.userRepository = container.get(UserRepository);
    }

    async getAllUsers(id = undefined) {
        return await this.userRepository.findUsers(id);
    }
    
    async store(user) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            await this.userRepository.create(user);
            return { status: 201, body: {icon:'success', message: 'Đăng ký thành công'} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async findById(id) {
        return await this.userRepository.findById(id);
    }

    async update({addItems = [], removeItems = []}, id = undefined) {
        try {
            let user;
            if(id) {
                user = await this.userRepository.findOne(id, {});
                if(addItems.length) await user.addRoles(addItems);
                if(removeItems.length) await user.removeRoles(removeItems);
            }
            const result = await this.getAllUsers(user.id);
            return { status: id ? 200 : 201, body: result };
        }catch (error) {
            console.log(error);
            throw { status: 400, body: error };
        }
    }



}
module.exports = UserService;