const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {menus} = require('./helpers')
// Cors
const cors = require("cors");
const { application } = require('./config/configuration');
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
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

// app.use(async function (req,res,next) {
//   res.locals = {
//     categories: await menus()
//   }
//   next()
// })

// use cors
app.use('/api/v1/', cors(corsOptions));

// use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/v1/categories', category);
app.use('/api/v1/brands', brand);
app.use('/api/v1/products', product);


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
