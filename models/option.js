'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {};
  Option.init({
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    values: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Option',
  });
  return Option;
};