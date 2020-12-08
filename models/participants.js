'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participants extends Model {};
  Participants.init({
    conversationId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã hội thoại không được trống'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Người tham gia không được trống'
        }
      }
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Participants',
  });
  delete Participants.rawAttributes.id;
  return Participants;
};