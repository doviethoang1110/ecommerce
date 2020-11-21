const { UserService } = require('../../container');

module.exports.index = async (req, res) => {
    let list = await UserService.getAllUsers();
    res.api(200, list);
}

module.exports.register = async (req, res, next) => {
    try{
        const user = await UserService.store(req.body);
        res.api(user.status, user.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await UserService.findById(id);
        res.api(200, doc.roles);
    }catch (error) {
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        const data = await UserService.update(req.body, parseInt(param));
        res.api(data.status, data.body);
    } catch (err) {
        next(err);
    }
}