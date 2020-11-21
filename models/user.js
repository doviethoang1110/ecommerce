'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};