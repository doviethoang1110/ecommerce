'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {};
  Coupon.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tên không được trống'
        },
        len:{
          args:[2,20],
          msg:'Tên từ 2 đến 20 ký tự'
        }
      }
    },
    code: {
      type:DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Mã đã được sử dụng!'
      },
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã không được trống'
        },
        len:{
          args:[5,20],
          msg:'Tên từ 5 đến 20 ký tự'
        }
      }
    },
    startDate: {
      type:DataTypes.DATE
    },
    endDate: {
      type:DataTypes.DATE
    },
    type: {
      type:DataTypes.TINYINT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã không được trống'
        }
      }
    },
    detail: {
      type:DataTypes.FLOAT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Chi tiết không được trống'
        }
      }
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid:true,
    modelName: 'Coupon',
  });
  return Coupon;
};