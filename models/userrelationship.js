'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRelationship extends Model {};
  UserRelationship.init({
    requesterId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã người yêu cầu không được trống'
        }
      }
    },
    addresserId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã người nhận không được trống'
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã trạng thái không được trống'
        }
      }
    },
    userActionId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã người thực hiện không được trống'
        }
      }
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: 'UserRelationship',
  });
  delete UserRelationship.rawAttributes.id;
  return UserRelationship;
};