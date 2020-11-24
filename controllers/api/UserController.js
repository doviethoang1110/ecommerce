const { UserService } = require('../../container');
const passport = require('passport');
const { jwtGenerate } = require('../../helpers');
const { secretKey } = require('../../config/configuration');
let tokenList = {};

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

module.exports.login = (req, res, next) => {
    passport.authenticate('login-jwt', (error, user, info) => {
        if(error) res.api(500, error);
        if(!user) res.api(401, info.message);
        req.logIn(user, {session:false}, (err) => {
            if(err) res.api(500, err);
            else {
                const roles = [];
                if(user.roles.length)
                    user.roles.forEach(u => {
                        roles.push(u.name);
                        if(u.permissions.length) u.permissions.forEach(p => roles.push(p.name));
                    });
                user = {...user.dataValues, roles};
                delete user.password;
                Promise.all([jwtGenerate(user, secretKey.jwtKey, secretKey.token_life),
                    jwtGenerate(user, secretKey.refreshTokenKey, secretKey.refreshTokenLife)])
                    .then(values => {
                        tokenList[`${values[1]}`] = {token:values[0], refreshToken: values[1]};
                        res.api(200, {token:values[0], refreshToken: values[1]});
                    }).catch(error => console.log(error));
            }
        })
    })(req, res, next);
}

module.exports.refreshToken = (req, res, next) => {
    console.log(req.body)
}