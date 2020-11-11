const Container = require('typedi').Container;
module.exports = {
    CategoryService: Container.get(require('../services/CategoryService')),
    BrandService: Container.get(require('../services/BrandService')),
    ProductService: Container.get(require('../services/ProductService')),
    BlogService: Container.get(require('../services/BlogService')),
    CurrencyService: Container.get((require('../services/CurrencyService')))
}
