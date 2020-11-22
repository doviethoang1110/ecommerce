require('dotenv').config();
module.exports = {
    application: {
        port:process.env.PORT || 5000,
        origin:process.env.ORIGIN,
        methods: process.env.METHODS,
        headers: process.env.HEADERS
    },
    database: {
        port: process.env.DBPORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        dbname: process.env.DB_NAME,
    },
    mailer: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        name: process.env.MAIL_NAME,
        password: process.env.MAIL_PASSWORD
    },
    secretKey: {
        sessionKey: process.env.SECRETKEY,
        jwtKey: process.env.JWTKEY,
        refreshTokenKey: process.env.REFRESHTOKENKEY,
        issuer: process.env.ISSUER,
        token_life: process.env.TOKEN_LIFE,
        refreshTokenLife: process.env.REFRESHTOKEN_LIFE
    }
}