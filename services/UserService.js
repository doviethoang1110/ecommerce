const { UserRepository, UserDetailRepository, RefreshTokenRepository } = require('../repository');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {
    constructor(container) {
        this.userRepository = container.get(UserRepository);
        this.userDetailRepository = container.get(UserDetailRepository);
        this.refreshTokenRepository = container.get(RefreshTokenRepository);
    }

    async getAllUsers(id = undefined) {
        return await this.userRepository.findUsers(id);
    }

    async storeRefreshToken(data) {
        const refreshToken = await this.refreshTokenRepository.findOneByAttribute({where: {userId: data.userId}})
        await refreshToken ? this.refreshTokenRepository.update(refreshToken.id,data) : this.refreshTokenRepository.create(data);
    }
    
    async store(user) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            const userCreated = await this.userRepository.create(user);
            await this.userDetailRepository.create({userId: userCreated.id});
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

    async findUserByEmail(email) {
        return await this.userRepository.findOneByAttribute(email);
    }

    async updateUser(id, data) {
        try {
            const doc = await this.userDetailRepository.update(id, data);
            const {displayName, job, notes, skill, location, education, image} = doc[1][0].dataValues;
            return { status: 200, body: {displayName, job, notes, skill, location, education, image} };
        }catch (error) {
            console.log(error);
            throw { status: 400, body: error };
        }
    }

}
module.exports = UserService;