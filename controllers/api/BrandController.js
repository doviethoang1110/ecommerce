const { BrandService } = require('../../container');
const { validateRequest } = require('../../middlewares')
module.exports.index = async (req, res) => {
    let list = await BrandService.getAllBrands();
    res.api(200,list);
}


module.exports.store = async function(req, res, next) {
    try{
        validateRequest(req);
        let data = {name:req.body.name,image:req.file.filename,status:req.body.status};
        let brand = await BrandService.store(data);
        res.api(brand.status,brand.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.update = async function (req, res, next) {
    try {
        validateRequest(req);
        let param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let data;
        if (req.file) data = {name:req.body.name,image:req.file.filename,status:req.body.status};
        else data = {name:req.body.name,status:req.body.status};
        let brand = await BrandService.update(parseInt(param), data);
        res.api(brand.status, brand.body);
    } catch (err) {
        next(err);
    }
}

module.exports.getRestore = async function (req, res, next) {
    let list = await BrandService.getRestore();
    res.api(200, list);
}
module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await BrandService.restore(id);
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
        let doc = req.method === 'PATCH'
            ? await BrandService.remove(id)
            : await BrandService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}