'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingStatus extends Model {};
  ShippingStatus.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tên không được trống'
        },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ShippingStatus',
  });
  return ShippingStatus;
};