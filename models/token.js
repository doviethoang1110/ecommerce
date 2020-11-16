'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {};
  Token.init({
    token: DataTypes.TEXT,
    customerId: DataTypes.INTEGER,
    expireDate: DataTypes.DATE
  }, {
    sequelize,
    hooks: false,
    timestamps: false,
    modelName: 'Token',
  });
  return Token;
};