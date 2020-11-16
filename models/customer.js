'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {};
  Customer.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'Tên đã được sử dụng!'
      },
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
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Địa chỉ không được trống'
        }
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'Số điện thoại đã được sử dụng!'
      },
      validate:{
        notEmpty:{
          args:true,
          msg:'Số điện thoại không được trống'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'Email đã được sử dụng!'
      },
      validate:{
        notEmpty:{
          args:true,
          msg:'Email không được trống'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mật khẩu không được trống'
        }
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Customer',
  });
  return Customer;
};