const Container = require('typedi').Container;
module.exports = {
    CategoryService: Container.get(require('../services/CategoryService')),
    BrandService: Container.get(require('../services/BrandService')),
    ProductService: Container.get(require('../services/ProductService'))
}
