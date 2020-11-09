const { CategoryRepository } = require('../repository');
const { Op } = require("sequelize");

class CategoryService {
    constructor(container) {
        this.categoryRepository = container.get(CategoryRepository);
    }
    async printMenusWeb(id = 0) {
        let categories = await this.categoryRepository.find({ attributes: ['name','slug','id'], where: {status:true,parentId:id} });
        let output = [];
        for (let category of categories) {
            let cat = {};
            cat.name = category.name;
            cat.slug = category.slug;
            cat.children = await this.printMenusWeb(category.id);
            output.push(cat);
        }
        return output;
    }

    async getAllCategories() {
        let categories = await this.categoryRepository.find({attributes: ['id','name','parentId','status']})
        return categories;
    }
    async store(category) {
        try {
            let doc = await this.categoryRepository.create(category);
            let {name,status,parentId,id} = doc;
            return { status: 201, body: {name,status,parentId,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
    async update(param,category) {
        try {
            let doc = await this.categoryRepository.update(param,category);
            let {name,status,parentId,id} = doc[1][0].dataValues;
            return { status: 200, body: {name,status,parentId,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
    async getRestore() {
        let categories = await this.categoryRepository.find({ attributes: ['id','name'],paranoid:false, where: {deletedAt: {[Op.not]:null}}});
        return categories;
    }
    async restore(id) {
        let doc = await this.categoryRepository.restore(id,['id','name','status','parentId']);
        return doc;
    }
    async remove(id,force) {
        try {
            let doc = await this.categoryRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    // async show(id) {
    //     let category = await this.categoryRepository.find({ query: { _id: id }, field: 'name parentId status', multiple: false });
    //     console.log(category)
    //     return category;
    // }
}
module.exports = CategoryService;