const {BrandService,BlogService,ProductService,CustomerService} = require('../../container');
const passport = require('passport');

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

module.exports.carts = async function (req, res) {
    res.render('cart', {
        title: 'Giỏ hàng'
    })
}

module.exports.checkout = async function (req, res) {
    res.render('checkout', {
        title: 'Thanh toán',
        name:req.user.name
    })
}

module.exports.register = async function (req, res) {
    res.render('register', {
        title: 'Đăng ký'
    })
}

module.exports.postRegister = async function (req, res, next) {
    try{
        const customer = await CustomerService.store(req.body);
        res.api(customer.status,customer.body);
    }catch(err){
        console.log(err)
        next(err);
    }
}

module.exports.login = async function (req, res) {
    res.render('login', {
        title: 'Đăng nhập'
    })
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local',function(error, customer, info) {
        if(error) {
            res.api(500, error);
            return;
        }
        if(!customer) {
            res.api(401, info.message);
            return;
        }
        if(req.body.remember) req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000;
        else req.session.cookie.expires = false;
        req.logIn(customer, function (err) {
            if(err) res.api(500, err);
            else res.api(200, 'Đăng nhập thành công');
        })
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        res.api(200, 'Đăng xuất thành công');
    }
    else res.api(400, 'Đăng xuất thất bại');;
}

module.exports.dashboard = (req, res, next) => {
    res.render('dashboard', {
        title: 'Trang cá nhân'
    })
}