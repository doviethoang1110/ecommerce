// const { validate } = require('../middlewares');
const sequelize  = require("sequelize");

class Repository {
    constructor(Model) {
        this.collection = Model;
        console.log(this.collection)
    }
    async find({ where = {}, attributes = null, order = null, limit = null, group = null }) {
        return this.collection.findAll({where, attributes, order, group, limit});
    }

    async create(data) {
        try {
            const document = await this.collection.create(data);
            console.log(document)
            return document
        } catch (err) {
            console.log(err.errors)
            throw err;
        }
    }
    // async update(id,data) {
    //     try {
    //         const document = await this.collection.findByIdAndUpdate(id,data,{ useFindAndModify: false, new: true });
    //         return document;
    //     }catch (err) {
    //         throw err;
    //     }
    // }
}
module.exports = Repository;