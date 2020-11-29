const { ProductRepository,OptionRepository,SkuRepository } = require('../repository');
const { skus,options } = require('../models');
const sequelize = require('sequelize');


class ProductService {
    constructor(container) {
        this.productRepository = container.get(ProductRepository);
        this.optionRepository = container.get(OptionRepository);
        this.skuRepository = container.get(SkuRepository);
    }
    async getAllProducts() {
        let products = await this.productRepository.findAllProductsAdmin();
        return products;
    }

    async getProductsForWeb() {
        return await this.productRepository.getProductsForWeb();
    }

    async getProductsForIndex() {
        return await this.productRepository.getProductForIndex();
    }

    async filterProducts(query) {
        const pageSize = 2;
        const products = await this.productRepository.paginate({...query, pageSize, page: query.page - 1});
        const totalItems = await this.productRepository.countProducts();
        const listPages = [];
        const length = Math.ceil((totalItems/pageSize));
        for (let i = 1; i <= length; i++) listPages.push(i);
        const res = {products, currentPage: +query.page, totalItems, listPages, pageSize, totalPages: length};
        return res;
    }

    async getProductBySlug(slug) {
        return await this.productRepository.findOneByAttribute({
            attributes: ['id','name','discount','description','image'],
            where: {status:true,slug},
            include: [
                {
                    model:skus,
                    as:'skus',
                    attributes:['code','exportPrice','stock','values']
                },
                {
                    model:options,
                    as:'options',
                    attributes:['id','name','values']
                },
            ]
        });
    }

    async getProductById(id) {
        let product = await this.productRepository.findById(id);
        return product;
    }

    async update(data) {
        try {
            const product = await this.productRepository.findCategoriesOfProduct(data.id);
            const oldArray = product.categories.map(c => c.id);
            const newArray = data.categories.split(",").map(s => +s);
            const removeItems = oldArray.filter(p => !newArray.includes(+p));
            const addItems = newArray.filter(p => !oldArray.includes(p));
            const doc = await this.productRepository.update(data.id, data);
            const res = doc[1][0];
            if(addItems.length) await res.addCategories(addItems);
            if(removeItems.length) await res.removeCategories(removeItems);
            const result = await this.getProductById(data.id);
            return { status: 200, body: result };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async store(product) {
        let response;
        try {
            let {name, categories, brand:brand_id, description, priority, status, vision, discount, options, skus } = product;
            let uniqueCode = await this.skuRepository.find({attributes:['code'],where:{code:skus.map(s => (s.code))}});
            if(uniqueCode.length) throw new Error(uniqueCode[0].code + ' đã được sử dụng');
            let productInstance = await this.productRepository.create({name,brand_id, description, priority, status, vision, discount });
            productInstance.addCategories(categories);
            options = options.map(o =>({...o,productId:productInstance.id}));
            skus = skus.map(s => ({...s,product_id:productInstance.id}));
            await Promise.all([this.skuRepository.bulkCreate(skus),this.optionRepository.bulkCreate(options)]);
            return { status: 201, body: 'Thêm mới thành công' };
        } catch (err) {
            throw { status: 400, body: err.message };
        }
    }
    async updateSkus(id,data) {
        try {
            if(Array.isArray(data)) for(let d of data) await this.skuRepository.update(d.id,d);
            return { status: 200, body: 'Cập nhật thành công' };
        }catch (e) {
            throw { status : 400, body: e.message};
        }
    }

    async remove(id) {
        try {
            const doc = await this.productRepository.remove(id);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }

    async getRestore() {
        return await this.productRepository.findRestore({where: {deletedAt: {[sequelize.Op.not]:null}}});
    }

    async restore(id) {
        return await this.productRepository.restore(id);
    }

    async searchProductByName(keyword) {
        return await this.productRepository.getProductForIndex(` and p.name like "%${keyword}%" `);
    }

}
module.exports = ProductService;