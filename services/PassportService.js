const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { CustomerService } = require('../container');
const passport = require('passport');

authentication = (emailRequest, passwordRequest, done) => {
    CustomerService.findCustomerByEmail(emailRequest).then(customer => {
        if(!customer) return done(null, false, {message: 'Tên không đúng'});
        let {id,name,email,address,phone} = customer;
        if(bcrypt.compareSync(passwordRequest, customer.password)) return done(null, {id,name,email,address,phone},null);
        else return done(null, false, {message: 'Mật khẩu không đúng'});
    }).catch(error => done(error))
}

module.exports.initialize = () => {
    passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'}, authentication));
};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.redirect('/dang-nhap');
}

module.exports.isUnAuthenticated = (req, res, next) => {
    if(req.isUnauthenticated()) next();
    else res.redirect('back');
}