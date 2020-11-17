const { Sequelize,DataTypes } = require('sequelize');
const { database } = require('../config/configuration');
const helpers = require('../helpers/index')

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
        helpers.hookModel(attributes);
      },
      beforeUpdate(instance, options) {
        helpers.hookModel(instance);
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
db.skus = require("../models/sku")(sequelize, DataTypes);
db.blogs = require("../models/blog")(sequelize, DataTypes);
db.currencies = require('../models/currency')(sequelize, DataTypes);
db.customers = require('../models/customer')(sequelize, DataTypes);
db.tokens = require('../models/token')(sequelize, DataTypes);
db.reviews = require('../models/review')(sequelize, DataTypes);
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

db.products.hasMany(db.options, {
  foreignKey:'productId',
  as:'options'
})

db.products.hasMany(db.skus, {
  foreignKey:'product_id',
  as:'skus'
})

db.customers.hasOne(db.tokens)

db.tokens.belongsTo(db.customers, {
  foreignKey: 'customerId',
  as: 'customer'
});

db.products.hasMany(db.reviews, {
  foreignKey: 'productId',
  as: 'reviews'
})

module.exports = db;
