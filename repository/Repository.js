const { validate } = require('../middlewares');
const sequelize  = require("sequelize");

class Repository {
    constructor(Model) {
        this.collection = Model;
    }
    async find({ where = {}, attributes = null, include = {}, order = null, limit = null, group = null,paranoid = true }) {
        return this.collection.findAll({where, attributes, order, group, limit,paranoid});
    }

    async create(data) {
        try {
            const document = await this.collection.create(data);
            return document
        } catch (err) {
            console.log(err)
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }
    async update(id,data) {
        try {
            let document = await this.collection.update(data,{where:{id},individualHooks:true});
            return document;
        }catch (err) {
            console.log(err)
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }
    async restore(id) {
        try {
            let data = await Promise.all([this.collection.restore({where: {id}}),
                this.collection.findByPk(id,{paranoid: false,attributes:['id','image','status','name']})]);
            return data[1];
        }catch (err) {
            console.log(err);
            if(err) throw err;
        }
    }
    async remove(id,force = false) {
        try {
            let data = await this.collection.destroy({where: {id}, force,individualHooks:true});
            return data;
        }catch (err) {
            console.log(err);
            if(err) throw err;
        }
    }
    async bulkCreate(array) {
        try {
            let data = await this.collection.bulkCreate(array);
            return data;
        }catch (e) {
            let errors = validate(err.errors);
            if(errors) throw errors;
        }
    }
}
module.exports = Repository;