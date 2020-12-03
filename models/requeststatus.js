'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestStatus extends Model {};
  RequestStatus.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tên không được trống'
        },
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'RequestStatus',
  });
  return RequestStatus;
};