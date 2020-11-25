'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {};
  OrderStatus.init({
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
    modelName: 'OrderStatus',
  });
  return OrderStatus;
};