'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {};
  Blog.init({
    title: {
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
          args:[4,20],
          msg:'Tên từ 4 đến 20 ký tự'
        }
      }
    },
    slug: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Mô tả không được trống'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Ảnh không được trống'
        },
      }
    },
  }, {
    sequelize,
    timestamps:true,
    paranoid: true,
    modelName: 'Blog',
  });
  sequelizePaginate.paginate(Blog)
  return Blog;
};