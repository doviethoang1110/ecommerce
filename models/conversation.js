'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {};
  Conversation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Tên không được trống'
        }
      }
    },
    creatorId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Người tạo không được trống'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    type: {
      type: DataTypes.ENUM('single', 'group'),
      defaultValue: 'single'
    },
    lastMessageId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Tin nhắn cuối không được trống'
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Conversation',
  });
  return Conversation;
};