const Container = require('typedi').Container;
module.exports = {
    CategoryService: Container.get(require('../services/CategoryService')),
    BrandService: Container.get(require('../services/BrandService')),
    ProductService: Container.get(require('../services/ProductService')),
    BlogService: Container.get(require('../services/BlogService')),
    CurrencyService: Container.get(require('../services/CurrencyService')),
    CustomerService: Container.get(require('../services/CustomerService')),
    ReviewService: Container.get(require('../services/ReviewService')),
    WishListService: Container.get(require('../services/WishListService')),
    RoleService: Container.get(require('../services/RoleService')),
    PermissionService: Container.get(require('../services/PermissionService'))
}
