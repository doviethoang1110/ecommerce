const { validationResult } = require('express-validator');
const multer = require('multer');
const imageValidate = (req,file,cb) => {
    file.mimetype.startsWith('image')
        ? cb(null,true)
        : cb(new Error('Chỉ được đăng ảnh'),false);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}${file.originalname}`);
    },
});
const upload = multer({storage:storage,fileFilter:imageValidate,limits:1000000});
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