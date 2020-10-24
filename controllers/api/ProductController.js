const { ProductService } = require('../../container');

module.exports.index = async function(req, res) {
    let data = await ProductService.getAllProducts();
    res.api(200, data);
}

module.exports.store = async function(req, res, next) {
    try{
        let data = await ProductService.store(req.body);
        res.api(data.status,data.body);
    }catch(err){
        next(err);
    }
}
