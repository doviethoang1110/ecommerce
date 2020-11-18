'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {};
  Permission.init({
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
      }
    },
    displayName: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'Tên thay thế đã được sử dụng!'
      },
      validate:{
        notEmpty:{
          args:true,
          msg:'Tên thay thế không được trống'
        },
      }
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Permission',
  });
  return Permission;
};