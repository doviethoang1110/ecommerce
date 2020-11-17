'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {};
  WishList.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    timestamps: true,
    hooks:false,
    modelName: 'WishList',
  });
  return WishList;
};