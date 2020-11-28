const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const {singleton} = require('./helpers');
const moment = require('moment');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const {initialize} = require('./services/PassportService');
const { checkToken } = require('./helpers');

// Cors
const cors = require("cors");
const { application, secretKey } = require('./config/configuration');
const corsOptions = {
  origin: application.origin,
  methods: application.methods,
  allowedHeaders: application.headers,
};

// import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const category = require('./routes/api/category');
const brand = require('./routes/api/brand');
const product = require('./routes/api/product');
const blog = require('./routes/api/blog');
const currency = require('./routes/api/currency');
const review = require('./routes/api/review');
const permission = require('./routes/api/permission');
const role = require('./routes/api/role');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const coupon = require('./routes/api/coupon');
const order = require('./routes/api/order');
const banner = require('./routes/api/banner');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use(session({
  secret: secretKey.sessionKey,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

initialize();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

//singleton variable
let categories;
let currencies;

app.use(async function (req,res,next) {
  if(!categories) {
    let func = await singleton;
    let data = await func();
    currencies = data.globalCurrencies
    categories = data.globalCategories
  }
  res.locals = {
    categories,
    currencies,
    customer: req.user
  }
  next()
});

app.use((req, res, next) => {
  res.locals.formatDate = function (date) {
    return moment(date).format('DD-MMMM-YYYY');
  }
  next();
})


// use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// use cors
app.use('/api/v1/', cors(corsOptions));
app.use('/api/v1/auth', auth);

app.use('/api/v1/', checkToken);

app.use('/api/v1/categories', category);
app.use('/api/v1/brands', brand);
app.use('/api/v1/products', product);
app.use('/api/v1/blogs', blog);
app.use('/api/v1/currencies', currency);
app.use('/api/v1/reviews', review);
app.use('/api/v1/permissions', permission);
app.use('/api/v1/roles', role);
app.use('/api/v1/users', user);
app.use('/api/v1/coupons', coupon);
app.use('/api/v1/orders', order);
app.use('/api/v1/banners', banner);

// overrideMethods
app.response.api = function (statusCode, body) {
  return this.status(statusCode).json(body);
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// exception handler
app.use(function (err, req, res, next) {
  if(err.type) res.api(err.status,err.message);
  res.api(err.status,err.body);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
