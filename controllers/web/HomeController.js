const {BrandService} = require('../../container')
module.exports.index = async function (req, res) {
    res.render('index' ,{title:'Multikart', images: await BrandService.getBrandImages()});
}

module.exports.products = async function (req, res) {
    res.render('product-list', {title: 'Sản phẩm'});
}