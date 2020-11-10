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
module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await BlogService.findById(id);
        res.api(200, doc);
    }catch (error) {
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.update = async function (req, res, next) {
    try {
        validateRequest(req);
        let param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let data;
        if (req.file) data = {title:req.body.title,content:req.body.content,image:req.file.filename,status:req.body.status};
        else data = {title:req.body.title,content:req.body.content,status:req.body.status};
        let blog = await BlogService.update(parseInt(param), data);
        res.api(blog.status, blog.body);
    } catch (err) {
        next(err);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = req.method === 'PATCH'
            ? await BlogService.remove(id)
            : await BlogService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.getRestore = async function (req, res, next) {
    let list = await BlogService.getRestore();
    res.api(200, list);
}

module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await BlogService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

