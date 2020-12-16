const { UserService, ConversationService } = require('../../container');
const passport = require('passport');
const { jwtGenerate } = require('../../helpers');
const { secretKey } = require('../../config/configuration');

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
                        UserService.storeRefreshToken({userId:user.id,refreshToken: values[1]})
                            .then(() => {
                                res.api(200, {token:values[0], refreshToken: values[1]});
                            })
                    }).catch(error => console.log(error));
            }
        })
    })(req, res, next);
}

module.exports.refreshToken = (req, res, next) => {
    console.log(req.body)
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const param = req.params.id;
        if (!param) res.api(400, 'Không tồn tại Id');
        let data;
        if (req.file) data = {...req.body,image:req.file.filename};
        else data = req.body;
        const detail = await UserService.updateUser(+(param), data);
        res.api(detail.status, detail.body);
    } catch (err) {
        next(err);
    }
}

module.exports.userDetails = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        res.api(200, await UserService.userDetails(id));
    }catch (error) {
        next(error)
    }
}

module.exports.listFriends = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        res.api(200, await UserService.listFriends(id));
    }catch (error) {
        next(error)
    }
}

module.exports.friendRequestReceived = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        res.api(200, await UserService.friendRequestReceived(id));
    }catch (error) {
        next(error)
    }
}

module.exports.profile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const loginId = req.params.loginId;
        if(isNaN(id) || isNaN(loginId)) throw new Error('không tồn tại id');
        res.api(200, await UserService.profile(loginId,id));
    }catch (error) {
        next(error)
    }
}

module.exports.findConversation = async (req, res, next) => {
    try {
        const creatorId = req.params.creatorId;
        const userId = req.params.userId;
        if(isNaN(creatorId) || isNaN(userId)) throw new Error('không tồn tại id');
        res.api(200, await ConversationService.findConversation(creatorId, userId));
    }catch (error) {
        next(error)
    }
}
