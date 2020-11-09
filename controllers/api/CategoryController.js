const { CategoryService } = require('../../container');
const { validateRequest } = require('../../middlewares');

module.exports.index = async (req, res) => {
    let list = await CategoryService.getAllCategories();
    res.api(200,list);
}

module.exports.show = async (req,res) => {
    let category = await CategoryService.show(req.params.id);
    res.api(200,category);
}

module.exports.store = async function(req, res, next) {
    try{
        validateRequest(req);
        let category = await CategoryService.store({name,parentId,status} = req.body);
        res.api(category.status,category.body);
    }catch(err){
        next(err);
    }
}

module.exports.update = async function (req, res, next) {
    try {
        validateRequest(req);
        let param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let category = await CategoryService.update(parseInt(param), {name, parentId, status} = req.body);
        res.api(category.status, category.body);
    } catch (err) {
        next(err);
    }
}
module.exports.getRestore = async function (req, res) {
    let list = await CategoryService.getRestore();
    res.api(200, list);
}
module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CategoryService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}
module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CategoryService.remove(id)
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}