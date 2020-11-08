const { validationResult } = require('express-validator');
const multer = require('multer');
const imageValidate = (req,file,next) => {
    if(!file) next();
    const image = file.mimetype.startsWith('image/');
    if(image) next(null,true);
    else next({message:'Chỉ được đăng ảnh',status:400,type:'image'},false);
}
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads/');
    },
    filename: (req, file, next) => {
        next(null, `${new Date().toISOString()}${file.originalname}`);
    },
});
const upload = multer({storage:storage,fileFilter:imageValidate,limits:10000000});
module.exports.upload = upload;


module.exports.validate = (model) => {
    let errors;
    if(model || model.length) errors = model.reduce((m,n) => ({...m,[n.path]:n.message}),{});
    if(errors) throw errors;
}

module.exports.validateRequest = (model) => {
    let results = validationResult(model);
    if(results.errors.length) throw { status: 400, body: { ...results.errors.reduce((m,n) => ({...m,[n.param]:n.msg}),{}) } };
}