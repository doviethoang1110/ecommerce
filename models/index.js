const { Sequelize,DataTypes } = require('sequelize');
const { database } = require('../config/configuration');

const sequelize = new Sequelize(database.dbname, database.username, database.password, {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.categories = require("../models/category")(sequelize, DataTypes);
db.brands = require("../models/brand")(sequelize, DataTypes);
db.products = require("../models/product")(sequelize, DataTypes);
// relationships
db.categories.belongsToMany(db.products,{
  through: "Category_Product",
  as: "products",
  foreignKey: "category_id"
});
db.products.belongsToMany(db.categories,{
  through: "Category_Product",
  as: "categories",
  foreignKey: "product_id"
})

module.exports = db;
