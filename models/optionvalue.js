'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OptionValue extends Model {};
  OptionValue.init({
    name: DataTypes.STRING,
    option_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OptionValue',
  });
  return OptionValue;
};