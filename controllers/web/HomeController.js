const {BrandService,BlogService,ProductService} = require('../../container')
module.exports.index = async function (req, res) {
    res.render('index' ,{
        title:'Multikart',
        images: await BrandService.getBrandImages(),
        blogs: await BlogService.getBlogsForIndex()
    });
}

module.exports.products = async function (req, res) {
    res.render('product-list', {title: 'Sản phẩm'});
}

module.exports.blogs = async function(req, res) {
    res.render('blog-list', {
        title: 'Blog-list',
        blogs: await BlogService.getRecentBlogs()
    })
}

module.exports.paginate = async function(req, res) {
    if(!(+req.query.page)) res.api(400, 'không tồn tại số trang');
    res.api(200, await BlogService.paginate(+req.query.page));
}

module.exports.blogDetail = async function (req, res) {
    const blog = await BlogService.findOne(req.params.slug);
    res.render('blog-detail', {
        title: blog.title,
        blog
    })
}

module.exports.getProducts = async function (req, res) {
    res.api(200, await ProductService.getProductsForWeb());
}

module.exports.productDetail = async function (req, res) {
    let product = await ProductService.getProductBySlug(req.params.slug);
    res.render('product-detail', {
        title: product.name,
        product
    })
}

module.exports.pro