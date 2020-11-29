'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {};
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Tên đã được sử dụng!'
      },
      validate: {
        notEmpty:{
          args: true,
          msg: 'Tên không được trống'
        },
      }
    },
    slug: DataTypes.STRING,
    brand_id: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    vision: DataTypes.INTEGER,
    discount: DataTypes.FLOAT,
    image: {
      type:DataTypes.STRING,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Mô tả không được trống'
        },
      }
    },
    imageList: {
      type:DataTypes.JSON,
      defaultValue: []
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps:true,
    paranoid: true,
    modelName: 'Product',
  });
  sequelizePaginate.paginate(Product)

  return Product;
};