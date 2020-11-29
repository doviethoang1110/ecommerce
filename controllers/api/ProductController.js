const { ProductService } = require('../../container');

module.exports.index = async function(req, res) {
    let data = await ProductService.getAllProducts();
    res.api(200, data);
}
module.exports.show = async function(req, res, next) {
    try {
        if(isNaN(req.params.id)) throw new Error('Không tồn tại id');
        let data = await ProductService.getProductById(req.params.id);
        res.api(200,data);
    }catch (e) {
        let error = {status:400,body:e.message};
        next(error);
    }
}
module.exports.updateSkus = async function(req, res, next) {
    try {
        if(isNaN(req.params.id)) throw new Error('Không tồn tại id');
        let data = await ProductService.updateSkus(req.params.id,req.body);
        res.api(200,data);
    }catch (e) {
        let error = {status:400,body:e.message};
        next(error);
    }
}
module.exports.update = async function(req, res, next) {
    try{
        let data;
        let body = req.body;
        if(req.file) data = {id:body.id, name:body.name, categories:body.categories, brand_id:body.brand, image:req.file.filename,
            description:body.description, priority:body.priority, status:body.status, vision:body.vision, discount:body.discount };
        else data = {id:body.id, name:body.name, categories:body.categories, brand_id:body.brand,
            description:body.description, priority:body.priority, status:body.status, vision:body.vision, discount:body.discount };
        let doc = await ProductService.update(data);
        res.api(doc.status,doc.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.store = async function(req, res, next) {
    try{
        const data = await ProductService.store(req.body);
        res.api(data.status,data.body);
    }catch(err){
        next(err);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const doc = await ProductService.remove(id)
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.getRestore = async function (req, res, next) {
    res.api(200, await ProductService.getRestore());
}

module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await ProductService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        next(error)
    }
}
