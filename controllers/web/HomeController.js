const {
    BrandService,
    BlogService,
    ProductService,
    CustomerService,
    ReviewService,
    WishListService,
    CouponService,
    OrderService
} = require('../../container');
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

module.exports.verifyEmail = async function(req, res, next) {
    try {
        const result = await CustomerService.verifyEmail(req.query.token);
        res.render('verify-token', {
            title: 'Xác thực tài khoản',
            result
        });
    }catch (error) {
        console.log(error)
        next(error);
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

module.exports.reviews = async (req, res, next) => {
    try {
        const result = await ReviewService.getProductReviews(req.params.productId);
        res.api(200, result);
    }catch (error) {
        next(error)
    }
}

module.exports.postReview = async (req, res, next) => {
    try {
        const result = await ReviewService.store(req.body);
        res.api(result.status, result.body);
    }catch (error) {
        next(error)
    }
}

module.exports.wishLists = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const result = await WishListService.getAllWishList(id);
        res.api(200, result);
    }catch (error) {
        next(error)
    }
}

module.exports.postWishList = async (req, res, next) => {
    try {
        const result = await WishListService.store(req.body);
        res.api(result.status, result.body);
    }catch (error) {
        next(error)
    }
}

module.exports.removeWishList = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const result = await WishListService.remove(id,true);
        res.api(result.status, result.body);
    }catch (error) {
        next(error)
    }
}

module.exports.coupons = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(isNaN(id)) throw new Error('không tồn tại id');
        const list = await CouponService.getCouponsForCheckout(id);
        res.api(200, list.coupons);
    }catch (error) {
        next(error);
    }
}

module.exports.useCoupon = async (req, res, next) => {
    try {
        const id = req.params.id;
        const code = req.params.code;
        if(isNaN(id)) throw new Error('không tồn tại id');
        if(!code) throw new Error('Thiếu mã coupon');
        const coupon = await CouponService.useCoupon(id,code);
        res.api(200, coupon);
    }catch (error) {
        next(error);
    }
}

module.exports.postCheckout = async (req, res, next) => {
    try {
        const order = await OrderService.checkout(req.body);
        res.api(order.status, order.body);
    }catch (error) {
        next(error)
    }
}