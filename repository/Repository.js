const { validate } = require('../middlewares');
const sequelize  = require("sequelize");

class Repository {
    constructor(Model) {
        this.collection = Model;
    }
    async find({ where = {}, attributes = null, order = null, limit = null, group = null }) {
        return this.collection.findAll({where, attributes, order, group, limit});
    }

    async create(data) {
        try {
            const document = await this.collection.create(data);
            return document
        } catch (err) {
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }
    async update(id,data) {
        try {
            let document = await this.collection.update(data,{where:{id},individualHooks:true});
            return document;
        }catch (err) {
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }
}
module.exports = Repository;