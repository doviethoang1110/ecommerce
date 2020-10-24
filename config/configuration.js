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
    }
}