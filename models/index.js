const { Sequelize,DataTypes } = require('sequelize');
const { database } = require('../config/configuration');
const { hookModel} = require('../helpers')

const sequelize = new Sequelize(database.dbname, database.username, database.password, {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define:{
    hooks: {
      beforeCreate(attributes, options) {
        hookModel(attributes);
      },
      beforeUpdate(instance, options) {
        hookModel(instance);
      }
    }
  }
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.categories = require("../models/category")(sequelize, DataTypes);
db.brands = require("../models/brand")(sequelize, DataTypes);
db.products = require("../models/product")(sequelize, DataTypes);
db.options = require("../models/option")(sequelize, DataTypes);
db.optionValues = require("../models/optionvalue")(sequelize, DataTypes);
db.skus = require("../models/sku")(sequelize, DataTypes);
// db.skuValues = require("../models/sku")
// relationships
db.categories.belongsToMany(db.products,{
  through: "Category_Product",
  as: "products",
  foreignKey: "categoryId"
});

db.products.belongsToMany(db.categories,{
  through: "Category_Product",
  as: "categories",
  foreignKey: "productId"
});

db.products.belongsTo(db.brands,{
  through: "Brand",
  as: "brand",
  foreignKey: "brand_id"
});

db.products.hasMany(db.skus, {
  foreignKey:'product_id',
  as:'skus'
})

module.exports = db;
