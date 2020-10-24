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
        let categories = await this.categoryRepository.find({attributes:['id','name','parentId','status']});
        return categories;
    }
    async store(category) {
        let response;
        let doc;
        try {
            doc = await this.categoryRepository.create(category);
            console.log(doc);
            // let {name,status,parentId,_id:id} = doc;
            // response = { status: 201, body: {name,status,parentId,id} };
            return {};
        } catch (err) {
            response = err.errors ? { status: 400, body: { [err.errors.name.path]: err.errors.name.message } } :
                response = { status: 400, body: { ...err } };
            throw response;
        }
    }
    async update(id,category) {
        let response;
        let doc;
        try {
            doc = await this.categoryRepository.update(id, category);
            let {name,status,parentId,_id} = doc;
            response = { status: 200, body: {name,status,parentId,_id} };
            return response;
        } catch (err) {
            response = err.errors ? { status: 400, body: { [err.errors.name.path]: err.errors.name.message } } :
                response = { status: 400, body: { ...err } };
            throw response;
        }
    }

    async show(id) {
        let category = await this.categoryRepository.find({ query: { _id: id }, field: 'name parentId status', multiple: false });
        console.log(category)
        return category;
    }
}
module.exports = CategoryService;