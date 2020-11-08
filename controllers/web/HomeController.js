module.exports.index = async function (req, res) {
    res.render('index' ,{title:'Multikart'});
}

module.exports.products = async function (req, res) {
    res.render('product-list', {title: 'Sản phẩm'});
}