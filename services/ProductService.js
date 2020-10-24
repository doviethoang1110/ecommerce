const { ProductRepository,SkuRepository } = require('../repository');
// const {generateSlug} = require('../helpers/helper');

class ProductService {
    constructor(container) {
        this.productRepository = container.get(ProductRepository);
        this.skuRepository = container.get(SkuRepository);
    }
    async getAllProducts() {
        let products = await this.productRepository.getAllProducts();
        return products;
    }
    async store(product) {
        let response;
        try {
            let {name, categories, brand, description, priority, status, vision, discount, options, skus } = product;
            let slug = generateSlug(name);
            let productInstance = await
                this.productRepository.create({name,categories,brand, description, priority, status, vision, discount,options,slug});
            let arraySkus = await this.skuRepository.createMany(skus.map(s => ({
                code: s.code,
                stock: s.stock,
                importPrice: s.importPrice,
                exportPrice: s.exportPrice,
                values: s.values,
                product: productInstance._id
            })));
            this.productRepository.update(productInstance._id,{skus:arraySkus});
            return { status: 201, body: 'Thêm mới thành công' };
        } catch (err) {
            console.log(err)
            response = err.errors
                ? { status: 400, body: { [err.errors.name.path]: err.errors.name.message } } :
                response = { status: 400, body: { ...err } };
            throw response;
        }
    }

}
module.exports = ProductService;