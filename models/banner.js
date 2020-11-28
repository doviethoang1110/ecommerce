'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {};
  Banner.init({
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
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Nội dung không được trống'
        },
        len:{
          args:[2,20],
          msg:'Nội dung từ 2 đến 20 ký tự'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Ảnh không được trống'
        }
      }
    },
    type: {
      type: DataTypes.TINYINT,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Loại banner không được trống'
        }
      }
    },
    links: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Đường dẫn không được trống'
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
    paranoid: true,
    modelName: 'Banner',
  });
  return Banner;
};