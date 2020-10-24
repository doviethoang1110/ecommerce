const { BrandRepository } = require('../repository');
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
}
module.exports = BrandService;