'use strict';
const { generateSlug } = require('../helpers')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
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
    slug: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Đường dẫn không được trống'
        }
      }
    },
    parentId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:{
          args:true,
          msg: 'Danh mục không được rỗng'
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
    modelName: 'Category',
    hooks: {
      beforeValidate(instance, options) {
        console.log(options)
        instance.dataValues.slug = generateSlug(instance.getDataValue('name'));
      },
      afterValidate(instance, options) {

      },
      beforeCreate(attributes, options) {
        console.log(attributes)
      }
    }
  });
  return Category;
};