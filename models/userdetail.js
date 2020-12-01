'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {};
  UserDetail.init({
    image: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    displayName: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã người dùng không được trống'
        }
      }
    },
    job: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    location: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    education: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    skill: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
    notes: {
      type:DataTypes.STRING,
      defaultValue: ""
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserDetail',
  });
  return UserDetail;
};