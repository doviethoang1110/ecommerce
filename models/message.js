'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {};
  Message.init({
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
          msg:'Mã người dùng không được trống'
        }
      }
    },
    type: {
      type: DataTypes.ENUM('text', 'image','file'),
      defaultValue: 'text'
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    updatedAt: false,
    modelName: 'Message',
  });
  return Message;
};