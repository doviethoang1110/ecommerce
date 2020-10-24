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
        let response;
        try {
            let doc = await this.brandRepository.create(brand);
            let {name,status,image,_id} = doc;
            response = { status: 201, body: {name,status,image,_id} };
            return response;
        } catch (err) {
            response = err.errors ? { status: 400, body: { [err.errors.name.path]: err.errors.name.message } } :
                response = { status: 400, body: { ...err } };
            throw response;
        }
    }
    async update(id,brand) {
        let response;
        try {
            let doc = await this.brandRepository.update(id, brand);
            let {name,status,image,_id} = doc;
            response = { status: 200, body: {name,status,image,_id} };
            return response;
        } catch (err) {
            response = err.errors ? { status: 400, body: { [err.errors.name.path]: err.errors.name.message } } :
                response = { status: 400, body: { ...err } };
            throw response;
        }
    }

    // async show(id) {
    //     let category = await this.categoryRepository.find({ query: { _id: id }, field: 'name parentId status', multiple: false });
    //     console.log(category)
    //     return category;
    // }
}
module.exports = BrandService;