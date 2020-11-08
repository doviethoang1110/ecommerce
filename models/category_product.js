'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_Product extends Model {};
  Category_Product.init({
    categoryId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps:true,
    modelName: 'Category_Product',
  });
  return Category_Product;
};