'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sku extends Model {};
  Sku.init({
    code: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Tên đã được sử dụng!'
      },
      validate: {
        notEmpty:{
          args:true,
          msg: 'Mã không được trống'
        }
      }
    },
    values: DataTypes.JSON,
    product_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    importPrice: DataTypes.FLOAT,
    exportPrice: DataTypes.FLOAT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Sku',
  });
  return Sku;
};