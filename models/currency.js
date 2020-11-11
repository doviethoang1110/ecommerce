'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {};
  Currency.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Tên đã được sử dụng!'
      },
      validate: {
        notEmpty:{
          args: true,
          msg: 'Tên không được trống'
        },
        len:{
          args:[2,20],
          msg:'Tên từ 2 đến 20 ký tự'
        }
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ký hiệu đã được sử dụng!'
      },
      validate: {
        notEmpty:{
          args: true,
          msg: 'Ký hiệu không được trống'
        },
        len:{
          args:[2,20],
          msg:'Ký hiệu từ 2 đến 20 ký tự'
        }
      }
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull:false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Currency',
  });
  return Currency;
};