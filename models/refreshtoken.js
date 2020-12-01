'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {};
  RefreshToken.init({
    refreshToken: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};