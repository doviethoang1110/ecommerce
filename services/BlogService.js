const { BlogRepository } = require('../repository');

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
}
module.exports = BlogService;