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
        console.log(req.file,req.body,req.files)
        // let data = await ProductService.update(req.body);
        // res.api(data.status,data.body);
    }catch(err){
        next(err);
    }
}

module.exports.store = async function(req, res, next) {
    try{
        let data = await ProductService.store(req.body);
        res.api(data.status,data.body);
    }catch(err){
        next(err);
    }
}
