const { CurrencyRepository } = require('../repository');
const sequelize = require('sequelize');

class CurrencyService {
    constructor(container) {
        this.currencyRepository = container.get(CurrencyRepository);
    }

    async getAllCurrencies() {
        return this.currencyRepository.find({attributes: {exclude:['createdAt','updatedAt']}});
    }

    async store(currency) {
        try {
            let doc = await this.currencyRepository.create(currency);
            let {name,code,rate,id} = doc;
            return { status: 201, body: {name,code,rate,id} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async update(param,currency) {
        try {
            let doc = await this.currencyRepository.update(param,currency);
            let {id,name,code,rate} = doc[1][0].dataValues;
            return { status: 200, body: {id,name,code,rate} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async findById(id) {
        return await this.currencyRepository.findOne(id, {});
    }

    async remove(id,force) {
        try {
            let doc = await this.currencyRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

}
module.exports = CurrencyService;