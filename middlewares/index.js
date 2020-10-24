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

module.exports.validate = (model) => {
    let errors = model.validateSync();
    if (errors) {
        let keys = Object.keys(errors.errors);
        let values = Object.values(errors.errors).toString().split(',');
        let error = keys.reduce((a, b, index) => ({ ...a, [b]: values[index] }), {});
        throw error;
    }
}
module.exports.validateRequest = (model) => {
    let results = validationResult(model);
    if(results.errors.length > 0) {
        let body = {};
        for (let e of results.errors) {
            body[e.param] = e.msg;
        }
        let errors = { status: 400, body: { ...body } }
        throw errors;
    }
}
module.exports.upload = upload;