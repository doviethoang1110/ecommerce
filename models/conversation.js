'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {};
  Conversation.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    creatorId: {
      type: DataTypes.STRING,
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
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Conversation',
  });
  return Conversation;
};