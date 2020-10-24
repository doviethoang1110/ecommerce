const { BrandService } = require('../../container');

module.exports.index = async (req, res) => {
    let list = await BrandService.getAllBrands();
    res.api(200,list);
}


module.exports.store = async function(req, res, next) {
    try{
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