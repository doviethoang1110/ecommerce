const { CategoryRepository } = require('../repository');
class CategoryService {
    constructor(container) {
        this.categoryRepository = container.get(CategoryRepository);
    }
    async printMenusWeb(id = 0) {
        let categories = await this.categoryRepository.find({ query: { parentId: id, status: true }, field: 'name slug' });
        let output = [];
        for (let category of categories) {
            let cat = {};
            cat.id = category._id;
            cat.label = category.name;
            cat.slug = category.slug;
            cat.children = await this.printMenusWeb(cat.id);
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

    async show(id) {
        let category = await this.categoryRepository.find({ query: { _id: id }, field: 'name parentId status', multiple: false });
        console.log(category)
        return category;
    }
}
module.exports = CategoryService;