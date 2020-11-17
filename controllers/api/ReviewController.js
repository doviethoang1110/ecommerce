const { ReviewService } = require('../../container');

module.exports.index = async (req, res) => res.api(200, await ReviewService.getAllReviews());


module.exports.update = async function(req, res, next) {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const doc = await ReviewService.update(id, req.body);
        res.api(200, doc);
    }catch (error) {
        next(error);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await ReviewService.remove(id,true);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}