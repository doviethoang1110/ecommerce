const { BannerRepository } = require('../repository');
const sequelize = require('sequelize');

class BannerService {
    constructor(container) {
        this.bannerRepository = container.get(BannerRepository);
    }

    async getAllBanners() {
        return await this.bannerRepository.find({attributes: ['id','name','status','image','type']});
    }

    async getBannersForIndex() {
        return await this.bannerRepository.find({attributes: ['id','name','content','type','links','image'],where: {status: true}});
    }

    async findById(id) {
        return await this.bannerRepository.findOne(id, {attributes: ['id','name','links','content','image','type','status']});
    }

    async store(banner) {
        try {
            const doc = await this.bannerRepository.create(banner);
            const {id,name,type,status,image} = doc;
            return { status: 201, body: {id,name,type,status,image} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async update(param,banner) {
        try {
            const doc = await this.bannerRepository.update(param,banner);
            const {id,name,type,status,image,links,content} = doc[1][0].dataValues;
            return { status: 200, body: {id,name,type,status,image,links,content} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async remove(id,force) {
        try {
            let doc = await this.bannerRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async getRestore() {
        return await this.bannerRepository.find(
            { attributes: ['id','name','type','image'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});
    }

    async restore(id) {
        return await this.bannerRepository.restore(id,['id','image','status','name','type']);
    }
}
module.exports = BannerService;