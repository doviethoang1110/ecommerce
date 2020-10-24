'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
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
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageList: DataTypes.JSON,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Product',
  });
  return Product;
};