const { ProductRepository,OptionRepository,SkuRepository } = require('../repository');
const { skus,options } = require('../models');
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
            let doc = await this.productRepository.update(data.id, data);
            let product = await this.getProductById(data.id);
            return { status: 200, body: product };
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

}
module.exports = ProductService;