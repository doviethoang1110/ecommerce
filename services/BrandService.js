const { BrandRepository } = require('../repository');
const { Op } = require("sequelize");

class BrandService {
    constructor(container) {
        this.brandRepository = container.get(BrandRepository);
    }

    async getAllBrands() {
        let brands = await this.brandRepository.find({ attributes: ['id','name', 'status', 'image'] });
        return brands;
    }
    async store(brand) {
        try {
            let doc = await this.brandRepository.create(brand);
            let {name,status,image,id} = doc;
            return { status: 201, body: {name,status,image,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
    async update(param,category) {
        try {
            let doc = await this.brandRepository.update(param,category);
            let {name,status,image,id} = doc[1][0].dataValues;
            return { status: 200, body: {name,status,image,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
    async getRestore() {
        let brands = await this.brandRepository.find({ attributes: ['id','name','image'],paranoid:false, where: {deletedAt: {[Op.not]:null}}});
        return brands;
    }
    async restore(id) {
        let doc = await this.brandRepository.restore(id);
        return doc;
    }
    async remove(id,force) {
        try {
            let doc = await this.brandRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }
}
module.exports = BrandService;