'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentStatus extends Model {};
  PaymentStatus.init({
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
    modelName: 'PaymentStatus',
  });
  return PaymentStatus;
};