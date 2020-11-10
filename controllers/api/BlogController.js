const { BlogService } = require('../../container');
const { validateRequest } = require('../../middlewares');
module.exports.index = async (req, res) => {
    let list = await BlogService.getAllBlogs();
    res.api(200,list);
}

module.exports.store = async (req, res, next) => {
    try{
        validateRequest(req);
        let data = {title:req.body.title,content:req.body.content,image:req.file.filename,status:req.body.status};
        let blog = await BlogService.store(data);
        res.api(blog.status,blog.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}