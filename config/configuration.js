require('dotenv').config();
module.exports = {
    application: {
        port:process.env.PORT || 5000,
        origin:process.env.ORIGIN,
        methods: process.env.METHODS,
        headers: process.env.HEADERS,
        secretKey: process.env.SECRETKEY
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
    }
}