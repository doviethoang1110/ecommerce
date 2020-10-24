'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Brand.init({
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
          args:[4,20],
          msg:'Tên từ 4 đến 20 ký tự'
        }
      }
    },
    slug: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Tên không được trống'
        },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps:true,
    modelName: 'Brand',
  });
  return Brand;
};