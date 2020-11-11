const { CurrencyService } = require('../../container');
const { validateRequest } = require('../../middlewares');

module.exports.index = async (req, res) => {
    let list = await CurrencyService.getAllCurrencies();
    res.api(200,list);
}

module.exports.store = async (req, res, next) => {
    try{
        validateRequest(req);
        let currency = await CurrencyService.store(req.body);
        res.api(currency.status,currency.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CurrencyService.findById(id);
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
        let currency = await CurrencyService.update(param,req.body);
        res.api(currency.status,currency.body);
    } catch (err) {
        next(err);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await CurrencyService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}