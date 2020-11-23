const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { localAuthentication, jwtAuthentication } = require('../helpers');

module.exports.initialize = () => {
    passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'}, localAuthentication));
    
    passport.use('login-jwt', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, jwtAuthentication));
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