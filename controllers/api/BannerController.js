const { BannerService } = require('../../container');
const { validateRequest } = require('../../middlewares');


module.exports.index = async (req, res) => {
    res.api(200,await BannerService.getAllBanners());
}

module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const doc = await BannerService.findById(id);
        res.api(200, doc);
    }catch (error) {
        next(error)
    }
}

module.exports.store = async function(req, res, next) {
    try{
        validateRequest(req);
        const banner = await BannerService.store({...req.body,image:req.file.filename});
        res.api(banner.status, banner.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.update = async function (req, res, next) {
    try {
        validateRequest(req);
        const param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let data;
        if (req.file) data = {...req.body,image:req.file.filename};
        else data = {...req.body};
        const banner = await BannerService.update(+param, data);
        res.api(banner.status, banner.body);
    } catch (err) {
        next(err);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = req.method === 'PATCH'
            ? await BannerService.remove(id)
            : await BannerService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.restore = async function (req, res, next) {
    res.api(200, await BannerService.getRestore());
}

module.exports.postRestore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await BannerService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        next(error)
    }
}