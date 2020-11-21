const { RoleService } = require('../../container');

module.exports.index = async (req, res) => {
    let list = await RoleService.getAllRoles();
    res.api(200, list);
}

module.exports.select = async (req, res) => res.api(200, await RoleService.getRoleSelect())

module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await RoleService.findById(id);
        res.api(200, doc);
    }catch (error) {
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.store = async (req, res, next) => {
    try{
        let results = await RoleService.store(req.body);
        res.api(results.status, results.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        const data = await RoleService.store(req.body, parseInt(param));
        res.api(data.status, data.body);
    } catch (err) {
        next(err);
    }
}

module.exports.getRestores = async (req, res, next) => {
    let list = await RoleService.getRoleRestores();
    res.api(200, list);
}

module.exports.remove = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await RoleService.remove(id)
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}

module.exports.restore = async function (req, res, next) {
    try {
        let id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        let doc = await RoleService.restore(id);
        res.api(200, doc);
    }catch (error) {
        console.log(error);
        error = {type:'error',status:400,message:error.message};
        next(error)
    }
}
