const { BlogRepository } = require('../repository');
const sequelize = require('sequelize');

class BlogService {
    constructor(container) {
        this.blogRepository = container.get(BlogRepository);
    }

    async getAllBlogs() {
        return this.blogRepository.find({attributes:['id','title','image','status']});
    }

    getBlogsForIndex() {
        return this.blogRepository.find(
            {where: {status: true},attributes:['slug','title','image','createdAt'],order:sequelize.literal('rand()'),limit: 5});
    }

    getBlogs() {
        return this.blogRepository.find(
            {where: {status: true},attributes:['slug','title','image','createdAt']})
    }

    paginate(page = 1, paginate = 5) {
        return this.blogRepository.pagination({
            attributes: ['slug','title','image','createdAt'],
            where: {status: true},
            page,
            order: [['createdAt','desc']],
            paginate
        });
    }

    getRecentBlogs() {
        return this.blogRepository.find(
            {attributes:['slug','image','createdAt'],where:{status:true},limit:8,order: [['createdAt','desc']]})
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
        return await this.blogRepository.find(
            { attributes: ['id','title','image'],paranoid:false, where: {deletedAt: {[sequelize.Op.not]:null}}});;
    }

    async restore(id) {
        return await this.blogRepository.restore(id,['id','image','status','title']);;
    }

    async findById(id) {
        return await this.blogRepository.findOne(id,{attributes:['id','title','image','content','status']});;
    }

    async findOne(slug) {
        return await this.blogRepository.findOneByAttribute(
            {where: {slug,status: true},attributes:['title','image','content','createdAt']});
    }
}
module.exports = BlogService;