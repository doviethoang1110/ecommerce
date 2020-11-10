const { BlogRepository } = require('../repository');
const sequelize = require('sequelize');

class BlogService {
    constructor(container) {
        this.blogRepository = container.get(BlogRepository);
    }
    async getAllBlogs() {
        let blogs = this.blogRepository.find({});
        return blogs;
    }
    async store(blog) {
        try {
            let doc = await this.blogRepository.create(blog);
            let {title,status,image,id} = doc;
            return { status: 201, body: {title,status,image,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
    async update(param,blog) {
        try {
            let doc = await this.blogRepository.update(param,blog);
            let {title,status,image,id,content} = doc[1][0].dataValues;
            return { status: 200, body: {title,status,image,id,content} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async remove(id,force) {
        try {
            let doc = await this.blogRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async getRestore() {
        let blogs = await this.blogRepository.find({ attributes: ['id','title','image'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});
        return blogs;
    }

    async restore(id) {
        let doc = await this.blogRepository.restore(id,['id','image','status','title']);
        return doc;
    }

    async findById(id) {
        let blog = await this.blogRepository.findOne(id,{attributes:['id','title','image','content','status']});
        return blog;
    }
}
module.exports = BlogService;